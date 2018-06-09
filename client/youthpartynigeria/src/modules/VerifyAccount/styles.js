import { StyleSheet } from 'react-native'
import { width, height, defaultGreen } from '../../mixins/'

const styles = StyleSheet.create({

  imageHolder: {
    height: height * 0.4,
    width: width * 0.7,
  },
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    color: defaultGreen,
    textAlign: 'center'
  },

  promptText: {
    fontSize: 15,
    fontWeight: '500',
    position: 'absolute',
    bottom: height * 0.6,
    width: width * 0.8,
    textAlign: 'center'
  }
})

export default styles;
