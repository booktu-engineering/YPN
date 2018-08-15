export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_POSITIONS_GOTTEN':
      return { ...state, all: action.payload };

    case 'ALL_CANDIDATES_GOTTEN':
      return { ...state, candidates: action.payload };

    case 'SPONSORED_CANDIDATES_GOTTEN':
        console.log(action.payload)
      return { ...state, sponsored: action.payload };

    case 'ALL_EXCOS_GOTTEN':
      return { ...state, excos: action.payload };

    case 'ASPIRANTS_GOTTEN':
      return { ...state, aspirants: action.payload };

    default:
      return state;
  }
};
