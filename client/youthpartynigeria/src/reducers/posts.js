export default (state = {}, action) => {
  switch (action.type) {
    case 'TIMELINE_GOTTEN':
      return { ...state, timeline: action.payload };

    default:
      return state;
  }
}
