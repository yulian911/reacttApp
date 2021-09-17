import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  List,
  TextInput,
  Button,
  TouchableRipple,
  HelperText,
} from 'react-native-paper';
import {GetGeneral} from '../../../../../../../../shared/Requests/GetGeneral';
import {getDateFormat} from '../../../../../../../../shared/Formatters/dateHourFormat';
import {styleVariables} from '../../../../../../../../Styles/styleVariables';
import {IOnkodietetyka} from '../../../../../../../../shared/Models/Onkodietetyka.models';
import {IMealTypes} from '../../../../../../../../shared/Models/Local/Meals.models';
import {IMealProducts} from '../../../../../../../../shared/Models/MealProducts.models';
import {RFValue} from 'react-native-responsive-fontsize';
import {IMealProduct} from '../../../../../../../../shared/Models/MealProduct.models';
import Icon from 'react-native-vector-icons/Ionicons';
import {IProductUnits} from '../../../../../../../../shared/Models/ProductUnits.models';
import {IMealDiary} from '../../../../../../../../shared/Models/MealDiary.models';
import SearchList from './components/SearchList';
import DatePicker from './components/DatePicker';
import {checkNumbers} from '../functions/checkNumbers';

interface IProps {
  mealType: IMealTypes;
  questionnaire: IOnkodietetyka;
  hideDialog: () => void;
  setMeals: React.Dispatch<React.SetStateAction<IMealProducts[]>>;
  setUnits: React.Dispatch<React.SetStateAction<IProductUnits[]>>;
  handleGetName: (type: string, id: number) => string;
}

