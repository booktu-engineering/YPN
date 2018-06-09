import { StyleSheet, Dimensions } from 'react-native'
import { defaultGreen, bigButton, buttonText } from '../../mixins/'

export const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  logoContainer: {
    height: height * 0.16
  },
  textContainer: {
    height: height * 0.22
  },

  largeText: {
    fontSize: 24,
    color: defaultGreen,
    fontWeight: '700',
    width: width * 0.73,
    marginBottom: 10,
    textAlign: 'center',
    position: 'relative',
    left: 20
  },

  mediumText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    width: width * 0.88,
    position: 'relative',
    right: 4
  },
  buttonStack: {
    height: height * 0.3,
    alignSelf: 'center'
  },

  bigButton: {
    ...bigButton,
    marginBottom: 25
  },

  bigButtonBlue: {
    ...bigButton,
    backgroundColor: '#2E86C1',
    marginBottom: 20
  },

  buttonText

})

export default styles
