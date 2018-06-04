import { StyleSheet, Dimensions } from 'react-native'
import { defaultGreen } from '../../mixins/colors'
import { bigButton, buttonText, inputStyle } from '../../mixins/'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  mainText: {
    fontSize: 20,
    color: defaultGreen,
    fontWeight: 'bold'
  },

  smallText: {
    width: width * 0.8,
    fontSize: 15,
    color: '#B3B6B7',
    textAlign: 'center'
  },

  bigButton,
  buttonText,
  inputStyle: {
    ...inputStyle,
    marginBottom: 32
  }
});

export default styles
