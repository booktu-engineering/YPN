import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import { fetchAllDonations, filterThroughDonations } from '../../actions/thunks/donations';
import { BackIcon } from '../IconRegistry';
import { height, width, DisplayRadios, defaultGreen, bigButton, buttonText } from '../../mixins';
import { dispatchNotification } from '../../helpers/uploader';

class DonationScreen extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    Navigation.registerComponent('Do.Back.Button', () => this.backIcon);
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
        id: 'button.back', 
        component: 'Back.Button',
        passProps: {
          navigator
        }
      }
      ]
    })
    this.state = {
      category: null,
      level: null
    };
  }

  componentDidMount = () => {
    if (!this.props.donations) return this.props.dispatch(fetchAllDonations(navigator));
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  _pushToState = (value) => {
    const levels = ['Federal', 'State', 'Local'];
    const categories = ['Party', 'Candidate', 'Project'];
    if (levels.includes(value)) return this.setState({ level: value });
    this.setState({ category: value });
  }


    navigate = () => {
      if (!this.props.donations || !this.props.donations.length) {
        dispatchNotification(navigator)('Hey, seems like there are no donations available for now');
        return navigator.pop();
      }
      /* eslint max-len: 0 */
      const query = { type: this.generateTrueCategory(), level: this.state.level, category: this.state.category };
      this.props.dispatch(filterThroughDonations(query)(this.props.navigator));
    }

    generateTrueCategory = () => {
      switch (this.state.category) {
        case 'Party':
          return 1;
        case 'Candidate':
          return 2;
        case 'Project':
          return 3;
        default:
          return 1;
      }
    }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

render = () => <DonationComponent navigate={this.navigate} pushUpToState={value => this._pushToState(value)} />;
}


const DonationComponent = ({ pushUpToState, navigate }) => (
  <View style={{ flex: 1 }}>
    <View style={{
 height: height * 0.2, width, backgroundColor: defaultGreen, flexDirection: 'row', paddingLeft: 35, marginBottom: 20, flexWrap: 'nowrap', alignItems: 'center'
}}
    >
      <View style={{
 width: width * 0.4, height: height * 0.1, borderRightWidth: 1, borderColor: 'white'
}}
      >
        <Text style={{
 fontSize: 13, fontWeight: '600', color: 'white', marginBottom: 10
}}
        >  Goal
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}> N1,000,000 </Text>
      </View>
      {/* total donations */}
      <View style={{ width: width * 0.4, height: height * 0.1, paddingLeft: 20 }}>
        <Text style={{
 fontSize: 13, fontWeight: '600', color: 'white', marginBottom: 10
}}
        >  Total Donation
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}> N1,000,000 </Text>
      </View>
    </View>
    { /* Render the radio buttons */}
    <View style={{ height: height * 0.6, width }}>
      <Text style={{
 fontSize: 17, fontWeight: '500', color: '#979A9A', alignSelf: 'center'
}}
      > How would you like to donate ?
      </Text>
      { /* Select a level */}
      <View style={{
 maxHeight: height * 0.2, width, marginTop: 30, paddingLeft: 35
}}
      >
        <Text style={{
 fontSize: 14.5, fontWeight: '600', color: '#626567', marginBottom: 17
}}
        > Please select a level
        </Text>
        <DisplayRadios values={['Federal', 'State', 'Local']} pushToState={value => pushUpToState(value)} />
      </View>
      { /* select the category */}
      <View style={{
 maxHeight: height * 0.2, width, marginTop: 30, paddingLeft: 30
}}
      >
        <Text style={{
 fontSize: 14.5, fontWeight: '600', color: '#626567', marginBottom: 17
}}
        > Please select a level
        </Text>
        <DisplayRadios values={['Party', 'Candidate', 'Project']} pushToState={value => pushUpToState(value)} />
      </View>
    </View>
    { /* the button */}
    <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 1 }} onPress={() => navigate()}>
      <Text style={{ ...buttonText }}> PROCEED </Text>
    </TouchableOpacity>
  </View>
);


DonationScreen.navigatorStyle = {
  navBarNoBorder: true
};

const mapStateToProps = state => ({
  donations: state.donations.all
});

export default connect(mapStateToProps)(DonationScreen);
