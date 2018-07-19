import React, { Component } from 'react'; 
import { WebView } from 'react-native';
import { defaultGreen } from '../../mixins/'


class WebPage extends Component {
    constructor(props) {
        super(props)
        const { navigator } =  this.props
        navigator.setDrawerEnabled({ side: 'left', enabled: false });
        this.props.navigator.setButtons({
          leftButtons: [
            {
              id: 'Back.button', 
              component: 'Back.Button', 
              passProps: {
                navigator, 
                modal: true
              }
            }
          ]
        });
      }
      
render = () => (
    <WebView
    source={{ uri: this.props.source }}
    style={{ marginTop: 20 }}
    >
    </WebView>
    )
    
}

WebPage.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
  };
  
  WebPage.navigatorStyle = {
    tabBarHidden: true
  }
export default WebPage