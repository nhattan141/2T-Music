import axios from '../axios';

const handleLoginApi = (email, password) => {
    //call server nodejs
    return axios.post('/api/login', { email, password })
}

const handleSignupApi = (emailSignup, passwordSignup, confirm) => {
    return axios.post('/api/signup', { emailSignup, passwordSignup, confirm })
}

const handleUpdateUserInfo = (form_data) => {
    // return axios.put(`/api/update-user`, data);
    return axios({
        method: "put",
        url: `/api/update-user`,
        data: form_data,
        headers: { "Content-Type": "multipart/form-data" },
    });
}

const handleGetAllSong = () => {
    return axios.get(`https://mp3.zing.vn/xhr/recommend?type=audio&id=ZW67OIA0`)
}


export {
    handleLoginApi,
    handleSignupApi,
    handleGetAllSong,
    handleUpdateUserInfo
}
