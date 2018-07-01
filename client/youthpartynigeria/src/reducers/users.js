export default (state={}, action) => {
  switch (action.type) {
    case 'USER_SIGNUP':
    return { ...state, current: action.payload}

    case 'USER_LOGGED_IN':
    return { ...state, current: action.payload}

    default:
    return state;
  }
}
