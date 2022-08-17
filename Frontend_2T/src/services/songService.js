import axios from '../axios';
import * as queryString from 'query-string';

const handleGetRecentSongs = () => {
    return axios.get(`/api/get-recent-songs`)
}

const handleGetNewReleaseSongs = () => {
    return axios.get(`/api/get-new-release-songs`)
}

const handleGetTop3Songs = () => {
    return axios.get(`/api/get-top3-songs`)
}

export {
    handleGetRecentSongs,
    handleGetNewReleaseSongs,
    handleGetTop3Songs
}