export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_DONATIONS_RECEIVED':
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
