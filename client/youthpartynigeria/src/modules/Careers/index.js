import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { FetchAllCareers } from '../../actions/thunks/careers';
import { BackIcon } from '../IconRegistry';
import { height, width, TinySelectors, Selectors } from '../../mixins/'
import { ComposedCareers } from '../SingleCareer';

class Careers extends Component {
  constructor(props) {
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
    this.state = {
      data: this.props.careers || []
    }
  }
  
  componentDidMount = () => {
    if(!this.props.careers) return this.props.dispatch(FetchAllCareers(this.props.navigator));
    // if(this.state.data.length) return this.setState({ data: this.props.careers.filter(item => !item.meta.voluntary )});
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.careers && this.props.careers.length && !prevProps.careers){
      console.log('uypdating')
      this.setState({ data: this.props.careers.filter(item => !item.meta.voluntary)})
    }
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  functionOne = () => {
    if(!this.props.careers || !this.props.careers.length) return;
    const data = this.props.careers && this.props.careers.filter(item => !item.meta.voluntary);
    this.setState({ data })
  }

  functionTwo = () => {
    if(!this.props.careers || !this.props.careers.length) return;
    const data = this.props.careers && this.props.careers.filter(item => item.meta.voluntary);
    this.setState({ data })
  }


  // functionMap = () => {
  //   const filter1 = this.props.careers && this.props.careers.filter(item => !item.meta.voluntary);
  //   const filter2 = this.props.careers && this.props.careers.filter(item => item.meta.volutary)
  //   const functionOne = () => filter1 && this.setState({ data: filter1 });
  //   const functionTwo = () => filter2 && this.setState({ data: filter2 });
  //   return [ functionOne, functionTwo ];
  // }

  render = () => <RenderCareers navigator={this.props.navigator} data={this.state.data} functionMap={[ this.functionOne, this.functionTwo ]} />
}


const RenderCareers = ({ navigator, data, functionMap }) => (
  <View style={{ height: height * 1.8,}}>
    <Selectors keys={['Vacancies', 'Voluntary']}  functionMap={functionMap} />
    <View style={{ height: height * 0.9, width }}>
      {/* <TinySelectors keys={['Federal']}/> */}
      { ComposedCareers(data)({ navigator })}
    </View>
</View>
)

const mapStateToProps = (state) => ({
  careers: state.careers.all
})

export default connect(mapStateToProps)(Careers)
