import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

interface ChangeVisableProps {
  changeVisableChat(): void;
  setKatView: any;
  setStageView: any;
}

function ChatBot({
  changeVisableChat,
  setStageView,
  setKatView,
}: ChangeVisableProps) {
  const [chatBot, setChatBot] = useState<any>({
    stages: [
      {
        id: 1,
        content:
          'Dopiero otrzymałem diagnozę, jestem na etapie rozpoznania choroby nowotworowej',
      },
      {
        id: 2,
        content:
          'Jestem w trakcie leczenia onkologicznego (operacja, chemioterapia, radioterapia)',
      },
      {id: 3, content: 'Mam nawrót choroby, wznowę, przerzuty'},
      {
        id: 4,
        content: 'Choroba jest w remisji. Zakończyłem leczenie onkologiczne',
      },
      {id: 5, content: 'Jestem w trakcie leczenia paliatywnego'},
      {id: 6, content: 'Inne'},
    ],
    kategory: [
      {id: 1, content: 'Skutki uboczne leczenia '},
      {id: 2, content: 'Dolegliwości trawienne '},
      {id: 3, content: 'Pytania do diety lub zaleceń'},
      {id: 4, content: 'Suplementacja'},
      {id: 5, content: 'Inne dietetyczne'},
      {id: 6, content: 'Obniżony nastrój i kłopoty ze snem'},
      {id: 7, content: 'Problemy w komunikacji z bliskimi '},
      {
        id: 8,
        content: 'Nasilony lęk przed progresją choroby, badaniami, leczeniem ',
      },
      {id: 9, content: 'Sposoby na radzenie sobie ze stresem '},
      {id: 10, content: 'Inne psychologiczne '},
    ],
  });

  const [visible, setVisible] = useState(true);
  const changeVisable = () => {
    setVisible(false);
  };

  // const handleCloseChatBot = () => {
  //   changeVisableChat();
  // };
  return (
    <ScrollView style={{marginHorizontal: 15}}>
      {visible ? (
        <View>
          <Text style={styles.title}>Etap choroby</Text>
          {chatBot.stages.map((stage: any) => (
            <Stage
              key={stage.id}
              stage={stage.content}
              changeVisable={changeVisable}
              chatBot={chatBot}
              setChatBot={setChatBot}
              setStageView={setStageView}
            />
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Kategoria</Text>
          {chatBot.kategory.map((kat: any) => (
            <Kategory
              key={kat.id}
              kat={kat.content}
              changeVisable={changeVisableChat}
              setKatView={setKatView}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default ChatBot;

function Stage({stage, changeVisable, setStageView}: any) {
  const sendMessage = () => {
    changeVisable();
    const newStage = stage;
    setStageView(newStage);
  };

  return (
    <TouchableOpacity
      key={stage.id}
      style={styles.chatbot}
      onPress={sendMessage}>
      <Text style={styles.contentText}>{stage}</Text>
    </TouchableOpacity>
  );
}

function Kategory({kat, changeVisable, setKatView}: any) {
  const sendMessage = () => {
    const newKat = kat;
    setKatView(newKat);
    changeVisable();
  };

  return (
    <TouchableOpacity key={kat.id} style={styles.chatbot} onPress={sendMessage}>
      <Text style={styles.contentText}>{kat}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatbot: {
    width: '100%',
    marginVertical: '2%',
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: RFValue(10),
  },
  title: {
    marginTop: 10,
    fontSize: RFValue(21),
    textAlign: 'center',
  },
  contentText: {
    fontSize: RFValue(15),
  },
  // titleBox: {
  //   marginVertical: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
});
