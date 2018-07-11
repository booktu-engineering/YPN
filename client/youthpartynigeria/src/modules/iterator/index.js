import React from 'react';
import { FlatList, Text, ScrollView } from 'react-native';


const rollComponents = SomeComponent => data => (obj) => {
  const items = data.map((item, index) => <SomeComponent key={index} data={item} />);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SomeComponent key={item} data={item} obj={obj} />}
      keyExtractor={(item, index) => `ypn-item-${index}`}
    />
  );
};

export default rollComponents;
