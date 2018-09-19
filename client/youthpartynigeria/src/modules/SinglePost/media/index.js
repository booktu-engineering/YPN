import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { height, width } from '../../../mixins/'
import LinkPreview from 'react-native-link-preview'
import { defaultGreen } from '../../../mixins/colors';

class MediaHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: false,
      images: false
    }
  }

  componentDidMount() {
    this.mounted = true;
    // filter through the media
    if (this.props.data.media.length > 0 ) {
      const media = this.props.data.media.filter(item => item.constructor === Array);
      if (!media.length) return this.setState({ images: [] });
      return this.setState({ images: media[0] })
    }
    const links = this.props.data.links.filter(item => item.length > 0);
    if (links.length > 0) {
     this.request = LinkPreview.getPreview(links[0])
      .then((data) => {
       this.mounted && this.setState({ data, target: links[0], linkGotten: true })
      })
      .catch(() => this.mounted && this.setState({ data: true, linkGotten: false, target: links[0]}))
    }
  }

  shouldComponentUpdate = () => {
    if(this.state.data || this.state.images) return false;
    return true;
  }

 ImageRender = () =>{
  return (  this.state.images ?
   (  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width * 0.7, maxHeight: height * 0.31 }}>
        { this.RenderSingleItem(this.state.images) }
      </View>
    ) : null )
 }

  RenderSingleItem = (data, index) => data.map((uri, index) => <TouchableWithoutFeedback  onPress={() => this.showImage(index)} key={index} style={{ maxHeight: height * 0.3, width: width * 0.34, backgroundColor: '#BDC3C7', marginBottom: 3, marginLeft: 10 }}><Image style={{ height: this.__calculateHeight(data), width: width * 0.31 }} source={{ uri: uri || '' }}/></TouchableWithoutFeedback>)

  showImage = (index) => {
    // reduce the images
    this.props.navigator.showLightBox({ screen: 'Show.Image', passProps: { data: this.state.images, index }});
  }

 componentWillUnmount = () => {
   this.state.media = [];
   this.state.links = [];
   this.mounted = false;
 }

__calculateHeight = (data) => {
  if(data.length > 3) return height * 0.15;
  if(data.length < 3) return height * 0.2;
  return height * 0.15;
}

__truncateText = (text) => {
  if (!text) return null;
  return text.split(' ').slice(0, 9).join(' ')
}

 previewLink = () => {
   const { data, linkGotten } =  this.state
   return data && linkGotten ? (
     <TouchableOpacity onPress={() => { this.props.navigator.showModal({ screen: 'Web.Page',  title: this.state.target, passProps: { source: this.state.target }})}} style={{ borderWidth: 1, width: width * 0.65, maxHeight: height * 0.25, borderRadius : 5, borderColor: '#F2F3F4'}}>
       <Image source={{ uri: data.images[0] || '' }} style={{ height: height * 0.1, width: width * 0.65 }} />
       <View style={{ borderTopWidth: 0.5, borderTopColor: '#F2F3F4', paddingLeft: 10, paddingTop: 5, paddingBottom: 10, backgroundColor: '#ECF0F1' }}>
         <Text style={{ fontSize: 13, color: '#171717', fontWeight: '600', marginBottom: 5 }}> {data.title} </Text>
         <Text style={{ fontSize: 11, width: width * 0.62 }}> {`${this.__truncateText(data.description)}...`} </Text>
       </View>
   </TouchableOpacity>
 ) : (<Text 
  style={{ 
    width: width * 0.6, 
    fontSize: 12, 
    fontWeight: '500', 
    color: defaultGreen, 
    textDecoration: 'underline' 
  }}
  onPress={() => { this.props.navigator.showModal({ screen: 'Web.Page',  title: this.state.target, passProps: { source: this.state.target }})}}
  >
  {this.state.target}
  </Text>)
 }

  render = () => {
    return this.state.data ? this.previewLink() : this.ImageRender()
  }
}

export default MediaHandler

//
