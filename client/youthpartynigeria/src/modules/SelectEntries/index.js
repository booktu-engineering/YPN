import React, { Component } from 'react';
import {
  View, Text, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import { height, width } from '../../mixins';

class RenderSelectEntries extends Component {
    renderItemsMain = () => {
      const { data, handleSelect } = this.props;
      const main = data.map(item => (
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: 'white',
            marginBottom: 10,
          }}
          onPress={() => handleSelect(item)}
          key={`item-${item}`}
        >
          { item }
        </Text>
      ));

      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 2
            }}
          >
            { main }
          </ScrollView>
        </View>

      );
    }

    render = () => (
      <TouchableWithoutFeedback
        style={{
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => { this.props._navigator.dismissLightBox(); }}
      >
        <View
          style={{
            height: height * 0.36,
            width: width * 0.8,
            backgroundColor: '#19191990',
            borderRadius: 5,
            zIndex: 3,
            paddingBottom: 10,
            paddingTop: 10
          }}
        >
          { this.props.data && this.renderItemsMain() }
        </View>
      </TouchableWithoutFeedback>
    )
}

export default RenderSelectEntries;
