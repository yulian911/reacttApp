import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useAuth} from '../../Auth/Auth';
import {checkShowIntro} from '../../Auth/functions/checkShowIntro';
import {
  DoneButton,
  NextButton,
  PrevButton,
} from '../../shared/Components/Buttons/NextPrevDoneBtns';
import LogoWithTitle, {
  ISlides,
} from '../../shared/Components/LogoWithTitle/LogoWithTitle';

const Intro = () => {
  const appDisplayName: string = require('cudapp/app.json').displayName;
  const {showIntro, setShowIntro} = useAuth();

  const slides: ISlides[] = [
    {
      key: 1,
      title: appDisplayName,
      // titleText: 'Lorem Ipsum dolor',
    },
    {
      key: 2,
      title: 'Analizator Składu Ciała',
      titleText: 'Zapraszamy do korzystania z aplikacji',
      text: `Informacja o przetwarzaniu danych 
      Poniżej przedstawione są podstawowe zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w związku z korzystaniem z aplikacji OnkoASC (dalej: Aplikacja). Szczegółowe informacje zawarte są w Polityce prywatności dostępnej pod linkiem: https://onkodietetyka.pl/polityka-prywatnosci/ . 
       
      Administratorem danych przetwarzanych w związku z korzystaniem z Aplikacji jest Onkodietetyka sp. z o.o. (ul. Chodkiewicza 51, 85-667 Bydgoszcz). W razie jakichkolwiek wątpliwości związanych z przetwarzaniem danych w możesz skontaktować się z Administratorem mailowo pod adresem kontakt@onkodietetyka.pl lub telefonicznie pod nr telefonu: +48 533 488 678 / 52 335 01 70. Administrator zapewnia, że przekazywane dane osobowe pozostaną poufne, bezpieczne i nie zostaną udostępnione jakimkolwiek podmiotom trzecim bez wyraźnej zgody użytkownika. 
       
      Za pośrednictwem Aplikacji Administrator przetwarza następujące dane osobowe użytkowników: 
      1. dane personalne (imię, nazwisko, wiek i data urodzenia, PESEL), 
      2. dane kontaktowe (adres zamieszkania, adres elektroniczny, numer telefonu), 
      3. dane biometryczne (m.in. płeć, wzrost, waga), 
      4. informacje dotyczące stanu zdrowia (w tym w szczególności wyniki laboratoryjnych badań diagnostycznych, wyniki analizy składu ciała, pomiary antropometryczne, typ i okres trwania choroby, stosowane terapie, wyniki wypełnianych ankiet), 
      5. dane przetwarzane przez aplikację (w tym informacje o urządzeniu i sieci tj. identyfikator urządzenia, ustawienia urządzenia i osobiste, IP oraz typ sieci), 
      6. dane dotyczące realizacji usługi, w tym reklamacji, skarg i wniosków, 
      7. dane dotyczące usług marketingowych. 
       
      Przetwarzanie danych osobowych użytkowników następuje jedynie w zakresie niezbędnym dla korzystania z aplikacji i świadczenia usług przez Administratora. Dane osobowe będą przetwarzane przez okres niezbędny do realizacji celów przetwarzania, jednak nie dłużej niż przez okres dziesięciu lat lub do momentu wycofania zgody na ich przetwarzanie. 
       
      Odbiorcami podanych przez Klientów danych osobowych są dostawcy towarów i usług niezbędnych do realizacji ww. celów oraz podmioty, którym Administrator powierzył przetwarzanie danych osobowych Klientów. Podmiotem przetwarzającym dane w Aplikacji oraz dane wymagane w związku z prawidłową realizacją usługi przez Administratora jest w szczególności: 
      1. Polskie Stowarzyszenie Onkodietetyki z siedzibą w (KRS: 0000531175), 
      2. Passio Consumer Healthcare sp. z o.o. z siedzibą w Bydgoszczy (KRS: 0000802932), 
      3. Open Labotec sp. z o.o. z siedzibą w Bydgoszczy (KRS: 0000649724), 
      4. PayPro S.A.z siedzibą w Poznaniu (KRS 0000347935). 
      Szczegółowy katalog podmiotów przetwarzających dane osobowe znajduje się w aktualnej Polityce prywatności Administratora. 
       
      W związku z przetwarzaniem danych osobowych przez Administratora, Klient posiada prawo do żądania od Administratora dostępu do danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania danych osobowych, przenoszenia danych osobowych oraz wniesienia skargi do organu nadzorczego, tj. Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa). 
       
      Gdy w trakcie realizacji usługi dochodzi do uzasadnionego podejrzenia zagrożenia życia lub zdrowia Usługobiorcy, Administrator może odstąpić od zasady zachowania poufności informacji, w szczególności poprzez przesłanie powiadomienia do użytkownika lub wcześniej upoważnionej przez niego osoby.  
       
      Aplikacja OnkoASC dla prawidłowego działania wymaga uzyskania następujących uprawnień: 
      - Internet – w celu dostępu do usług online, 
      - Telefon – w celu uzyskania informacji o urządzeniu i kontaktu z użytkownikiem, 
      - Bluetooth – w celu zarządzania urządzeniami pomiarowymi. 

      Wybranie przycisku AKCEPTUJ oznacza wyrażenie zgody na podane wyżej warunki korzystania z Aplikacji i udzielenie wymienionych uprawnień.`,
    },
  ];

  const handleSetShowIntro = async () => {
    AsyncStorage.setItem('@ShowIntro', 'true');
    setShowIntro(await checkShowIntro());
  };

  const renderItem = ({item}: {item: ISlides}): JSX.Element | null => {
    if (item.key === 1) {
      return <LogoWithTitle item={item} />;
    }
    if (item.key === 2) {
      return (
        <>
          <LogoWithTitle item={item} titleTextAbove />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollableText}>
            <Text style={styles.textRodo}>{item.text}</Text>
          </ScrollView>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.intro}>
      <AppIntroSlider
        renderItem={renderItem}
        renderDoneButton={() => DoneButton('Akceptuj')}
        renderNextButton={NextButton}
        showPrevButton
        renderPrevButton={() => PrevButton('Anuluj')}
        data={slides}
        onDone={() => handleSetShowIntro()}
      />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  buttonCircle: {
    width: 60,
    height: 40,
    color: 'green',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro: {
    flex: 1,
    padding: '5%',
  },
  textRodo: {
    textAlign: 'justify',
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  scrollableText: {
    marginTop: 50,
    marginBottom: 100,
  },
});
