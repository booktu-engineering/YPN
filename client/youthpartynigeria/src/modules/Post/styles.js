import { StyleSheet } from 'react-native';
import { height, width, defaultGreen } from '../../mixins/'

const styles = StyleSheet.create({
  base: {
    height: height * 0.35,
    backgroundColor: 'white',
    width: width * 0.85,
    alignSelf: 'center',
    position: 'relative',
    left: -10,
    borderColor: '#D0D3D4',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  },
  largeInput: {
    width: width * 0.85,
    height: height * 0.29,
    color: '#979A9A',
    fontSize: 13,
    fontWeight: '500',
    position: 'absolute',
    top: 0,
    paddingLeft: 15,
    paddingTop: 22,
    paddingRight: 10
  },
  ImageUploader: {
    height: height * 0.06,
    width: width * 0.85,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: `${defaultGreen}40`,
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
  },
  base2: {
    backgroundColor: 'white',
    height: height * 0.15,
    width: width * 0.85,
    borderColor: '#D0D3D4',
    borderWidth: 1.2,
    borderRadius: 5,
    position: 'relative',
    right: -5,
    marginBottom: 20
  },
  smallInput: {
    color: '#979A9A',
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 13,
    fontWeight: "500"
  }
})

export default styles
