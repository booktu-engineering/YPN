import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Screen from '../../../mixins/screen';
import { height, width, bigButton, buttonText, defaultGreen } from '../../../mixins';
import { data, composedProjects } from '../../SingleProject';
import { multipleCandidates } from '../../SingleCandidates/candidate';


class DonationMultiple extends Screen {
  constructor(props){
    super(props, 'DM.Back.Button');

  }

  render = () => <DonationMultipleComponent props={this.props}/>
}

const DonationMultipleComponent = ({ props }) =>  {
  let renderItem = () => {
    if (props.category === 'Candidate') return multipleCandidates([1,2,3,4,5,6,7])({ navigator: props.navigator, indicator: true });
    if (props.category === 'Project') return composedProjects([1,2,3,4,5,6,7])({ ...data[0], navigator: props.navigator });
    if (props.category === 'Party') return composedProjects([1,2,3,4,5,6,7])({ ...data[1], navigator: props.navigator });
    return null;
  }
  return (
    <View style={{ height, width, paddingTop: 10 }}>
      { /* this should render the text nicely */}
      <View style={{ height: height * 0.06, width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <View style={{ height: 2, width: width * 0.28, backgroundColor: '#B3B6B7' }}></View>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#B3B6B7', marginRight: 5, marginLeft: 5 }}> { `${props.level} ${props.category}`} </Text>
        <View style={{ height: 2, width: width * 0.28, backgroundColor: '#B3B6B7' }}></View>
      </View>
      { /* this should render the gird */}
      <View style={{ height: height * 0.9 }}>
        { renderItem() }
      </View>
      { /* Button text */}
    </View>
  )
}

DonationMultiple.navigatorButtons = {
  leftButtons: [
    {
      id: 'DM.Back.Nav',
      component: 'DM.Back.Button'
    }
  ]
}


DonationMultiple.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  navBarTextColor: '#ffffff',
   statusBarTextColorScheme: 'light',
}

export default DonationMultiple;
