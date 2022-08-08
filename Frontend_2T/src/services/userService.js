import axios from '../axios';

const handleLoginApi = (email, password) => {
    //call server nodejs
    return axios.post('/api/login', { email, password })
}

const handleSignupApi = (emailSignup, passwordSignup, confirm) => {
    return axios.post('/api/signup', { emailSignup, passwordSignup, confirm })
}



const handleGetAllSong = () => {
    return axios.get(`https://mp3.zing.vn/xhr/recommend?type=audio&id=ZW67OIA0`)
}


export {
    handleLoginApi,
    handleSignupApi,
    handleGetAllSong
}
