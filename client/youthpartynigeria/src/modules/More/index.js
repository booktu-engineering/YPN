import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

render = () => {
  return (
    <View style={{ flex: 1}}>
      <Text> hello there seems like we changed the component </Text>
    </View>
  )
}
}

export default Home;
