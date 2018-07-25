export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_QUESTIONS_RECEIVED':
      return { ...state, all: action.payload };

    case 'TARGET_ELECTION_SET':
      return { ...state, target: action.payload };

    default:
      return state;
  }
};
