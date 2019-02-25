export default (state = { flags: [] }, action) => {
  switch (action.type) {
    case 'TIMELINE_GOTTEN':
      return { ...state, timeline: action.payload };

    case 'TARGET_POSTS_GOTTEN':
      return { ...state, target: action.payload };

    case 'FLAGGED_CONTENT':
      return { ...state, flags: [...state.flags, action.payload]};

    default:
      return state;
  }
};
