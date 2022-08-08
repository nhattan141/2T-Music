import { request, response } from 'express'
import db from '../models/index'
import songService from '../services/songService'

let handleGetAllSongs = async (req, res) => {
    let songId = req.query.id
    if (!songId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing parameter Id'
        })
    }
    let songs = await songService.getAllSongs(songId)
    return res.status(200).json({
        errCode: 0,
        message: 'Get all songs successfully',
        songs
    })

}

let handleCreateNewSong = async (req, res) => {
    let song = req.body
    let songData = await songService.createNewSong(song)
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage,
    })
}

let handleDeleteSong = async (req, res) => {
    let songId = req.query.id
    if (!songId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing song id'
        })
    }
    let songData = await songService.deleteSong(songId)
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage
    })
}

let handleUpdateSong = async (req, res) => {
    let songData = await songService.updateSong(req.body)
    if (songData.errCode !== 0) {
        return res.status(500).json({
            errCode: songData.errCode,
            message: songData.errMessage
        })
    } else {
        return res.status(200).json({
            errCode: songData.errCode,
            message: songData.errMessage
        })
    }
}

module.exports = {
    handleGetAllSongs: handleGetAllSongs,
    handleCreateNewSong: handleCreateNewSong,
    handleDeleteSong: handleDeleteSong,
    handleUpdateSong: handleUpdateSong
}
