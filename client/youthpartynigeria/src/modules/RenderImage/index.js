import React, { Component } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { View, Image, TouchableOpacity } from 'react-native';
import { height, width } from '../../mixins';
import { defaultGreen } from '../../mixins/colors';

const ImageComponent = ({ source, navigator }) => (
  <View style={{
      height,
      width,
      position: 'relative'
    }}
    >
      <Image
          source={source}
          style={{
              position: 'absolute',
              top: 0,
              height,
              width,
              resizeMode: 'contain'
            }}
        />
      {/* close button */}
    </View>
);

const NextButton = <Ionicon name="ios-arrow-forward" size={24} color="white" />;
const PrevButton = <Ionicon name="ios-arrow-back" size={24} color="white" />;
const RenderImages = ({ images, navigator, index }) => (
    <Swiper
      loop
      showsButtons
      height={height}
      width={width}
      index={index || 0}
      nextButton={NextButton}
      prevButton={PrevButton}
      dotColor="white"
      activeDotColor={defaultGreen}
    >
      { images.map((uri) => <ImageComponent key={`${uri}`} source={{ uri }} navigator={navigator} />)}
    </Swiper>

);

const ShowImagePage = (props) => {
  const { data, navigator, index } = props;
  navigator.toggleTabs({ to: 'hidden', animated: false });
  navigator.setDrawerEnabled({ side: 'left', enabled: false });
  return (
      <View style={{ height, width, backgroundColor: '#25252598', position: 'relative' }}>
          { data.length > 1 && <RenderImages images={data} index={index} navigator={navigator} />}
          { data.length === 1 && <ImageComponent source={{ uri: data[0] }} navigator={navigator} />}
          <TouchableOpacity
style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 5,
          backgroundColor: '#25252590',
          alignItems: 'center',
          justifyContent: 'center'
        }}
          onPress={() => navigator.dismissLightBox({})}
        >
          <Ionicon name="ios-close" color="white" size={25} />
        </TouchableOpacity>
        </View>
  );
};


export default ShowImagePage;
