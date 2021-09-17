import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/AntDesign'

interface IProps {
  icon: string
  size: number
  color?: string
}

export default (props: IProps): JSX.Element => {
  switch (props.icon) {
    case 'Waga':
      return <Icon2 name="weight" color="green" size={props.size} />
    case 'Opaska':
      return <Icon name="watch-variant" color="skyblue" size={props.size} />
    default:
      return <Icon3 name="question" color="black" size={props.size} />
  }
}
