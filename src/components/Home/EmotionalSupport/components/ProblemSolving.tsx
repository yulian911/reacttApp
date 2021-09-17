import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {styleVariables} from '../../../../Styles/styleVariables';

export default () => {
  const [isProblemNow, setIsProblemNow] = useState(false);
  const [isInpact, setIsIncpact] = useState(false);

  return (
    <View style={styles.problemSolving}>
      <View style={styles.row}>
        <Text style={styles.contentText}>
          {`Czy mój problem występuje\nw tu i teraz?`}
        </Text>
        <Switch
          color={styleVariables.colors.blue}
          value={isProblemNow}
          onValueChange={(boolean: boolean) => setIsProblemNow(boolean)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.contentText}>
          {`Czy mam wpływ na sytuację,\nktóra wywołuje mój problem?`}
        </Text>
        <Switch
          color={styleVariables.colors.blue}
          value={isInpact}
          onValueChange={(boolean: boolean) => setIsIncpact(boolean)}
        />
      </View>

      {!isProblemNow && (
        <View style={styles.row}>
          <Text style={styles.contentText}>
            Główną funkcją naszego umysłu jest ostrzeganie nas przed
            potencjalnymi zagrożeniami, dlatego też produkuje on różne
            scenariusze dotyczące przyszłości, jak również analizuje to, co już
            miało miejsce. Jednak żadna nasza myśl nie jest faktem, jest tylko
            obrazem lub słowem wyprodukowanym przez umysł. Pogrążenie w tych
            myślach zabiera czas i energię, których już nigdy nie odzyskamy.
            Spróbuj zauważać, kiedy umysł porywa Cię na wycieczki i za każdym
            razem stanowczo, ale łagodnie, wracać do chwili obecnej i do tego,
            czym zajmujesz się teraz.
            {`\n\n„To nie rzeczy nas smucą, ale sposób, w jaki je widzimy” (Epiktet)`}
          </Text>
        </View>
      )}
      {!isInpact && (
        <View style={styles.row}>
          <Text style={styles.contentText}>
            Lubimy mieć wpływ na swoje życie, poczucie kontroli nad tym, co nam
            się przydarza. Niestety, nasze życie obfituje w sytuacje, na które
            wpływu nie mamy. Wówczas jedynym sposobem poradzenia sobie z
            rzeczywistością jest próba zaakceptowania jej. Jeśli znalazłeś/aś
            się w takiej sytuacji, tu naturalne, że odczuwasz smutek, żal,
            bezradność lub złość. Spróbuj zrobić dla siebie coś miłego,
            zaopiekuj się sobą. Zaparz ulubiony kubek herbaty, wyjdź na spacer,
            włącz ulubiony film. Dbanie o dostarczanie sobie przyjemnych doznań
            jest tak samo ważne, jak nauka radzenia sobie z nieprzyjemnymi
            emocjami.
          </Text>
        </View>
      )}

      {isProblemNow && isInpact && (
        <View style={styles.row}>
          <Text style={styles.contentText}>
            {`\n1. Wypisz na kartce każde możliwe rozwiązanie, jakie przyjdzie Ci do głowy.\n2. Wykreśl rozwiązania najmniej realne.\n3. Pozostałe uszereguj zaczynając od tego, które uważasz za najlepsze.\n4. Co z najlepszego rozwiązania możesz zrobić już dziś?`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  problemSolving: {
    marginVertical: 15,
    // alignItems: 'center',
  },
  row: {
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentText: {
    // marginVertical: 10,
    fontSize: RFValue(16),
    // textAlign: 'left',
  },
});
