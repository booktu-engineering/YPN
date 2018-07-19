import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { height, width } from '../../../mixins/'
import LinkPreview from 'react-native-link-preview'

class MediaHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: false,
      images: false
    }
  }

  componentDidMount() {
    console.log(this.props.data);
    // filter through the media
    
    if (this.props.data.media.length > 0 ) {
      const media = this.props.data.media.filter(item => item.constructor === Array);
      if (!media.length) return this.setState({ images: [] });
      return this.setState({ images: media })
    }
    const links = this.props.data.links.filter(item => item.length > 0);
    console.log(links)
    if (links.length > 0) {
      this.setState({ target: links[0]})
      LinkPreview.getPreview(links[0])
      .then(data => {
       this.setState({ data })
      })
    }
  }

 ImageRender = () =>{
  return (  this.state.images ?
   (  <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: width * 0.7, maxHeight: height * 0.31 }}>
        { this.RenderSingleItem(this.state.images) }
      </View>
    ) : null )
 }

  RenderSingleItem = (data) => data.map((uri, index) => <View key={index} style={{ maxHeight: height * 0.3, width: width * 0.34, backgroundColor: '#E5E7E9', marginRight: 3, marginBottom: 3 }}><Image style={{ height: this.__calculateHeight(data), width: width * 0.34 }} source={{ uri: uri[0] }}/></View>)

 renderLink = (link, abort) => {
   this.request = LinkPreview.getPreview
   LinkPreview.getPreview(link)
   .then(data => {
    this.setState({ data })
    return this.previewLink(this.state.data)
   })
 }

 componentWillUnmount = () => {
   this.setState({ media: [], links: []});
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
   const { data } =  this.state
   return data ? (
     <TouchableOpacity onPress={() => { this.props.navigator.showModal({ screen: 'Web.Page',  title: this.state.target, passProps: { source: this.state.target }})}} style={{ borderWidth: 1, width: width * 0.65, maxHeight: height * 0.25, borderRadius : 5, borderColor: '#F2F3F4'}}>
       <Image source={{ uri: data.images[0] }} style={{ height: height * 0.1, width: width * 0.65 }} />
       <View style={{ borderTopWidth: 0.5, borderTopColor: '#F2F3F4', paddingLeft: 10, paddingTop: 5, paddingBottom: 10, backgroundColor: '#ECF0F1' }}>
         <Text style={{ fontSize: 13, color: '#171717', fontWeight: '600', marginBottom: 5 }}> {data.title} </Text>
         <Text style={{ fontSize: 11, width: width * 0.62 }}> {`${this.__truncateText(data.description)}...`} </Text>
       </View>
   </TouchableOpacity>
 ) : null
 }

  render = () => {
    return this.state.data ? this.previewLink() : this.ImageRender()
  }
}

export default MediaHandler

//