export default (props: IProps) => {
  const [mealProducts, setMealProducts] = useState<IMealProducts[] | null>(
    null,
  );
  const [productUnits, setProductUnits] = useState<IProductUnits[] | null>(
    null,
  );

  const initialMealDiaryProduct = {
    meal_product: 0,
    product_unit: 0,
    quantity: '',
  };
  const [mealDiaryProduct, setMealDiaryProduct] = useState<IMealProduct>(
    initialMealDiaryProduct,
  );

  const [mealDiaryProductList, setMealDiaryProductList] = useState<
    IMealProduct[]
  >([]);
  const [mealDiaryFinal, setMealDiaryFinal] = useState<IMealDiary>({
    meal_diary_products: [],
    date_time: '',
    note: '',
    type: props.mealType.type,
  });

  const handleGetMealProducts = async (value: string) => {
    const result = await GetGeneral.mealProducts(value);
    if (result.error) {
      return;
    }
    setMealProducts(result.data);
  };

  const handleGetProductUnits = async (value: string) => {
    const result = await GetGeneral.productUnits(value);
    if (result.error) {
      return;
    }
    setProductUnits(result.data);
  };

  const handleSetMeal = (product: IMealProducts) => {
    setMealDiaryProduct(prev => ({...prev, meal_product: product.id}));
    props.setMeals(prev => [...prev, product]);
  };

  const handleSetUnit = (unit: IProductUnits) => {
    setMealDiaryProduct(prev => ({...prev, product_unit: unit.id}));
    props.setUnits(prev => [...prev, unit]);
  };

  const handleConfirm = (date: Date) => {
    setMealDiaryFinal(prev => ({
      ...prev,
      date_time: getDateFormat(date, '-', true),
    }));
  };

  const handleSaveMeal = () => {
    const filterMeals = () => {
      let result = false;
      props.questionnaire.meal_diary.find(el => {
        if (
          el.date_time === mealDiaryFinal.date_time &&
          el.type === mealDiaryFinal.type
        ) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    };

    if (filterMeals()) {
      Alert.alert(
        'Komunikat',
        `${props.mealType.title} z taką datą juz istnieje.`,
      );
    } else {
      console.log('mealDiaryProductList', mealDiaryProductList);
      setMealDiaryFinal(prev => ({
        ...prev,
        meal_diary_products: mealDiaryProductList,
      }));
      props.questionnaire.meal_diary.push(mealDiaryFinal);
      props.hideDialog();
    }
  };

  return (
    <>
      <View style={styles.section}>
        <List.Section>
          <SearchList
            handleGetData={handleGetMealProducts}
            resetData={() => setMealProducts(null)}
            dataList={mealProducts}
            dataId={mealDiaryProduct.meal_product}
            endFunction={handleSetMeal}
            accordionTitle={props.handleGetName(
              'meal',
              mealDiaryProduct.meal_product,
            )}
          />
          {/* ^[0-9]{1,2}([,.][0-9]{1,2})?$ */}
          <TextInput
            label="Wprowadź ilość"
            value={mealDiaryProduct.quantity}
            keyboardType="number-pad"
            style={{marginVertical: 10, width: '100%'}}
            onChangeText={text =>
              setMealDiaryProduct(prev => ({...prev, quantity: text}))
            }
          />
          {checkNumbers(mealDiaryProduct.quantity) ? (
            <HelperText
              type="error"
              visible={checkNumbers(mealDiaryProduct.quantity)}>
              Ilość jest niepoprawna!
            </HelperText>
          ) : null}

          <SearchList
            handleGetData={handleGetProductUnits}
            resetData={() => setProductUnits(null)}
            dataList={productUnits}
            dataId={mealDiaryProduct.product_unit}
            endFunction={handleSetUnit}
            accordionTitle={props.handleGetName(
              'unit',
              mealDiaryProduct.product_unit,
            )}
          />
        </List.Section>
        <Button
          color={styleVariables.colors.green}
          icon="plus"
          style={{marginVertical: 15}}
          mode="outlined"
          onPress={() => {
            if (checkNumbers(mealDiaryProduct.quantity)) {
              Alert.alert('Błąd', 'Niepoprawna ilość.');
              return;
            }
            if (mealDiaryProduct.meal_product === 0) {
              Alert.alert('Błąd', 'Nie wybrano składnika.');
              return;
            }
            if (mealDiaryProduct.product_unit === 0) {
              Alert.alert('Błąd', 'Nie wybrano jednostki.');
              return;
            }
            if (mealDiaryProduct.quantity.length === 0) {
              Alert.alert('Błąd', 'Nie wprowadzono ilości.');
              return;
            } else {
              if (mealDiaryProductList.length === 0) {
                setMealDiaryProductList([mealDiaryProduct]);
              } else {
                setMealDiaryProductList(prev => [...prev, mealDiaryProduct]);
              }
              mealDiaryFinal.meal_diary_products.push(mealDiaryProduct);
              setMealDiaryProduct(initialMealDiaryProduct); //TODO dodać po testach
            }
          }}>
          <Text>Dodaj składnik</Text>
        </Button>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Dodane składniki</Text>
        </View>

        {mealDiaryProductList.length > 0
          ? mealDiaryProductList.map((el, index) => {
              return (
                <View key={index} style={styles.row}>
                  <Text>{`${props.handleGetName('meal', el.meal_product)} ${
                    el.quantity
                  } ${props.handleGetName('unit', el.product_unit)}`}</Text>
                  <TouchableRipple
                    onPress={() => {
                      const newList = [...mealDiaryProductList];
                      newList.splice(index, 1);
                      setMealDiaryProductList(newList);
                      setMealDiaryFinal(prev => ({
                        ...prev,
                        meal_diary_products: newList,
                      }));
                    }}>
                    <Icon
                      name="trash"
                      size={25}
                      color="black"
                      style={{paddingHorizontal: 5}}
                    />
                  </TouchableRipple>
                </View>
              );
            })
          : null}
      </View>
      <View style={styles.section}>
        <DatePicker
          value={mealDiaryFinal.date_time}
          endFunction={handleConfirm}
        />
      </View>
      <View style={styles.section}>
        <TextInput
          label="Uwagi, dolegliwości"
          multiline
          style={{height: 150}}
          value={mealDiaryFinal.note}
          onChangeText={text =>
            setMealDiaryFinal(prev => ({
              ...prev,
              note: text,
            }))
          }
        />
      </View>
      <View style={styles.section}>
        <Button
          color={styleVariables.colors.green}
          icon="plus"
          style={{marginVertical: 15}}
          mode="outlined"
          onPress={() => {
            if (mealDiaryFinal.meal_diary_products.length === 0) {
              Alert.alert('Błąd', 'Nie dodano składników.');
              return;
            }
            if (mealDiaryFinal.date_time.length === 0) {
              Alert.alert('Błąd', 'Nie podano daty.');
              return;
            } else {
              Alert.alert(
                'Komunikat',
                `Czy na pewno zapisać ${props.mealType.title}?\n\nNie będzie mozliwosci zmiany składników.`,
                [
                  {text: 'Anuluj', onPress: undefined},
                  {text: 'Zapisz', onPress: () => handleSaveMeal()},
                ],
              );
            }
          }}>
          <Text>Dodaj {props.mealType.title}</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 5,
  },
  row: {
    paddingVertical: '1%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  section: {
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  listText: {
    fontSize: RFValue(16),
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
