import actionTypes from './actionTypes';
import {
    handleCreateNewUser, handleGetAllUsersApi,
    handleDeleteUser, handleUpdateUser,
    handleGetAllSongs, handleCreateNewSong,
    handleDeleteSong, handleUpdateSong
} from '../../services/adminService'
import { ToastContainer, toast } from 'react-toastify';

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await handleCreateNewUser(data)
            if (res && res.errCode === 0) {
                dispatch(addUserSuccess())
                dispatch(getAllUser())
                toast.success('Create new user successfully')
            } else {
                dispatch(addUserFail())
                toast.error('Create user failed')
            }
        } catch (e) {
            dispatch(addUserFail())
            console.log('createNewUser error: ' + e.message);
            toast.error('Create user failed')
        }
    }
}

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const addUserFail = () => ({
    type: actionTypes.ADD_USER_FAIL
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteUser(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(getAllUser())
                toast.success('Delete user successfully')
            } else {
                dispatch(deleteUserFail())
                toast.error('Delete user failed')
            }
        } catch (e) {
            toast.error('Delete user failed')
            dispatch(deleteUserFail())
            console.log(e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const getAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllUsersApi('All')
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(getAllUserFail())
            }
        } catch (e) {
            dispatch(getAllUserFail())
            console.log(e);
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    users: data
})

export const getAllUserFail = () => ({
    type: actionTypes.GET_ALL_USER_FAIL
})

export const updateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUpdateUser(data)
            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess())
                dispatch(getAllUser())
                toast.success('Update user successfully')
            } else {
                dispatch(updateUserFail())
                toast.error('Update user failed')
            }
        } catch (e) {
            console.log(e);
            dispatch(updateUserFail())
            toast.error('Update user failed')
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
})

export const getAllSongs = () => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllSongs('All')
            if (res && res.errCode === 0) {
                dispatch(getAllSongsSuccess(res.songs.reverse()))
            } else {
                dispatch(getAllSongsFail())
            }
        } catch (e) {
            dispatch(getAllSongsFail())
            console.log(e);
        }
    }
}

export const getAllSongsSuccess = (data) => ({
    type: actionTypes.GET_ALL_SONG_SUCCESS,
    songs: data
})

export const getAllSongsFail = () => ({
    type: actionTypes.GET_ALL_SONG_FAIL
})

export const createNewSong = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateNewSong(data)
            if (res && res.errCode == 0) {
                dispatch(createNewSongSuccess())
                dispatch(getAllSongs())
                toast.success('Create new song success')
            } else {
                dispatch(createNewSongFail())
                toast.error('Create new song failed')
            }
        } catch (e) {
            console.log(e);
            dispatch(createNewSongFail())
        }
    }
}

export const createNewSongSuccess = () => ({
    type: actionTypes.ADD_SONG_SUCCESS,
})

export const createNewSongFail = () => ({
    type: actionTypes.ADD_SONG_FAIL
})

export const deleteSong = (songId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteSong(songId)
            if (res && res.errCode == 0) {
                dispatch(deleteSongSuccess())
                dispatch(getAllSongs())
                toast.success('Delete song successfully')
            } else {
                dispatch(deleteSongFail())
                toast.error('Delete song failed')
            }
        } catch (e) {
            dispatch(deleteSongFail())
            console.log(e);
        }
    }
}

export const deleteSongSuccess = () => ({
    type: actionTypes.DELETE_SONG_SUCCESS,
})

export const deleteSongFail = () => ({
    type: actionTypes.DELETE_SONG_FAIL
})

export const updateSong = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUpdateSong(data)
            if (res && res.errCode === 0) {
                dispatch(updateSongSuccess())
                dispatch(getAllSongs())
                toast.success('Update song successfully')
            } else {
                dispatch(updateSongFail())
                toast.error('Update song failed')
            }
        } catch (e) {
            console.log(e);
            dispatch(updateSongFail())
        }
    }
}

export const updateSongSuccess = () => ({
    type: actionTypes.UPDATE_SONG_SUCCESS,
})

export const updateSongFail = () => ({
    type: actionTypes.UPDATE_SONG_FAIL,
})