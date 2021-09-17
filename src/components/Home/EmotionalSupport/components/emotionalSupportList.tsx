export type IESLKeys =
  | 'stress'
  | 'tiredness'
  | 'depressed_mood'
  | 'fear'
  | 'comunication_problem'
  | 'pain'
  | 'healthy_habit_problem'
  | 'sleep_problem'
  | 'problem_solving';

export interface IEmotionalSupportDetails {
  id: number;
  key: IESLKeys;
  name: string;
  description: string;
  from: string;
  to: string;
  exercise: string;
  img?: any;
}

export const emotionalSupportList: IEmotionalSupportDetails[] = [
  {
    id: 1,
    key: 'stress',
    name: 'Stres',
    description:
      'Stres jest nieprzyjemnym uczuciem napięcia, które pojawia się, kiedy jesteśmy przytłoczeni nadmiarem problemów i obowiązków. Niektóre osoby doświadczają wtedy uczucia bólu, duszenia lub kłucia w okolicach brzucha i klatki piersiowej. Może także pojawić się sztywność ciała, drżenie rąk, uczucie gorąca oraz zwiększona potliwość. W sytuacji stresowej może występować też natłok męczących myśli oraz poczucie, że nie mamy siły by poradzić sobie z problemami.',
    from: 'brak stresu',
    to: 'ekstemalny stres',
    exercise:
      'Już 1,5 minuty świadomego, spokojnego oddechu uspokaja działanie układu nerwowego: \n\nWdech – wydech',
  },
  {
    id: 2,
    key: 'tiredness',
    name: 'Zmęczenie',
    description: `Dla wielu osób chorych onkologicznie zmęczenie jest dużym problemem, który znacząco utrudnia normalne funkcjonowanie. Z tego powodu część osób rezygnuje z codziennych aktywności takich jak wypełnianie obowiązków, realizacja zainteresowań i pasji, ćwiczenia fizyczne czy spotkania towarzyskie.`,
    from: 'brak wyczerpania',
    to: 'wyczerpanie',
    exercise:
      'Co wywołuje zmęczenie?\n\nW jakich porach dnia energia jest mniejsza, a w jakich większa?\n\nJak mogę wykorzystać tę wiedzę do zaplanowania swoich zadań?',
  },
  {
    id: 3,
    key: 'depressed_mood',
    name: 'Obniżony nastrój',
    description: `Doświadczenie choroby może pogarszać samopoczucie powodując smutek i żal. Część osób czuje się skrzywdzona niesprawiedliwością choroby, inne natomiast obwiniają się za niezdrowy tryb życia. Smutek, żal i poczucie bezradności może także wynikać z osamotnienia i zagubienia w kontaktach z lekarzami i pielęgniarkami. Zazwyczaj w takich sytuacjach czujemy zniechęcenie, brak energii i chęci do życia, czemu towarzyszą smutne myśli i przykre emocje.`,
    from: 'brak smutku',
    to: 'rozpacz',
    exercise:
      'W jakiej sytuacji poczułem/am smutek?\nJaka myśl poprzedziła jego pojawienie się?\nCo zrobiłem/am, żeby sobie z nim poradzić?\n\nSmutek jest emocją, której doświadczają wszyscy ludzie, w reakcji na wydarzenia, które skłaniają nas do zatrzymania się i refleksji. Okazywanie smutku nie jest słabością, jest jednym z przejawów kompletnego życia. Jeśli jednak czujesz, że smutek nie pozwala Ci zająć się rzeczami, które są dla Ciebie ważne, rozważ spotkanie z psychologiem.',
  },
  {
    id: 4,
    key: 'comunication_problem',
    name: 'Problemy w komunikacji',
    description: `Każdy człowiek inaczej reaguje na chorobę. Czasem wysoki poziom stresu powoduje kłótnie oraz konflikty, przez co nie dogadujemy się dobrze z bliskimi, którzy nie wiedzą jakiego wsparcia potrzebujemy. Szczera rozmowa o trudnych uczuciach oraz problemach może być bardzo pomocna, ale niewiele osób potrafi otwarcie opowiadać o przykrych sprawach związanych z chorobą. Niektóre osoby milczą, bo boją się kogoś zranić albo nie chcą być obciążeniem dla bliskich. Z drugiej strony osoby towarzyszące chorym same mogą czuć się zagubione oraz bezradne, dlatego poza dobrymi intencjami ważna jest umiejętność zdrowej komunikacji.`,
    from: 'brak problemów',
    to: 'bardzo duże problemy',
    exercise:
      'Problemy w komunikacji często nie wynikają ze złych intencji drugiej strony, ale niezrozumienia lub niewiedzy, jak pomagać mądrze. Zastanów się, czy komunikujesz wprost swoje potrzeby?\nCzy unikasz ocen i ogólników typu: „Ty zawsze”, „Ty nigdy”?\nCzy potrafisz wskazać relację, jaka zachodzi pomiędzy zachowaniem drugiej strony, a Twoimi odczuciami i reakcjami?\nCzy druga strona wie, jakie emocje i myśli wywołuje w Tobie jej zachowanie?',
  },
  {
    id: 5,
    key: 'pain',
    name: 'Ból',
    description: `Ból jest przykrym i nieprzyjemnym doznaniem zmysłowym, które może wyraźnie utrudniać codzienne funkcjonowanie. Doświadczaniu bólu często towarzyszą negatywne emocje i poczucie bezradności. Niektóre osoby z tego powodu rezygnują z codziennych aktywności takich jak spacer, gotowanie, realizacja zainteresowań, spotkania towarzyskie lub ćwiczenia fizyczne.`,
    from: 'brak bólu',
    to: 'ekstremalny ból',
    exercise:
      'Skup swoją uwagę na oddechu, następnie przekieruj ją krok po kroku do wszystkich części swojego ciała, zaczynając od nóg, przez plecy, brzuch, klatkę piersiową, ręce, do szyi i twarzy.\nGdzie dostrzegasz napięcia i dyskomfort?\nSpróbuj skierować swój oddech do miejsca, w którym czujesz ból, jakbyś robił/a więcej miejsca w ciele, rozdmuchiwał/a liście z jakiejś płaszczyzny, rozluźniał/a mięśnie.\nNastępnie połóż swoją dłoń na miejscu, w którym czujesz ból.\nPoczuj kojący dotyk, ciepło lub chłód, zależnie, co przynosi ulgę.\nWyobraź sobie, że przytulasz najbliższą sobie osobę pod słońcem. Swojego najlepszego przyjaciela.',
  },
  {
    id: 6,
    key: 'fear',
    name: 'Lęk',
    description: `Choroba może powodować troski związane z niepewną przyszłością, bólem oraz cierpieniem. Lęk jest nieprzyjemnym doznaniem, które odczuwamy, kiedy obawiamy się, że spotka nas coś złego. Zazwyczaj doświadczamy wtedy przykrych myśli oraz emocji. Mogą także pojawiać się czarne scenariusze na temat negatywnej przyszłości na przykład bolesnych zabiegów medycznych, cierpienia, samotności i śmierci.`,
    from: 'brak lęku',
    to: 'ekstremalny lęk',
    exercise:
      'Usiądź lub stań stabilnie. Zamknij oczy, skoncentruj się na swoim oddechu. Zastanów się, gdzie najbardziej czujesz swój wdech? W klatce piersiowej, brzuchu, gardle czy może w nosie? A wydech? Weź 10 takich świadomych wdechów i wydechów. Otwórz oczy, rozejrzyj się po otoczeniu.\n\nNazwij 5 rzeczy, które widzisz.\n4 dźwięki, które słyszysz.\n3 rzeczy, które czujesz dotykiem dłoni, stóp albo całego ciała.\n2 zapachy, które czujesz.\n1 smak.\n\nJak teraz czujesz swój lęk?\nLęk nie jest zły, to nasz sygnał alarmowy, że trzeba zadbać o swoje bezpieczeństwo. Bez tego uczucia ludzkość nie przetrwałaby do dziś. Każdy z nas czegoś się boi.',
  },
  {
    id: 7,
    key: 'healthy_habit_problem',
    name: 'Trudności we wprowadzaniu zdrowych nawyków',
    description: `W sytuacji choroby ludzie często próbują zmienić styl życia na bardziej zdrowy np. więcej się ruszać i lepiej odżywiać. Niestety taka zmiana bywa trudna, szczególnie gdy towarzyszy jej stres związany z chorobą. Niektórym osobom brakuje motywacji i energii by zacząć, inne natomiast szybko tracą zapał i pomimo starań wracają do dawnych niezdrowych nawyków. Problemem może być także brak wiedzy w jaki sposób skutecznie zmieniać swoje zachowanie.`,
    from: 'brak trudności',
    to: 'bardzo duże trudności',
    img: require('cudapp/resources/img/scheme.png'),
    exercise:
      'Nawykiem może być zajadanie stresu lub nawet narzekanie. Zazwyczaj jest on uruchamiany przez wystąpienie konkretnego bodźca, czyli wyzwalacza. Jak to jest u Ciebie?\nW jakich chwilach najczęściej sięgasz po słodycze / bezmyślnie przeglądasz Internet / zapalasz papierosa?\n\nWeź długopis i kartkę, przerysuj na nią wykres powyżej. Jest to Koło nawyku. Wpisz w kwadracik „bodziec” uczucie lub sytuację, która jest Twoim wyzwalaczem.\n\nNawyki utrwalają się, bo krótkotrwale dają nam poczucie ulgi lub przyjemności, jednak długoterminowe konsekwencje bywają różne. Co Tobie daje Twój nawyk? Wpisz odpowiedź w kwadracik „nagroda”.\n\nJak inaczej możesz zapewnić sobie to uczucie przyjemności w chwili, w której dotąd uruchamiałeś swój niezdrowy nawyk? Narysuj na kartce obok poprzedniego wykresu, nowe Koło nawyku, które będzie uwzględniało w polu „reakcja” nowe zachowanie, na które się decydujesz w odpowiedzi na bodziec, który dotąd wyzwalał Twój niezdrowy nawyk.\n\nZmiana nawyków jest naprawdę trudna i wpisane jest w nią wiele upadków. Ale pamiętaj: \n„Każdy oddech jest naprawdę początkiem reszty naszego życia. (Jon Kabat – Zinn)”',
  },
  {
    id: 8,
    key: 'sleep_problem',
    name: 'Problemy ze snem',
    description: `Stres związany z chorobą oraz reakcja organizmu na leki i zabiegi medyczne mogą negatywnie wpływać na jakość snu. Niektóre osoby mają problemy z zasypaniem, inne natomiast budzą się niewyspane.`,
    from: 'brak problemów',
    to: 'bardzo duże problemy',
    exercise:
      'Jakość naszego snu zależy od kilku czynników. Sprawdź, jak Ci idzie wdrażanie ich w codzienną rutynę:\n\n\u2713 Unikam drzemek w ciągu dnia\n\u2713 Mam stały rytm kładzenia się spać i wstawania\n\u2713 Mój stały rytm stosuję nawet w dni wolne\n\u2713 Jeśli nie mogę zasnąć dłużej niż 20 min, wstaję z łóżka, by się czymś zająć\n\u2713 Mam swój wieczorny rytuał, przygotowujący ciało i umysł do snu\n\u2713 Nie spożywam kofeiny po 18.00\n\u2713Nie spożywam alkoholu przez 6h przed snem\n\u2713 Ostatni duży posiłek jem nie później niż 3h przed snem\n\u2713 Unikam intensywnych ćwiczeń fizycznych na 6h przed snem\n\u2713 Wietrzę i zaciemniam sypialnię przed położeniem się\n\u2713 Odkładam telefon i inne sprzęty emitujące niebieskie światło nie później niż 1h przed snem\n\u2713 Stosuję techniki wizualizacyjne i medytacyjne, by nauczyć się radzić sobie z natłokiem myśli\n\nCo następnym razem możesz poprawić, aby lepiej spać?',
  },
  {
    id: 9,
    key: 'problem_solving',
    name: 'Rozwiązywanie problemów',
    description: `Choroba wiążę się z koniecznością poważnych zmian życiowych i podejmowania trudnych decyzji. Czasem trzeba zrezygnować z pracy lub części obowiązków, zorganizować wizyty w szpitalu, czy na nowo dogadać się z bliskimi w ważnych sprawach rodzinnych. Niestety wiele osób nie wie, jak skutecznie rozwiązywać problemy, tak by podejmowane wybory były zgodne z tym czego pragną.`,
    from: 'brak problemów',
    to: 'bardzo duże problemy',
    exercise: '',
  },
];
