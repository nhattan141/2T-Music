import axios from '../axios';

const handleLoginApi = (email, password) => {
    //call server nodejs
    return axios.post('/api/login', { email, password })
}

const handleSignupApi = (emailSignup, passwordSignup, confirm) => {
    return axios.post('/api/signup', { emailSignup, passwordSignup, confirm })
}

export {
    handleLoginApi,
    handleSignupApi
}
