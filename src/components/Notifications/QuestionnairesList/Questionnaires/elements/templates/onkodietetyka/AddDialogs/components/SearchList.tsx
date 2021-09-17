import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, List, Searchbar, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import FullScreenLoading from '../../../../../../../../Navigation/components/FullScreenLoading';
import {IDiseases} from '../../../../../../../../../shared/Models/Diseases.models';
import {IDietList} from '../../../../../../../../../shared/Models/DietList.models';

type dataListTypesArray = IDiseases[] | IDietList[];
type dataListTypesObject = IDiseases | IDietList;

interface IProps {
  handleGetData: (value: string) => Promise<void>;
  resetData: () => void;
  dataList: dataListTypesArray | null;
  dataId: number;
  endFunction: (value: dataListTypesObject) => void;
  accordionTitle: string;
}

export default (props: IProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (searchValue.length >= 3) {
      setListLoading(true);
      timer = setTimeout(() => {
        console.log('pobieram dane do listy');
        props.handleGetData(searchValue);
        setListLoading(false);
      }, 500);
    } else {
      props.resetData();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const handlePressItem = (el: dataListTypesObject) => {
    props.endFunction(el);
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      id={1}
      onPress={() => {
        setExpanded(!expanded);
      }}
      title={props.accordionTitle}
      expanded={expanded}
      style={{paddingVertical: 10}}>
      <Searchbar
        autoFocus
        placeholder="Wyszukaj"
        onChangeText={setSearchValue}
        style={{margin: 5}}
        value={searchValue}
      />
      {!listLoading && props.dataList
        ? props.dataList.map(el => {
            return (
              <TouchableRipple key={el.id} onPress={() => handlePressItem(el)}>
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text style={styles.listText}>{el.name}</Text>
                    {props.dataId === el.id && (
                      <Icon
                        name="checkmark"
                        size={25}
                        color="black"
                        style={{paddingHorizontal: 5}}
                      />
                    )}
                  </View>
                  <Divider />
                </>
              </TouchableRipple>
            );
          })
        : searchValue.length >= 3 && <FullScreenLoading />}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  listText: {
    fontSize: RFValue(16),
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
