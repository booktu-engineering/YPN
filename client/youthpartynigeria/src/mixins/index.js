import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const bigButton = {
  height: 45,
  width: width * 0.7,
  backgroundColor: '#82BE30',
  borderRadius: 5,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  shadowColor: 'black',
  shadowOffset: { width: 10, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 8
}

export const buttonText = {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold'
}

export const inputStyle = {
  height: 35,
  borderBottomWidth: 0.7,
  width: width * 0.7,
  borderBottomColor: '#B3B6B7'
}
