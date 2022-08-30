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

const handleAddFavoriteSong = (songId, userId) => {
    return axios.put(`/api/create-new-favorite-song?songId=${songId}&userId=${userId}`)
}

const handleGetFavoriteSongOfUser = (userId) => {
    return axios.get(`/api/get-favorite-song-of-user?userId=${userId}`)

}

export {
    handleGetRecentSongs,
    handleGetNewReleaseSongs,
    handleGetTop3Songs,
    handleAddFavoriteSong,
    handleGetFavoriteSongOfUser
}