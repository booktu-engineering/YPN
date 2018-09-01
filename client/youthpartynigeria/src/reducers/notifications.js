export default (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload, unseenCount: action.unSeenCount, lastSeen: action.lastSeenCount  };

    case 'CLEAR_NOTIFICATIONS_COUNT':
      return { ...state, unSeenCount: 0 };

    case 'UPDATE_LAST_SEEN_COUNT': 
    return { ...state, lastSeen: action.payload }
  }
}
;