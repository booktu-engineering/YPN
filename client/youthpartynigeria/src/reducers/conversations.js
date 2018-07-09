/* eslint no-case-declarations: 0 */
export default (state = {}, action) => {
  switch (action.type) {
    case 'ALL_CONVERSATIONS_RECEIVED':
      return { ...state, logs: action.payload };

    // create a message registry that all the messages can push to.
    case 'CREATE_REGISTRY':
      return { ...state, registry: action.payload };

    case 'UPDATE_REGISTRY':
      console.log(action.payload);
      return { ...state, registry: action.payload };

    case 'CONVERSATION_RECEIVED':
      const obj = {};
      obj[`${action.payload._id}`] = action.payload.messages;
      return { ...state, registry: { ...state.registry, ...obj } };

    default:
      return state;
  }
};
