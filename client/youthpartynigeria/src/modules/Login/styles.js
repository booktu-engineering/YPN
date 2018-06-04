import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({

  imageContainer: {
    height: height / 3
  },

  textDrop: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width,
  },

  header1: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },

  header2: {
    fontSize: 12,
    color: 'white'
  },

  formContainer: {
    height: 50,
    marginBottom: 50
  },
  formLabel: {
    fontSize: 12,
    color: '#2F2E2E'
  },
  formHolder: {
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 25
  },
  container: {
    height: height / 3,
    width: width * 0.6,
    alignSelf: 'center',
    marginTop: 20
  },
  formItem: {
    height: 35,
    borderBottomWidth: 0.7,
    width: width * 0.7,
    borderBottomColor: '#B3B6B7'
  },
  buttonContainer: {
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
  },
  buttonContent: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles
