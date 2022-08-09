import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {

    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody)
    },


};

const handleGetAllUsersApi = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const handleCreateNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const handleDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
}

const handleUpdateUser = (data) => {
    return axios.put(`/api/update-user`, data);
}

const handleGetAllSongs = (id) => {
    return axios.get(`/api/get-all-songs?id=${id}`)
}

const handleCreateNewSong = (data) => {
    return axios.post(`/api/create-new-song`, data)
}

const handleDeleteSong = (songId) => {
    return axios.delete(`/api/delete-song?id=${songId}`);
}

const handleUpdateSong = (data) => {
    return axios.put(`/api/update-song`, data);
}

export {
    handleGetAllUsersApi,
    handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUser,
    handleGetAllSongs,
    handleCreateNewSong,
    handleDeleteSong,
    handleUpdateSong
}