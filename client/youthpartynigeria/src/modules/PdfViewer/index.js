import React from 'react';
import Pdf from 'react-native-pdf';
import { View, WebView, Text } from 'react-native';
import { width, defaultGreen } from '../../mixins';

const PDFViewer = ({ navigator, source }) => {
  navigator.setButtons({
    leftButtons: [
      {
        id: 'Back.nav',
        component: 'Back.Button',
        passProps: {
          navigator,
          modal: true
        }
      }
    ]
  });
  const docs = {
    1: require('../../docs/Beliefs.pdf'),
    2: require('../../docs/Constitution.pdf'),
    3: require('../../docs/Leadership.pdf'),
    4: require('../../docs/Manifesto.pdf'),
    5: require('../../docs/obj.pdf'),
    5: require('../../docs/Primaries.pdf')
  };

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={docs[source]}
        style={{
          flex: 1,
          width
        }}
      />
    </View>
  );
};

PDFViewer.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 },
};

export default PDFViewer;