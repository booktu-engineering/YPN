import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BackIcon } from '../IconRegistry';
import { height, width } from '../../mixins'

class Gallery extends Component {
  constructor(props){
    super(props);
    const { navigator } =  this.props
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.Nav.G',
          component: 'Back.Button', 
          passProps: {
            navigator
          }
        }
      ]
    })
    this.state = {
      uri: '',
      zIndex: -1,
      opacity: 0,
      mainIndex: 10,
      height: 0,
      width: 0
    }
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  _hideModal = () => this.setState({  height: 0, width: 0, zIndex: -1, opacity: 0, mainIndex: 10})

  showModal = (uri) => this.setState({  uri, opacity: 1, zIndex: 10, mainIndex: -1, height, width, });

  backIcon = () => <BackIcon navigator={this.props.navigator} />



  render = () => {
    return (
      <View style={{ minHeight: height, width }}>
        <View style={{ position: 'absolute', top: 0, flex: 1, zIndex: this.state.mainIndex }}>
          <GalleryComponent showImage={(uri) => this.showModal(uri) }/>
        </View>
        <TouchableOpacity onPress={() => { this._hideModal()}} style={{ position:'absolute', top: 0, height: this.state.height, width: this.state.width, justifyContent: 'center', alignItems: 'center', zIndex: this.state.zIndex, opacity: this.state.opacity, backgroundColor: '#15151570' }}>
          <Image
            source={{ uri: this.state.uri }}
            style={{
              height: height * 0.5,
              width: width * 0.8,
              borderRadius: 5,
              alignSelf: 'center',
              opacity: this.state.opacity
            }}
            />
        </TouchableOpacity>
      </View>

    )
  }
}


const data1 = [
  'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg',
  'https://www.trendiee.com/wp-content/uploads/2017/12/7a53e6c1e9ab6ba3b16ed1ac72193bff514e3a45.jpg',
  'https://www.gannett-cdn.com/-mm-/81034ded919571c569b0c0551c674f54b4ddfc01/c=218-0-3623-2560&r=x404&c=534x401/local/-/media/2017/04/23/USATODAY/USATODAY/636285684763067730-Genius-Portraits-001.jpg',
  'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg',
]
const GalleryComponent = ({ showImage }) => (
  <View style={{ flex: 1, paddingLeft: 15, paddingTop: 10 }}>
    { /* styling the first guy */}
    <View style={{ maxHeight: height * 0.6, width,  }}>
      { /* the text part 'RECENT ---- march 2018'*/}
      <View style={{ height: 30, width, flexDirection: 'row', flexWrap: 'nowrap', paddingRight: 25, marginBottom: 8, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#626567' }}> Recent </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7'}}> Mar 2018 </Text>
      </View>
      <ScrollView>
        <ImageRenderer showImage={showImage} data={data1} title="Capacity Building Workshop"/>
        <ImageRenderer showImage={showImage} data={data1} title="3rd Disciplinary Committee Meeting"/>
      </ScrollView>
    </View>
    <View style={{ maxHeight: height * 0.6, width,  }}>
      { /* the text part 'RECENT ---- march 2018'*/}
      <View style={{ height: 30, width, flexDirection: 'row', flexWrap: 'nowrap', paddingRight: 25, marginBottom: 8, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#626567' }}> Older </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7'}}> Oct 2017 </Text>
      </View>
      <ScrollView>
          <ImageRenderer showImage={showImage} data={data1} title="Capacity Building Workshop"/>
      </ScrollView>
    </View>
  </View>
)

const ImageRenderer = ({ title, data, showImage }) => (
  <View style={{ maxHeight: height * 0.3, width, marginTop: 5, marginBottom: 15 }}>
    <Text style={{ fontSize: 13, fontWeight: '600', color:'#B3B6B7', marginBottom: 15}}> { title }</Text>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({item}) => (<TouchableOpacity
            style={{
            height: height * 0.17,
            width: width * 0.31,
            marginRight: 15,
            shadowOffset: { width: 1, height: 17 },
            shadowOpacity: 0.1,
            shadowColor: 'black',
            shadowRadius: 2
          }}
            onPress={() => showImage(item)}
        >
        <Image
          style={{
              height: height * 0.17,
              width: width * 0.31,
              borderRadius: 5,
            }}
          source={{ uri: item }}
           />
       </TouchableOpacity>)}
        />
  </View>
)


export default Gallery;
