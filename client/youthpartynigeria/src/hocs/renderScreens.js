import React from 'react';
import { View } from 'react-native';
import { defaultGreen } from '../mixins';

export default Component => (navigatorSettings, style = {}) => class Layout extends React.Component {
    static navigatorStyle = {
      navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      tabBarHidden: true
    }

    constructor(props) {
      super(props);
      const { navigator } = this.props;
      navigator.setButtons({
        leftButtons: [
          {
            id: 'Back.nav',
            component: 'Back.Button',
            passProps: {
              navigator,
              ...navigatorSettings
            }
          }
        ]
      });
    }

    render = () => (
      <View style={{ flex: 1, paddingTop: 20, ...style }}>
        <Component {...this.props} />
      </View>
    )
};
