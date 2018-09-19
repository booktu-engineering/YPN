export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGN_UP':
      return { ...state, current: action.payload };

    case 'USER_LOGGED_IN':
      return { ...state, current: action.payload };

    case 'FETCHED_USER':
      return { ...state, target: action.payload };

    case 'INSERT_TOKEN':
      return { ...state, token: action.payload };

    case 'FETCHED_ALL_RELATIONSHIPS':
      return { 
        ...state, 
        followers: action.payload.followers, 
        friends: action.payload.friends, 
        friendsIDs: action.payload.friends.length ? action.payload.friends.filter(user => user).map(item => item.id) : [],
        followersIDs: action.payload.followers.length ? action.payload.followers.filter(user => user).map(item => item.id) : []
      };
    default:
      return state;
  }
};
