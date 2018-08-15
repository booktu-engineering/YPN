import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from '../../actions/thunks/candidates';
import { dispatchNotification, EndProcess, StartProcess } from '../../helpers/uploader';
import {
  height, width, bigButton, buttonText
} from '../../mixins';

class CandidateScreen extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.button',
          component: 'Back.Button',
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    });
  }

  componentDidMount = () => {
    const {
      positions,
      dispatch,
      navigator,
      sponsored,
      aspirants
    } = this.props;
    dispatch(Actions.FetchAllExcos());
    if (!positions || !positions.length) {
      dispatch(Actions.FetchAllPositions(navigator)());
    } if (!sponsored || !aspirants || !sponsored.length) {
      dispatch(Actions.FetchAllCandidates(navigator)());
    }
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  handlePress = (key) => {
    if (key === 'aspirants') {
      if (!this.props.aspirants) {
        StartProcess(navigator);
        return this.props.dispatch(Actions.FetchAllCandidates(this.props.navigator)((data) => {
          EndProcess(navigator);
          if (!data.aspirants.length) return dispatchNotification(this.props.navigator)('There are no aspirants currently at this moment, Please check back');
          return this.props.navigator.push({ screen: 'Open.Position', title: 'Aspirants', passProps: { definition: 1, data: [...data.aspirants], target: data } });
        }));
      }
      if (!this.props.aspirants.length) return dispatchNotification(this.props.navigator)('There are no aspirants running currently, Please check back');
      return this.props.navigator.push({ screen: 'Open.Position', title: 'Aspirants', passProps: { definition: 1, data: [...this.props.aspirants], target: this.props } });
    }
    // the user wants to see the sponsored candidates;
    if (key === 'sponsored') {
      if (!this.props.sponsored) {
        StartProcess(navigator);
        return this.props.dispatch(Actions.FetchAllCandidates(this.props.navigator)((data) => {
          EndProcess(navigator);
          if (!data.sponsored.length) return dispatchNotification(this.props.navigator)('Looks like there are no sponsored candidates yet, Please check back');
          return this.props.navigator.push({ screen: 'Open.Position', title: 'Sponsored Candidates', passProps: { definition: 3, data: [...data.sponsored] } });
        }));
      }
      if (!this.props.sponsored.length) return dispatchNotification(this.props.navigator)('Looks like there are no sponsored candidates, Please check back');
      console.log('ass')
      return this.props.navigator.push({ screen: 'Open.Position', title: 'Sponsored Candidates', passProps: { definition: 3, data: [...this.props.sponsored] } });
    }

    // called without args, then he/she wants to run for office - this should help the user see
    // open positions
    if (!this.props.positions) {
      StartProcess(navigator);
      return this.props.dispatch(Actions.FetchAllPositions(this.props.navigator)((data) => {
        EndProcess(this.props.navigator);
        if (!data.length) return dispatchNotification(this.props.navigator)('There are no positions currently, Please check back');
        return this.props.navigator({ screen: 'Open.Position', title: 'Open Positions', passProps: { definition: 2, data: [...data.aspirants] } });
      }));
    }
    if (!this.props.positions.length) return dispatchNotification(this.props.navigator)('There are no positions currently, Please check back');
    return this.props.navigator.push({ screen: 'Open.Position', title: 'Open Positions', passProps: { data: [...this.props.positions] } });
  }


  render = () => <RenderCandidate handlePress={this.handlePress} navigator={this.props.navigator} />
}

const RenderCandidate = ({ handlePress }) => (
  <View style={{ flex: 1 }}>
    { /* render the activities thing */}
    <View style={{ height: height * 0.43, width, justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => handlePress('aspirants')}
        style={{
          height: height * 0.13,
          paddingLeft: 15,
          paddingRight: 15,
          justifyContent: 'center',
          borderColor: '#B3B6B750',
          position: 'relative',
          borderBottomWidth: 0.3
        }}
      >
        <Text style={{
          fontSize: 15,
          fontWeight: '600',
          color: '#626567',
          marginBottom: 10
        }}
        >
Aspirants
        </Text>
        <Text style={{
          fontSize: 13,
          fontWeight: '500',
          color: '#B3B6B7'
        }}
        >
Click to see approved parties
          {' '}
        </Text>
        <Text style={{
          fontSize: 13,
          fontWeight: '500',
          color: '#B3B6B7',
position: 'absolute',
top: ((height * 0.15) * 0.25),
right: 15
        }}
        >
View
        </Text>
      </TouchableOpacity>
      { /* Run for office */}
      <TouchableOpacity
        style={{
          height: height * 0.15,
          paddingLeft: 15,
          paddingRight: 15,
          justifyContent: 'center',
          borderColor: '#B3B6B750',
          position: 'relative',
          borderBottomWidth: 0.3
        }}
        onPress={() => { handlePress(); }}
      >
        <Text style={{
          fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
        }}
        >
          {' '}
Run For Office
          {' '}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
          {' '}
Apply to run for office
          {' '}
        </Text>
        <Text style={{
          fontSize: 13, fontWeight: '500', color: '#B3B6B7', position: 'absolute', top: ((height * 0.15) * 0.25), right: 15
        }}
        >
View
        </Text>
      </TouchableOpacity>
      { /* Sponsored Candidates */}
      <TouchableOpacity
        onPress={() => { handlePress('sponsored'); }}
        style={{
          height: height * 0.15, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3
        }}
      >
        <Text style={{
          fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
        }}
        >
          {' '}
Sponsored Candidates
          {' '}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
          {' '}
Click to view all candidates
          {' '}
        </Text>
        <Text style={{
          fontSize: 13, fontWeight: '500', color: '#B3B6B7', position: 'absolute', top: ((height * 0.15) * 0.25), right: 15
        }}
        >
View
        </Text>
      </TouchableOpacity>
    </View>
    { /* open positions button at the bottom */}
    <TouchableOpacity
style={{
      ...bigButton,
      position: 'absolute',
      bottom: 15 
}}
      onPress={() => { handlePress(); }}
    >
      <Text style={{ ...buttonText }}>
        {' '}
OPEN POSITIONS
        {' '}
      </Text>
    </TouchableOpacity>
  </View>
);

const mapStateToProps = state => ({
  positions: state.positions.all,
  aspirants: state.positions.aspirants,
  sponsored: state.positions.sponsored
});

export default connect(mapStateToProps)(CandidateScreen);
