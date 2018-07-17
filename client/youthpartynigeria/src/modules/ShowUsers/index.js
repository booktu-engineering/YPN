import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins/';
import { multipleUsers } from '../SingleUser/';
import configureStore from '../../store';

const { store } = configureStore();

class ShowUsersContainer extends Component {
    constructor(props){
        super(props)
        this.props.navigator.setButtons({
            leftButtons: [
                {
                    id: 'Back.nav', 
                    component: 'Back.Button', 
                    passProps: {
                        navigator: this.props.navigator,
                    }
                }
            ], 
        })
    }
  render = () => (
    <View style={{ flex:1, paddingTop: 20 }}>
      <View style={{ minHeight: height * 0.7, width }}>
        { multipleUsers(this.props.data)({ navigator: this.props.navigator, dispatch: store.dispatch })}
      </View>
    </View>
  )
}

ShowUsersContainer.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
}

export default ShowUsersContainer