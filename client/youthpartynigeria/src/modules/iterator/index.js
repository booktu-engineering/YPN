import React from 'react';
import { FlatList, Text, ScrollView, RefreshControl } from 'react-native';


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

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SomeComponent key={item} data={item} obj={obj} />}
      keyExtractor={(item, index) => `ypn-item-${index}`}
      refreshControl={determineRefresh()}
    />
  );
};

export default rollComponents;
