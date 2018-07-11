import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import Screen from '../../../mixins/screen';
import { BackIcon } from '../../IconRegistry';
import { height, width, bigButton, buttonText, defaultGreen } from '../../../mixins';
import { data, composedProjects } from '../../SingleProject';
import { multipleCandidates } from '../../SingleCandidates/candidate';


class DonationMultiple extends Component {
  constructor(props) {
    super(props);
    Navigation.registerComponent('DM.Back.Button', () => this.__backIcon)
  }

  __backIcon = () => <BackIcon navigator={this.props.navigator} />

render = () => {
  const { props } = this;

  const renderItem = () => {
    if (props.category === 'Candidate') return multipleCandidates(props.target)({ navigator: props.navigator, indicator: true });
    if (props.category === 'Project') return composedProjects(props.target)({ ...data[0], navigator: props.navigator });
    if (props.category === 'Party') return composedProjects(props.target)({ ...data[1], navigator: props.navigator });
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height * 0.06, width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
        <View style={{ height: 2, width: width * 0.28, backgroundColor: '#B3B6B7' }} />
        <Text onPress={() => { props.navigator.pop() }} style={{ fontSize: 15, fontWeight: '600', color: '#B3B6B7', marginRight: 5, marginLeft: 5}}>
          {`${props.level} ${props.category}`}
        </Text>
        <View style={{ height: 2, width: width * 0.28, backgroundColor: '#B3B6B7' }}/>
      </View>
      { /* hello there */}
      <View style={{ minHeight: height * 0.9 }}>
        { renderItem() }
      </View>
      <Text style={{ fontSize: 13, fontWeight: '600', color: defaultGreen, }} onPress={() => { props.navigator.pop() }}> Back </Text>
    </View>
  );
}
}

DonationMultiple.navigatorButtons = {
  leftButtons: [
    {
      id: 'DMBACK',
      component: 'DM.Back.Button'
    }
  ]
};


DonationMultiple.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  navBarTextColor: '#ffffff',
  statusBarTextColorScheme: 'light',
};

export default DonationMultiple;
