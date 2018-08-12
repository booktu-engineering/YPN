export default (state={}, action) => {
    if(action.type === 'ALL_CAREERS_GOTTEN') return {...state, all: action.payload }
    return state;
}