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

const handleCreateNewUser = (form_data) => {
    // return axios.post(`/api/create-new-user`, data);
    return axios({
        method: "post",
        url: `/api/create-new-user`,
        data: form_data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

const handleDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
}

const handleUpdateUser = (form_data) => {
    // return axios.put(`/api/update-user`, data);
    return axios({
        method: "put",
        url: `/api/update-user`,
        data: form_data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

const handleGetAllSongs = (id) => {
    return axios.get(`/api/get-all-songs?id=${id}`)
}

const handleCreateNewSong = (form_data) => {
    // return axios.post(`/api/create-new-song`, data)
    return axios({
        method: "post",
        url: `/api/create-new-song`,
        data: form_data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

const handleDeleteSong = (songId) => {
    return axios.delete(`/api/delete-song?id=${songId}`);
}

const handleUpdateSong = (form_data) => {
    // return axios.put(`/api/update-song`, data);
    return axios({
        method: "put",
        url: `/api/update-song`,
        data: form_data,
        headers: { "Content-Type": "multipart/form-data" },
    });
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