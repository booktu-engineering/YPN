export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGN_UP':
      return { ...state, current: action.payload };

    case 'USER_LOGGED_IN':
      console.log(action.payload)
      return { ...state, current: action.payload };

    case 'FETCHED_USER':
      return { ...state, target: action.payload };

    case 'INSERT_TOKEN':
      return { ...state, token: action.payload };

    case 'FETCHED_ALL_RELATIONSHIPS':
      return { ...state, followers: action.payload.followers, friends: action.payload.friends };
    default:
      return state;
  }
};
