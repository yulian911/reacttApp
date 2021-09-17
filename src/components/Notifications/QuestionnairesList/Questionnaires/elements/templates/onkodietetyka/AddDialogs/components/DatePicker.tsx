import React, {useRef, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useAuth} from '../../../../../../../../../Auth/Auth';

interface IProps {
  value: string;
  endFunction: (date: Date) => void;
  label?: string;
  widthPercent?: string;
}

export default (props: IProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {actualDate} = useAuth();
  const myRef: any = useRef(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    myRef.current.blur();
  };

  const handleDateSelected = (date: Date) => {
    props.endFunction(date);
    hideDatePicker();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          label={props.label ? props.label : 'Data'}
          style={{width: `${props.widthPercent ? props.widthPercent : '100%'}`}}
          ref={myRef}
          onFocus={showDatePicker}
          value={props.value}
          showSoftInputOnFocus={false}
        />
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        date={actualDate}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateSelected}
        onCancel={hideDatePicker}
      />
    </>
  );
};
