import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity
} from 'react-native';
import moment from 'moment';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { width, height } from '../../mixins';
import MediaHandler from './media';
import iterator from '../iterator';
import { fetchUserThunk } from '../../actions/thunks/user';
import { LikePost } from '../../actions/thunks/posts';

const imageUrl = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';


const mockText = 'It is now ndisputable that e people f Nigeria are united. I believe in an urgent restoration of active and particiatory democracy ';
const generateHeight = (obj) => {
  if(!obj.single && !obj.reference) return { maxHeight: height * 0.58 }
  if(obj.single) return { minHeight: 0.90, backgroundColor: '#ECF0F1' };
  return { maxHeight: height * 0.28, borderBottomWidth: 1, borderBottomColor: '#E5E7E9', backgroundColor: '#FDFEFE' } ;
}

const SinglePost = ({ data, obj }) => (
  <TouchableOpacity style={{ width, ...generateHeight(obj) }} onPress={() => { if(obj.single) return; obj.navigator.push({ screen: 'View.Post', title: `Post by ${data.origin.firstname}`, passProps: { target: data }})}}>
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
        { renderMedia(data, obj.navigator, obj)}
      </View>
    </View>
    { obj.reference ? null :
      <ButtonStack data={data} user={obj.user} dispatch={obj.dispatch} navigator={obj.navigator} />
    }
  </TouchableOpacity>
);

const renderMedia = (data, navigator, obj) => {
  if (obj.reference) return null; 
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
console.log(this.props.data)
  }

  componentDidMount = () => this.generateLike()

  handleLike = () => {
    if (!this.state.data.map(item => item.id).includes(this.props.user.id)) {
      this.setState({ like: '#F4D03F', count: (this.state.count + 1), data: [...this.state.data, this.props.user] });
      return this.props.dispatch(LikePost(this.props.data._id)(0));
    }
    this.setState({ like: '#D0D3D4', count: (this.state.count - 1), data: this.state.data.filter(item => item.id !== this.props.user.id) });
    this.props.dispatch(LikePost(this.props.data._id)(1));
  }

   generateLike = () => {
     if (this.state.data.map(item => item.id).includes(this.props.user.id)) return this.setState({ like: '#F4D03F' });
   };

   showNavigator = () => {
     this.props.navigator.showLightBox({
       screen: 'Reply.Post', 
       passProps: {
         target: this.props.data
       }
     })
   }

  render = () => (
    <View style={styles.baseButtonStack}>
      <View style={styles.button}>
        <TouchableOpacity style={{ height: 30, width: 25, }}onPress={this.handleLike}>
          <EvilIcon name="like" color={this.state.like} size={23} />
        </TouchableOpacity>
        <Text style={{
          color: this.state.like, fontSize: 12, position: 'relative', bottom: -2
        }}
        onPress={() => { this.state.data.length ? this.props.navigator.push({ screen: 'Show.Users', title: `Liked Post by ${this.props.data.origin.firstname}`, passProps: { data: this.state.data }}) : null }}
        >
          {' '}
          { `${this.state.count} ${this.state.count === 1 ? 'like' : 'likes'}`}
        </Text>
      </View>
      { /* comment for content */}
      <TouchableOpacity style={styles.buttonLower} onPress={this.showNavigator}>
        <View>
        <MaterialIcon name="comment-text-outline" color={this.state.comment} size={17} />
        </View>
        <Text style={{ color: this.state.comment, fontSize: 12 }}>
          {' '}
        { `${!this.props.data.commentCount ? 0 : this.props.data.commentCount } ${this.props.data.commentCount && this.props.data.commentCount === 1 ? 'comment' : 'comments' }`} 
        </Text>
      </TouchableOpacity>
      { /* shares for the product */}
      <View style={styles.buttonLowerR}>
        <Ionicon name="ios-share-alt-outline" color={this.state.share} size={17} />
        <Text style={{ color: this.state.share, fontSize: 12 }}>
          {' '}
         Shares
        </Text>
      </View>
    </View>
  )
}

export const multiplePosts = iterator(SinglePost);
export default SinglePost;
