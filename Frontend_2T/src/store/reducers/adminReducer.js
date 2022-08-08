import actionTypes from '../actions/actionTypes';

const initialState = {
    users: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.users
            }
        case actionTypes.GET_ALL_USER_FAIL:
            return {
                ...state,
                users: ''
            }
        default:
            return state;
    }
}

export default appReducer;