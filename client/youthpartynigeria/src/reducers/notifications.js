export default (state = { count: 0, notifications: [], unseenCount: 0 }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload, unseenCount: action.unSeenCount, lastSeen: action.lastSeenCount  };

    case 'CLEAR_NOTIFICATION_COUNT':
      return { ...state, unseenCount: 0 };

    case 'UPDATE_LAST_SEEN_COUNT': 
    return { ...state, lastSeen: action.payload }

    default: 
    return state;
  }
}
;