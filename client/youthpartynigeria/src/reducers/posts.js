export default (state = {}, action) => {
  switch (action.type) {
    case 'TIMELINE_GOTTEN':
      return { ...state, timeline: action.payload };

    case 'TARGET_POSTS_GOTTEN':
      return { ...state, target: action.payload };
    default:
      return state;
  }
};
