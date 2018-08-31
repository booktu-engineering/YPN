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

    default:
      return state;
  }
};
