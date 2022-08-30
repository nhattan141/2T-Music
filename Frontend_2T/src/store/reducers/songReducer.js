import actionTypes from '../actions/actionTypes';
import poster1 from '../../assets/images/poster_1.jpg'
import song1 from '../../assets/audios/song_1.mp3'

const initialState = {
    recentSongs: [],
    newReleaseSongs: [],
    top3Songs: [],
    songPlay: {},
    favoriteSongs: []
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
        case actionTypes.GET_PLAY_SONGS_SUCCESS:
            return {
                ...state,
                songPlay: action.song
            }
        case actionTypes.GET_PLAY_SONGS_FAIL:
            return {
                ...state,
                songPlay: {}
            }
        case actionTypes.GET_FAVORITE_SONGS_SUCCESS:
            return {
                ...state,
                favoriteSongs: action.favoriteSongs
            }
        case actionTypes.GET_FAVORITE_SONGS_FAIL:
            return {
                ...state,
                favoriteSongs: []
            }
        default:
            return state;
    }
}

export default appReducer;