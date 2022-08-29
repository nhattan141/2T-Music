import actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import {
    handleUpdateUserInfo
} from '../../services/userService'

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const userSignupSuccess = (userInfo) => ({
    type: actionTypes.USER_SIGNUP_SUCCESS,
    userInfo: userInfo
});
export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
});

export const updateUserInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUpdateUserInfo(data)
            if (res && res.errCode === 0) {
                dispatch(updateUserInfoSuccess())
                toast.success('Update user successfully')
            } else {
                dispatch(updateUserInfoFail())
                toast.error('Update user failed')
            }
        } catch (e) {
            console.log(e);
            dispatch(updateUserInfoFail())
            toast.error('Update user failed')
        }
    }
}

export const updateUserInfoSuccess = () => ({
    type: actionTypes.UPDATE_USER_INFO_SUCCESS
})

export const updateUserInfoFail = () => ({
    type: actionTypes.UPDATE_USER_INFO_FAIL
})