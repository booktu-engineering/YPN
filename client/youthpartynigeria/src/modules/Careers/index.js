import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { FetchAllCareers } from '../../actions/thunks/careers';
import { BackIcon } from '../IconRegistry';
import { height, width, TinySelectors, Selectors } from '../../mixins/'
import { ComposedCareers } from '../SingleCareer';

class Careers extends Component {
  constructor(props) {
    console.log('my nigga')
    super(props)
    const { navigator } =  this.props
    this.props.navigator.setStyle({
      tabBarHidden: true
    });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.button', 
          component: 'Back.Button', 
          passProps: {
            navigator
          }
        }
      ]
    });
  }
  componentDidMount = () => {
    console.log('hey')
    if(!this.props.careers) return this.props.dispatch(FetchAllCareers(this.props.navigator));
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  render = () => <RenderCareers navigator={this.props.navigator} data={ this.props.careers && this.props.careers.length ? this.props.careers : []}/>
}


const RenderCareers = ({ navigator, data }) => (
  <View style={{ height: height * 1.8 }}>
    <Selectors keys={['Vacancies', 'Voluntary']}/>
    <View style={{ height: height * 0.9, width }}>
      <TinySelectors keys={['Federal']}/>
      { ComposedCareers(data)({ navigator })}
    </View>
</View>
)

const mapStateToProps = (state) => ({
  careers: state.careers.all
})

export default connect(mapStateToProps)(Careers)
