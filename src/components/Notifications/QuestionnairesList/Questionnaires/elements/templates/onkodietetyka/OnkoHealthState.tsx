import React, {memo, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, List, Switch, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getDateFormat} from '../../../../../../../shared/Formatters/dateHourFormat';
import {IDiseases} from '../../../../../../../shared/Models/Diseases.models';
import {IOnkodietetyka} from '../../../../../../../shared/Models/Onkodietetyka.models';
import {styleVariables} from '../../../../../../../Styles/styleVariables';
import AddBaseDisease from './AddDialogs/AddBaseDisease';
import AddCoexistingDiseases from './AddDialogs/AddCoexistingDiseases';
import AddSpecialistClinicCare from './AddDialogs/AddSpecialistClinicCare';
import PortalDialog from './AddDialogs/components/PortalDialog';

const OnkoHealthState = ({
  item,
  setQuestionnaire,
  questionnaire,
}: {
  item: any;
  setQuestionnaire: React.Dispatch<React.SetStateAction<IOnkodietetyka>>;
  questionnaire: IOnkodietetyka;
}) => {
  const [showBaseDisease, setShowBaseDisease] = useState(false);
  const [showCoexistingDiseases, setShowCoexistingDiseases] = useState(false);
  const [showSpecialistClinicCare, setShowSpecialistClinicCare] =
    useState(false);

  const [diseasesList, setDiseasesList] = useState<IDiseases[] | null>(null);
  const [addedDiseasesList, setAddedDiseasesList] = useState<IDiseases[]>([]);

  const hideBaseDisease = () => setShowBaseDisease(false);
  const hideCoexistingDiseases = () => setShowCoexistingDiseases(false);
  const hideSpecialistClinicCare = () => setShowSpecialistClinicCare(false);

  const diseaseName = (id: number) => {
    let name = '';
    addedDiseasesList &&
      addedDiseasesList.map(el => {
        if (el.id === id) {
          name = el.name;
        }
      });
    return name;
  };

  const switchChangeValue = (
    dataKey: string,
    switchKey: string,
    info: string,
  ) => {
    let dataToDispatch: [] | null;

    switch (dataKey) {
      case 'base_disease':
        dataToDispatch = null;
        break;
      default:
        dataToDispatch = [];
        break;
    }

    Alert.alert('Komunikat', `${info}`, [
      {text: 'Anuluj ', onPress: undefined},
      {
        text: 'Kontunuuj ',
        onPress: () => {
          setQuestionnaire(prev => ({
            ...prev,
            [dataKey]: dataToDispatch,
          }));
          setQuestionnaire(prev => ({
            ...prev,
            [switchKey]: false,
          }));
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Choroba postawowa</Text>
          <Switch
            color={styleVariables.colors.green}
            value={questionnaire.is_base_disease}
            onValueChange={(boolean: boolean) => {
              if (boolean === false && questionnaire.base_disease) {
                switchChangeValue(
                  'base_disease',
                  'is_base_disease',
                  'Istnieje dodana choroba podstawowa.\nJeśli kontunuujesz, dodana choroba zostanie usunięta.',
                );
                return;
              }
              setQuestionnaire(prev => ({...prev, is_base_disease: boolean}));
            }}
          />
        </View>
        {questionnaire.base_disease ? (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.AccordionGroup>
                <List.Accordion
                  title={diseaseName(questionnaire.base_disease.disease)}
                  id="1">
                  <List.Item
                    titleNumberOfLines={2}
                    title={`Nazwa: ${diseaseName(
                      questionnaire.base_disease.disease,
                    )}`}
                  />
                  <List.Item
                    titleNumberOfLines={1}
                    title={`Zdiagnozowano: ${getDateFormat(
                      questionnaire.base_disease.diagnosed,
                    )}`}
                  />
                  <List.Item
                    titleNumberOfLines={2}
                    title={`Zdiagnozowano przez doktora?: ${
                      questionnaire.base_disease.is_diagnosed_by_doc
                        ? 'Tak'
                        : 'Nie'
                    }`}
                  />
                  <List.Item
                    titleNumberOfLines={50}
                    title={`Plan leczenia: ${
                      questionnaire.base_disease.treatment_plan
                        ? questionnaire.base_disease.treatment_plan
                        : 'Nie podano'
                    }`}
                  />
                  <TouchableRipple
                    style={{padding: 15, alignSelf: 'flex-end'}}
                    onPress={() =>
                      setQuestionnaire(prev => ({
                        ...prev,
                        base_disease: null,
                      }))
                    }
                    rippleColor="rgba(0, 0, 0, .32)">
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 20, marginRight: 10}}>Usuń</Text>
                      <Icon name="trash" color="black" size={RFValue(25)} />
                    </View>
                  </TouchableRipple>
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          </View>
        ) : (
          questionnaire.is_base_disease && (
            <View style={styles.row}>
              <Button
                color={styleVariables.colors.green}
                icon="plus"
                mode="outlined"
                onPress={() => setShowBaseDisease(true)}>
                Dodaj chorobę
              </Button>
            </View>
          )
        )}
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Choroby współistniejące</Text>
          <Switch
            color={styleVariables.colors.green}
            value={questionnaire.is_coexisting_diseases}
            onValueChange={(boolean: boolean) => {
              if (
                boolean === false &&
                questionnaire.coexisting_diseases.length
              ) {
                switchChangeValue(
                  'coexisting_diseases',
                  'is_coexisting_diseases',
                  'Istnieją dodane choroby współistniejące.\nJeśli kontunuujesz, dodane choroby zostaną usunięte.',
                );
                return;
              }
              setQuestionnaire(prev => ({
                ...prev,
                is_coexisting_diseases: boolean,
              }));
            }}
          />
        </View>
        {questionnaire.coexisting_diseases && (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.AccordionGroup>
                {questionnaire.coexisting_diseases.map((el, index) => {
                  const name = diseaseName(el.disease);
                  return (
                    <List.Accordion title={name} id={index + 1} key={index}>
                      <List.Item
                        titleNumberOfLines={2}
                        title={`Nazwa: ${name}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Zdiagnozowano: ${getDateFormat(el.diagnosed)}`}
                      />
                      <List.Item
                        titleNumberOfLines={2}
                        title={`Zdiagnozowano przez doktora?: ${
                          el.is_diagnosed_by_doc ? 'Tak' : 'Nie'
                        }`}
                      />
                      <List.Item
                        titleNumberOfLines={50}
                        title={`Plan leczenia: ${
                          el.treatment_plan ? el.treatment_plan : 'Nie podano'
                        }`}
                      />
                      <TouchableRipple
                        style={{padding: 15, alignSelf: 'flex-end'}}
                        onPress={() => {
                          questionnaire.coexisting_diseases.map(
                            (ele, index) => {
                              const new1 = [
                                ...questionnaire.coexisting_diseases,
                              ];
                              if (ele.disease === el.disease) {
                                new1.splice(index, 1);
                                console.log('newState', new1);
                                setQuestionnaire(prev => ({
                                  ...prev,
                                  coexisting_diseases: new1,
                                }));
                              }
                            },
                          );
                        }}
                        rippleColor="rgba(0, 0, 0, .32)">
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 20, marginRight: 10}}>
                            Usuń
                          </Text>
                          <Icon name="trash" color="black" size={RFValue(25)} />
                        </View>
                      </TouchableRipple>
                    </List.Accordion>
                  );
                })}
              </List.AccordionGroup>
            </View>
          </View>
        )}
        {questionnaire.is_coexisting_diseases && (
          <View style={styles.row}>
            <Button
              color={styleVariables.colors.green}
              icon="plus"
              mode="outlined"
              onPress={() => setShowCoexistingDiseases(true)}>
              Dodaj chorobę
            </Button>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Opieka poradni specjalistycznych</Text>
          <Switch
            color={styleVariables.colors.green}
            value={questionnaire.is_specialist_clinic_care}
            onValueChange={(boolean: boolean) => {
              if (
                boolean === false &&
                questionnaire.specialist_clinic_care.length
              ) {
                switchChangeValue(
                  'specialist_clinic_care',
                  'is_specialist_clinic_care',
                  'Istnieją dodane poradnie specjalistyczne.\nJeśli kontunuujesz, dodane poradnie zostaną usunięte.',
                );
                return;
              }
              setQuestionnaire(prev => ({
                ...prev,
                is_specialist_clinic_care: boolean,
              }));
            }}
          />
        </View>
        {questionnaire.specialist_clinic_care && (
          <View style={styles.row}>
            <View style={styles.section}>
              <List.AccordionGroup>
                {questionnaire.specialist_clinic_care.map((el, index) => {
                  return (
                    <List.Accordion
                      title={el.clinic}
                      id={index + 1}
                      key={index}>
                      <List.Item
                        titleNumberOfLines={2}
                        title={`Nazwa: ${el.clinic}`}
                      />
                      <List.Item
                        titleNumberOfLines={1}
                        title={`Data: ${getDateFormat(el.date_from)}`}
                      />
                      <TouchableRipple
                        style={{padding: 15, alignSelf: 'flex-end'}}
                        onPress={() => {
                          questionnaire.specialist_clinic_care.map(
                            (ele, index) => {
                              const new1 = [
                                ...questionnaire.specialist_clinic_care,
                              ];
                              if (ele.clinic === el.clinic) {
                                new1.splice(index, 1);
                                console.log('newState', new1);
                                setQuestionnaire(prev => ({
                                  ...prev,
                                  specialist_clinic_care: new1,
                                }));
                              }
                            },
                          );
                        }}
                        rippleColor="rgba(0, 0, 0, .32)">
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 20, marginRight: 10}}>
                            Usuń
                          </Text>
                          <Icon name="trash" color="black" size={RFValue(25)} />
                        </View>
                      </TouchableRipple>
                    </List.Accordion>
                  );
                })}
              </List.AccordionGroup>
            </View>
          </View>
        )}
        {questionnaire.is_specialist_clinic_care && (
          <View style={styles.row}>
            <Button
              color={styleVariables.colors.green}
              icon="plus"
              mode="outlined"
              onPress={() => setShowSpecialistClinicCare(true)}>
              Dodaj poradnię
            </Button>
          </View>
        )}
      </View>
      <PortalDialog visible={showBaseDisease} onDismiss={hideBaseDisease}>
        <AddBaseDisease
          setQuestionnaire={setQuestionnaire}
          hideDialog={hideBaseDisease}
          diseasesList={diseasesList}
          setDiseasesList={setDiseasesList}
          addedDiseasesList={addedDiseasesList}
        />
      </PortalDialog>
      <PortalDialog
        visible={showCoexistingDiseases}
        onDismiss={hideCoexistingDiseases}>
        <AddCoexistingDiseases
          questionnaire={questionnaire}
          hideDialog={hideCoexistingDiseases}
          diseasesList={diseasesList}
          setDiseasesList={setDiseasesList}
          addedDiseasesList={addedDiseasesList}
        />
      </PortalDialog>
      <PortalDialog
        visible={showSpecialistClinicCare}
        onDismiss={hideSpecialistClinicCare}>
        <AddSpecialistClinicCare
          questionnaire={questionnaire}
          hideDialog={hideSpecialistClinicCare}
        />
      </PortalDialog>
    </>
  );
};

export default memo(OnkoHealthState);

const styles = StyleSheet.create({
  pt1Content: {
    height: '80%',
    marginBottom: RFValue(80),
  },
  inputsContainer: {
    justifyContent: 'space-between',
    height: '50%',
  },
  input: {
    width: '100%',
  },
  row: {
    paddingVertical: '1%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
    fontSize: RFValue(18),
    // textAlign: 'center',
    fontWeight: '700',
  },
  text: {
    marginVertical: 5,
    fontSize: RFValue(16),
  },
  section: {
    flex: 1,
  },
  dialog: {
    width: '100%',
    height: '100%',
  },
});
