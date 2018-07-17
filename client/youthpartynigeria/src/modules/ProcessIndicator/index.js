import React from 'react'; 
import { MaterialIndicator } from 'react-native-indicators';
import { View } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';


const ProcessInd = () => (
    <View style={{
      height, 
      width, 
      backGroundColor: '#FBFBFC30', 
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
     <View
        style={{
          height: height * 0.3, 
          width: height * 0.3, 
          borderRadius: 10, 
          backGroundColor: 'white', 
          justifyContent: 'center', 
          alignItems: 'center',
        }}
     > 
        <MaterialIndicator color={defaultGreen} size={20} />
     </View>
    </View>
)

ProcessInd.navigatorStyle = {
  navBarHidden: true
}

export default ProcessInd;