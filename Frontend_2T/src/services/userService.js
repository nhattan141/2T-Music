import axios from '../axios';

const handleLoginApi = (email, password) => {
    //call server nodejs
    return axios.post('/api/login', { email, password })
}

const handleSignupApi = (emailSignup, passwordSignup, confirm) => {
    return axios.post('/api/signup', { emailSignup, passwordSignup, confirm })
}

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

const handleGetAllSong = () => {
    return axios.get(`https://mp3.zing.vn/xhr/recommend?type=audio&id=ZW67OIA0`)
}


export {
    handleLoginApi,
    handleSignupApi,
    handleGetAllUsersApi,
    handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUser,
    handleGetAllSong
}
