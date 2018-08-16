import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen, bigButton, buttonText } from '../../../mixins';
import { DisplayRadios } from '../../../mixins';

const RenderPollForm = ({ data, pushUpValue }) => {

  const RenderItemCard = ({ question, options, index }) => (
        <View style={{ maxHeight: height * 0.34, width, marginBottom: 20 }}> 
            <Text style={{ fontSize: 13, fontWeight: '600', marginBottom: 25, color: '#626363' }}> {`${parseInt(index) + 1}. ${question}`} </Text>
            <DisplayRadios values={options} pushToState={(value) => pushUpValue(index)(value) } style={{ paddingLeft: 10, marginTop: 10 }}/>
        </View>
  );

  const questions = () => Object.values(data.questions).map((question, index) => <RenderItemCard key={`item-${index}`} index={index} question={question} options={Object.keys(data.options[`${index}`])} />);
  
  return (
        <View style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingTop: 20,
          paddingLeft: 20,
          paddingBottom: 30
        }}> 
            <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10}}>{ data.title }</Text>
            <ScrollView 
                style={{
                  height: height * 0.8,
                  width,
                  paddingTop: 30,
                }}
                contentContainerStyle={{
                    justifyContent: 'space-between',
                }}
            > 
                { data.questions && data.questions && questions() }
            </ScrollView>
                <TouchableOpacity style={{ ...bigButton, }}> 
                    <Text style={{ ...buttonText }}> SUBMIT </Text>
                </TouchableOpacity>
        </View>
  );
};

export default class RenderPollPage extends Component {
    static navigatorStyle = {
      navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      tabBarHidden: true,
    }
  
    constructor(props) {
      super(props);
      const { navigator } = this.props;
      navigator.setDrawerEnabled({ side: 'left', enabled: false });
      navigator.setButtons({
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
        wantsToSeeResult: false
    }
    }

    pushUpValue = (index) => (value) => {
        console.log(value);
    }

    render = () => (
        <View style={{ flex: 1}}> 
            { this.props.data && !this.state.wantsToSeeResult && <RenderPollForm data={this.props.data[0]} pushUpValue={this.pushUpValue} />}
            { this.state.wantsToSeeResult && null }
        </View>
    )


}

