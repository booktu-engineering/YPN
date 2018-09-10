import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { BackIcon } from '../IconRegistry';
import { EndProcess } from '../../helpers/uploader'
import { height, width } from '../../mixins'
import FetchAllPictures from '../../actions/thunks/media';

class Gallery extends Component {
  constructor(props){
    super(props);
    const { navigator } =  this.props
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
      width: 0,
      media: []
    }
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear' && this.state.media) return this.props.navigator.dismissLightBox();
  };

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  componentDidMount = () => {
    this.props.dispatch(FetchAllPictures(this.props.navigator))
    .then(media => {
      EndProcess(this.props.navigator);
      this.setState({ media })
    })
    .catch
  }

  _hideModal = () => this.setState({  height: 0, width: 0, zIndex: -1, opacity: 0, mainIndex: 10})

  showModal = (uri) => this.setState({  uri, opacity: 1, zIndex: 10, mainIndex: -1, height, width, });

  backIcon = () => <BackIcon navigator={this.props.navigator} />



  render = () => {
    return (
      <View style={{ minHeight: height, width }}>
        <View style={{ position: 'absolute', top: 0, flex: 1, zIndex: this.state.mainIndex }}>
          <GalleryComponent showImage={(uri) => this.showModal(uri) } media={this.state.media} />
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


const GalleryComponent = ({ showImage, media }) => {
  if(!media || !media.length) return null;
  const renderImages =  () => media.map((item) => (
    <ImageRenderer showImage={showImage} data={item.images} title={item.title || ""} />
  ))
  return (
    <View style={{ flex: 1, paddingLeft: 15, paddingTop: 10 }}>
    { /* styling the first guy */}
    <View style={{ maxHeight: height * 0.6, width,  }}>
      { /* the text part 'RECENT ---- march 2018'*/}
      <View style={{ height: 30, width, flexDirection: 'row', flexWrap: 'nowrap', paddingRight: 25, marginBottom: 8, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#626567' }}> Recent </Text>
      </View>
      <ScrollView>
        { renderImages() }
      </ScrollView>
    </View>
  </View>
  )
}

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

Gallery.navigatorStyle = {
  tabBarHidden: true
}

export default connect()(Gallery);
