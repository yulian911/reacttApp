import sys
import logging
import asyncio
import platform
import requests
import json
from bleak import BleakClient
from bleak import _logger as logger

CHARACTERISTIC_UUID = "00002a9c-0000-1000-8000-00805f9b34fb"  # <--- Change to the characteristic you want to enable notifications from.
ADDRESS = (
    "5c:ca:d3:75:00:7e"  # <--- Change to your device's address here if you are using Windows or Linux
    if platform.system() != "Darwin"
    else "B9EA5233-37EF-4DD6-87A8-2A875E821C46"  # <--- Change to your device's address here if you are using macOS
)
if len(sys.argv) == 3:
    ADDRESS = sys.argv[1]
    CHARACTERISTIC_UUID = sys.argv[2]


def dec_to_bin(x):
    return int(bin(x)[2:])


def notification_handler(sender, data):
    """Simple notification handler which prints the data received."""

    def conv_to_bit(number):
        str_bin = str(dec_to_bin(number))
        bin_str = ""

        for i in reversed(str_bin):
            bin_str += i

        while len(bin_str) < 8:
            bin_str += "0"

        result = ""

        for i in reversed(bin_str):
            result += i
        return result

    weight = str(dec_to_bin(data[12])) + conv_to_bit(data[11])
    control = str(conv_to_bit(data[0])) + str(conv_to_bit(data[1]))
    impedance = str(conv_to_bit(data[10])) + str(conv_to_bit(data[9]))

    headers = {'Content-type': 'application/json',
               'Accept': 'application/json',
               'Authorization': 'Bearer AzbpTt7M8WdTEYAvFV2g8e5ablLI2q'}

    if control[10] == "1" and control[14] == "1":
        weight = int(weight, 2) / 200
        impedance = int(impedance, 2)
        data = {
            "weight": weight,
            "impedance": impedance,
        }
        json_object = json.dumps(data, indent=4)
        r = requests.post("http://10.101.11.69:8001/activity/scale-results/", data=json_object, headers=headers)

        return


async def run(address, debug=False):
    if debug:
        import sys
        l = logging.getLogger("asyncio")
        l.setLevel(logging.DEBUG)
        h = logging.StreamHandler(sys.stdout)
        h.setLevel(logging.DEBUG)
        l.addHandler(h)
        logger.addHandler(h)

    async with BleakClient(address) as client:
        logger.info(f"Connected: {client.is_connected}")

        await client.start_notify(CHARACTERISTIC_UUID, notification_handler)
        await asyncio.sleep(15.0)
        await client.stop_notify(CHARACTERISTIC_UUID)


if __name__ == "__main__":
    import os
    os.environ["PYTHONASYNCIODEBUG"] = str(1)
    loop = asyncio.get_event_loop()
    # loop.set_debug(True)
    loop.run_until_complete(run(ADDRESS, True))