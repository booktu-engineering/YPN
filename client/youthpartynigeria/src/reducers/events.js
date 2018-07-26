export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_EVENTS_GOTTEN':
      return { ...state, all: action.payload };

    case 'SPECIFIC_EVENT_GOTTEN':
      return { ...state, target: action.payload };

    default:
      return state;
  }
};
