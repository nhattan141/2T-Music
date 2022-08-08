import actionTypes from './actionTypes';
import { handleCreateNewUser, handleGetAllUsersApi, handleDeleteUser, handleUpdateUser } from '../../services/adminService'
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

export const addUserSuccess = (userInfo) => ({
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

const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
})