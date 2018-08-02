import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { width } from '../../mixins';
import MediaHandler from './media';
import iterator from '../iterator';
import { fetchUserThunk } from '../../actions/thunks/user';
import { LikePost } from '../../actions/thunks/posts';

const imageUrl = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';


const Data1 = {
  mediaType: 1,
  images: [
    'https://ssli.ulximg.com/image/740x493/gallery/1518114598_056fb04615daf8650639537aa627956f.jpg/b1b3d1ee5cb404ca6d82fd8e233aca43/1518114598_5a9d4ad0eeebe0889ac6b060128aab67.jpg',
    'https://mtonews.com/.image/t_share/MTU0MzQzNjA3MDcxNDgzMjE2/donald_glover_pale.jpg',
    'https://cdn.shopify.com/s/files/1/1213/5490/products/20170224150500_9223_2048x.jpg?v=1527283347',
    'https://www.hdwallback.net/wp-content/uploads/2017/12/elephant-wallpaper-scapegoat-imagenes-tumblr-mobile.jpg'
  ]
};

const Data2 = {
  mediaType: 2,
  links: [
    'https://brightthemag.com/the-next-trend-in-travel-is-dont-226d4aba17f6'
  ]
};

const mockText = 'It is now ndisputable that e people f Nigeria are united. I believe in an urgent restoration of active and particiatory democracy ';
const SinglePost = ({ data, obj }) => (
  <View style={styles.base}>
    <View style={styles.mainContent}>
      {/* this should render the users avatar and all of that */}
      <TouchableOpacity
        style={{
          height: 50, width: 50, borderRadius: 25, position: 'absolute', top: 20, left: 15
        }}
        onPress={() => { obj.dispatch(fetchUserThunk(data.origin.id)(obj.navigator)); }}
      >
        <Image
          style={{
            height: 50, width: 50, borderRadius: 25, position: 'absolute', top: 0
          }}
          source={{ uri: (data.origin && data.origin.avatar ? data.origin.avatar : imageUrl) }}
        />
      </TouchableOpacity>
      { /* this should render the post and the content within */}
      <View style={{
        flexDirection: 'column', alignSelf: 'flex-end', paddingLeft: 50, paddingTop: 20, position: 'relative',
      }}
      >
        <Text style={{ fontSize: 13, fontWeight: '700' }}>
          {' '}
          { data.origin ? `${data.origin.firstname || ''} ${data.origin.lastname || ''}` : 'John Phillips' }
          {' '}
        </Text>
        <Text style={{
          alignSelf: 'flex-end', fontSize: 10, position: 'absolute', top: 20, right: 13, color: '#D0D3D4', fontWeight: '600'
        }}
        >
          {' '}
          { data ? `${moment(new Date(data.createdAt)).fromNow()}` : '10 mins'}
        </Text>
        <Text style={{
          width: width * 0.7, fontSize: 12, marginTop: 10, marginBottom: 12, color: '#797D7F', fontWeight: '500'
        }}
        >
          {' '}
          { data.content ? `${data.content}` : `${mockText}`}
        </Text>
        { renderMedia(data, obj.navigator)}
      </View>
    </View>
    <ButtonStack data={data} user={obj.user} dispatch={obj.dispatch} navigator={obj.navigator} />
  </View>
);

const renderMedia = (data, navigator) => {
  if (data.media && data.media.length > 0) {
    const media = data.media.filter(item => item.constructor === Array);
    if (!media.length) return null;
    return (
      <MediaHandler data={data} navigator={navigator} />
    );
  }
  if (data.links && data.links.length > 0) {
    return <MediaHandler data={data} navigator={navigator} />;
  }
  return null;
};

/* Doing this might be very memory intensive as the content grows, if there are more
  scalable ways, would be welcome. TODO
*/
class ButtonStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: '#D0D3D4',
      comment: '#D0D3D4',
      share: '#D0D3D4',
      count: this.props.data.likes.count,
      data: this.props.data.likes.data 
};
  }


  componentDidMount = () => this.generateLike()

  handleLike = () => {
    // this assumes that the user is trying to like the post;
    // you're checking if the user already liked this post;
    if (!this.state.data.map(item => item.id).includes(this.props.user.id)) {
      // changing the colour and temporarily pushing him/her to state.
      this.setState({ like: '#E74C3C', count: (this.state.count + 1), data: [...this.state.data, this.props.user] });
      return this.props.dispatch(LikePost(this.props.data._id)(0));
    }
    // this is to unlike the target post
    // you remove him/her from the temporary list of users
    this.setState({ like: '#D0D3D4', count: (this.state.count - 1), data: this.state.data.filter(item => item.id !== this.props.user.id) });
    this.props.dispatch(LikePost(this.props.data._id)(1)); // unlike the mf with key 1;
  }

   generateLike = () => {
     if (this.state.data.map(item => item.id).includes(this.props.user.id)) return this.setState({ like: '#E74C3C' });
   };

  render = () => (
    <View style={styles.baseButtonStack}>
      <View style={styles.button}>
        <TouchableOpacity onPress={this.handleLike}>
          <EvilIcon name="like" color={this.state.like} size={23} />
        </TouchableOpacity>
        <Text style={{
          color: this.state.like, fontSize: 12, position: 'relative', bottom: -2
        }}
        >
          {' '}
          { `${this.state.count} ${this.state.count === 1 ? 'like' : 'likes'}`}
        </Text>
      </View>
      { /* comment for content */}
      <View style={styles.buttonLower}>
        <MaterialIcon name="comment-text-outline" color={this.state.comment} size={17} />
        <Text style={{ color: this.state.comment, fontSize: 12 }}>
          {' '}
4 Comments
        </Text>
      </View>
      { /* shares for the product */}
      <View style={styles.buttonLowerR}>
        <Ionicon name="ios-share-alt-outline" color={this.state.share} size={17} />
        <Text style={{ color: this.state.share, fontSize: 12 }}>
          {' '}
    6 Shares
        </Text>
      </View>
    </View>
  )
}

export const multiplePosts = iterator(SinglePost);
export default SinglePost;
