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

export {
    handleLoginApi,
    handleSignupApi,
    handleGetAllUsersApi
}
