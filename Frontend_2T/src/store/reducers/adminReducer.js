import actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    songs: []
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
        case actionTypes.GET_ALL_SONG_SUCCESS:
            return {
                ...state,
                songs: action.songs
            }
        case actionTypes.GET_ALL_SONG_FAIL:
            return {
                ...state,
                songs: ''
            }
        default:
            return state;
    }
}

export default appReducer;