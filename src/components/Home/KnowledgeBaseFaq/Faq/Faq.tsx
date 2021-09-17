import React, {useState} from 'react'
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {styleElements} from '../../../../Styles/styleElements'
import {faqList} from './components/faqList'
import FaqResponse from './components/FaqResponse'

const Faq = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [answer, setAnswer] = useState<string>('')

  const handleSetInfoForModal = (answer: string) => {
    setOpenModal(true)
    setAnswer(answer)
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.faq}>
      {faqList.map((el, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSetInfoForModal(el.answer)}
          style={[styles.tile, styleElements.tile]}>
          <Text style={styles.title}>{el.question}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={[styles.tile, styleElements.tile, {marginTop: 10}]}>
        <Text style={styles.title}>Dieta i aktywność dietetyczna</Text>
        <Text style={styles.text}>
          Czuje ciągłe zmęczenie, co mogę dla siebie zrobić?
        </Text>
        <Text style={styles.text}>Nie mam apetytu</Text>
        <Text style={styles.text}>Czuję ból w jamie ustnej</Text>
        <Text style={styles.text}>
          Mam problem z żuciem oraz połykaniem pokarmów
        </Text>
        <Text style={styles.text}>Mam uczucie suchości w ustach</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tile, styleElements.tile]}>
        <Text style={styles.title}>Wsparcie psychologiczne</Text>
        <Text style={styles.text}>
          W jaki sposób kilka minut świadomego oddechu ma mnie uspokoić?
        </Text>
        <Text style={styles.text}>Jak mogę sobie poradzić ze zmęczeniem?</Text>
        <Text style={styles.text}>
          Dlaczego mam akceptować nieprzyjemne emocje, zamiast próbować się ich
          pozbyć?
        </Text>
        <Text style={styles.text}>
          Jak mam się zmotywować, aby wprowadzić zdrowe nawtki?
        </Text>
        <Text style={styles.text}>
          Co robić, gdy w trakcie ćwiczeń z oddechem zmysłami czy innymi
          medytacjami, myśli uciekają mi do innych spraw?
        </Text>
      </TouchableOpacity> */}
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal)
        }}>
        <FaqResponse setOpenModal={setOpenModal} answer={answer} />
      </Modal>
    </ScrollView>
  )
}

export default Faq

const styles = StyleSheet.create({
  faq: {
    marginTop: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 25,
    width: Dimensions.get('window').width - 20,
    marginBottom: 10,
  },
  title: {
    fontSize: RFValue(16),
  },
  text: {
    fontSize: RFValue(14),
    marginVertical: 5,
  },
})
