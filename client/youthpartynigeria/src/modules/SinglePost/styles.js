import { StyleSheet } from 'react-native'
import { height, width } from '../../mixins'

const styles = StyleSheet.create({
  base: {
    width,
    maxHeight: height * 0.58,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 40,
    // paddingRight: 20,
    position: 'relative',
  },
  baseButtonStack: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width,
    paddingLeft: 5,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D3D450',
    paddingBottom: 10
  },
  button: {
    flexDirection: 'row',
    width: width * 0.25,
    flexWrap: 'nowrap'
  },
  buttonLower: {
    flexDirection: 'row',
    width: width * 0.25,
    flexWrap: 'nowrap',
    position: 'relative',
    bottom: -1
  },
  buttonLowerR: {
    flexDirection: 'row',
    width: width * 0.25,
    flexWrap: 'nowrap',
    position: 'relative',
    bottom: -1,
    right: -30
  }
})

export default styles
