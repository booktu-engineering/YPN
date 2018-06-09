import { StyleSheet } from 'react-native'
import { width, height, defaultGreen, formLabel, inputStyle, formContainer, formHolder } from '../../mixins/'

const styles = StyleSheet.create({
  greenBar: {
    height: height * 0.12,
    backgroundColor: defaultGreen,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  ImageHolder: {
    flex: 1,
    position: 'relative',
    top: 22
  },

  Image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },

  textHolder: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#18181850',
    position: 'absolute',
    zIndex: 3,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  smallText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  formLabel,
  formContainer,
  inputStyle,
  formHolder: {
    ...formHolder,
    height: height * 0.6,
    marginBottom: -10,
    marginTop: 35


  }

})

export default styles
