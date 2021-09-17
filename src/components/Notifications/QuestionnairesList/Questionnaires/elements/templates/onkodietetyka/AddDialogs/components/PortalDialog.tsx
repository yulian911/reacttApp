import React from 'react';
import {ScrollView, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';

interface IProps {
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
}

export default (props: IProps) => {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.ScrollArea>
          <View style={{paddingVertical: 24}}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 5}}>
              {props.children}
            </ScrollView>
          </View>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};
