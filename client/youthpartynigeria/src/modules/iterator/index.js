import React, { Component } from 'react';
import { FlatList, Text, ScrollView, RefreshControl, View } from 'react-native';


const rollComponents = SomeComponent => data => (obj) => {
  const items = data.map((item, index) => <SomeComponent key={index} data={item} />);
  const determineRefresh = () => {
    if(!obj.refreshable) return false;
    return (
      <RefreshControl 
        refreshing={obj.refreshing}
        onRefresh={obj.onRefresh}
        size={15}
        color="#D7DBDD"
      />
    );
  };
  class Scrollable extends Component {
    constructor(props){
      super(props);
      this.state = {
        refreshable: true
      };
      this.state.data = this.props.data
    }
    shouldComponentUpdate = (nextProps) => {
      if(this.props.data.length === nextProps.data.length) return false;
    }
    render = () => (
      <FlatList
    data={this.props.data}
    renderItem={({ item }) => <SomeComponent key={item} data={item} obj={obj} />}
    keyExtractor={(item, index) => `ypn-item-${index}`}
    refreshControl={determineRefresh()}
    extraData={this.props.data}
  />
    )
  }

  return <Scrollable data={data} {...obj} />
};

export default rollComponents;
