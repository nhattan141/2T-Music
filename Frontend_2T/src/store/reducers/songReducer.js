import actionTypes from '../actions/actionTypes';

const initialState = {
    recentSongs: [],
    newReleaseSongs: [],
    top3Songs: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RECENT_SONGS_SUCCESS:
            return {
                ...state,
                recentSongs: action.songs
            }
        case actionTypes.GET_RECENT_SONGS_FAIL:
            return {
                ...state,
                recentSongs: []
            }
        case actionTypes.GET_NEW_RELEASE_SONGS_SUCCESS:
            return {
                ...state,
                newReleaseSongs: action.songs
            }
        case actionTypes.GET_NEW_RELEASE_SONGS_FAIL:
            return {
                ...state,
                newReleaseSongs: []
            }
        case actionTypes.GET_TOP3_SONGS_SUCCESS:
            return {
                ...state,
                top3Songs: action.songs
            }
        case actionTypes.GET_TOP3_SONGS_FAIL:
            return {
                ...state,
                top3Songs: []
            }
        default:
            return state;
    }
}

export default appReducer;