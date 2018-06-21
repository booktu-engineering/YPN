import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
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
    if (this.props.data.mediaType === 1) return this.setState({ images: this.props.data.images })
    if (this.props.data.mediaType === 2) {
      LinkPreview.getPreview(this.props.data.links[0])
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

  RenderSingleItem = (data) => data.map((uri, index) => <View key={index} style={{ maxHeight: height * 0.3, width: width * 0.34, backgroundColor: '#E5E7E9', marginRight: 3, marginBottom: 3 }}><Image style={{ height: this.__calculateHeight(data), width: width * 0.34 }} source={{ uri }}/></View>)

 renderLink = (link, abort) => {
   this.request = LinkPreview.getPreview
   LinkPreview.getPreview(link)
   .then(data => {
    this.setState({ data })
    return this.previewLink(this.state.data)
   })

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
     <View style={{ borderWidth: 1, width: width * 0.65, maxHeight: height * 0.25, borderRadius : 5, borderColor: '#F2F3F4'}}>
       <Image source={{ uri: data.images[0] }} style={{ height: height * 0.1, width: width * 0.65 }} />
       <View style={{ borderTopWidth: 0.5, borderTopColor: '#F2F3F4', paddingLeft: 10, paddingTop: 5, paddingBottom: 10, backgroundColor: '#ECF0F1' }}>
         <Text style={{ fontSize: 13, color: '#171717', fontWeight: '600', marginBottom: 5 }}> {data.title} </Text>
         <Text style={{ fontSize: 11, width: width * 0.62 }}> {`${this.__truncateText(data.description)}...`} </Text>
       </View>
   </View>
 ) : null
 }

  render = () => {
    return this.state.data ? this.previewLink() : this.ImageRender()
  }
}

export default MediaHandler

//
