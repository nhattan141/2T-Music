import actionTypes from './actionTypes';
import {
    handleGetRecentSongs,
    handleGetNewReleaseSongs,
    handleGetTop3Songs,
    handleAddFavoriteSong,
    handleGetFavoriteSongOfUser
} from '../../services/songService'
import { ToastContainer, toast } from 'react-toastify';

export const getRecentSongs = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetRecentSongs()
            if (res && res.errCode === 0) {
                dispatch(getRecentSongsSuccess(res.songs))
            } else {
                dispatch(getRecentSongsFail())
            }
            // console.log('recentSongs: ', res.songs);
        } catch (e) {
            dispatch(getRecentSongsFail())
            console.log(e);
        }
    }
}

export const getRecentSongsSuccess = (data) => ({
    type: actionTypes.GET_RECENT_SONGS_SUCCESS,
    songs: data
})

export const getRecentSongsFail = () => ({
    type: actionTypes.GET_RECENT_SONGS_FAIL
})

export const getNewReleaseSongs = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetNewReleaseSongs()
            if (res && res.errCode === 0) {
                dispatch(getNewReleaseSongsSuccess(res.songs))
            } else {
                dispatch(getNewReleaseSongsFail())
            }
        } catch (e) {
            dispatch(getNewReleaseSongsFail())
            console.log(e);
        }
    }
}

export const getNewReleaseSongsSuccess = (data) => ({
    type: actionTypes.GET_NEW_RELEASE_SONGS_SUCCESS,
    songs: data
})

export const getNewReleaseSongsFail = () => ({
    type: actionTypes.GET_NEW_RELEASE_SONGS_FAIL
})

export const getTop3Songs = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetTop3Songs()
            if (res && res.errCode === 0) {
                dispatch(getTop3SongsSuccess(res.songs))
            } else {
                dispatch(getTop3SongsFail())
            }
        } catch (e) {
            dispatch(getTop3SongsFail())
            console.log(e);
        }
    }
}

export const getTop3SongsSuccess = (data) => ({
    type: actionTypes.GET_TOP3_SONGS_SUCCESS,
    songs: data
})

export const getTop3SongsFail = () => ({
    type: actionTypes.GET_TOP3_SONGS_FAIL
})

export const getSongToPlay = (song) => {
    return async (dispatch, getState) => {
        try {
            dispatch(getSongToPlaySuccess(song))
        } catch (e) {
            console.log(e);
            dispatch(getSongToPlayFail())
        }
    }
}

export const getSongToPlaySuccess = (song) => ({
    type: actionTypes.GET_PLAY_SONGS_SUCCESS,
    song: song
})

export const getSongToPlayFail = () => ({
    type: actionTypes.GET_PLAY_SONGS_FAIL
})

export const addFavoriteSong = (songId, userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleAddFavoriteSong(songId, userId)
            if (res && res.errCode === 0) {
                dispatch(addFavoriteSongSuccess())
                toast.success('Add Favorite Song Success')
            } else {
                dispatch(addFavoriteSongFail())
                toast.error('Add Favorite Song Fail')
            }
        } catch (e) {
            console.log(e);
            dispatch(addFavoriteSongFail())
        }
    }
}

export const addFavoriteSongSuccess = () => ({
    type: actionTypes.ADD_FAVORITE_SONGS_SUCCESS,
})

export const addFavoriteSongFail = () => ({
    type: actionTypes.ADD_FAVORITE_SONGS_FAIL
})

export const getFavoriteSongOfUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetFavoriteSongOfUser(userId)
            if (res && res.errCode === 0) {
                dispatch(getFavoriteSongOfUserSuccess(res.favoriteSongs))
            } else {
                dispatch(getFavoriteSongOfUserFail())
            }
        } catch (e) {
            console.log(e);
            dispatch(getFavoriteSongOfUserFail())
        }
    }
}

export const getFavoriteSongOfUserSuccess = (favoriteSongs) => ({
    type: actionTypes.GET_FAVORITE_SONGS_SUCCESS,
    favoriteSongs: favoriteSongs,
})

export const getFavoriteSongOfUserFail = () => ({
    type: actionTypes.GET_FAVORITE_SONGS_FAIL
})