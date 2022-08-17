import { request, response } from 'express'
import db from '../models/index'
import songService from '../services/songService'
var appRoot = require('app-root-path')

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
    if (!req.files) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing file"
        })
    }

    let img = req.files.img;
    let file = req.files.file;
    let info = req.body

    // reset file name 
    var file_img_name = new Date().getTime() + '_' + img.name
    var file_audio_name = new Date().getTime() + '_' + file.name
    let urlImg = `http://127.0.0.1:8887/images/${file_img_name}`
    let urlFile = `http://127.0.0.1:8887/audios/${file_audio_name}`
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    img.mv(appRoot + '/src/public/images/' + file_img_name);
    file.mv(appRoot + '/src/public/audios/' + file_audio_name);

    let songData = await songService.createNewSong(info, urlImg, urlFile)
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage,
        img: {
            name: img.name,
            mimetype: img.mimetype,
            size: img.size
        },
        file: {
            name: file.name,
            mimetype: file.mimetype,
            size: file.size
        },
        info,
        urlImg,
        urlFile
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
    let urlImg = ``
    let urlFile = ``
    if (!req.files || !req.files.img) {
        urlImg = req.body.img
    } else {
        let img = req.files.img;

        // reset file name 
        var file_img_name = new Date().getTime() + '_' + img.name
        urlImg = `http://127.0.0.1:8887/images/${file_img_name}`
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        img.mv(appRoot + '/src/public/images/' + file_img_name);
    }
    if (!req.files || !req.files.file) {
        urlFile = req.body.file
    } else {
        let file = req.files.file;

        // reset file name 
        var file_audio_name = new Date().getTime() + '_' + file.name
        urlFile = `http://127.0.0.1:8887/audios/${file_audio_name}`
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        file.mv(appRoot + '/src/public/audios/' + file_audio_name);
    }
    let info = req.body

    let songData = await songService.updateSong(info, urlImg, urlFile)
    if (songData.errCode !== 0) {
        return res.status(500).json({
            errCode: songData.errCode,
            message: songData.errMessage
        })
    } else {
        return res.status(200).json({
            errCode: songData.errCode,
            message: songData.errMessage,
            info,
            urlImg,
            urlFile
        })
    }
}

let handleGetRecentSongs = async (req, res) => {
    let songData = await songService.getRecentSongs()
    if (songData.errCode !== 0) {
        return res.status(500).json({
            errCode: songData.errCode,
            message: songData.errMessage,
        })
    }
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage,
        songs: songData.songs
    })
}

let handleGetTop3Songs = async (req, res) => {
    let songData = await songService.getTop3Songs()
    if (songData.errCode !== 0) {
        return res.status(500).json({
            errCode: songData.errCode,
            message: songData.errMessage,
        })
    }
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage,
        songs: songData.songs
    })
}

let handleGetNewReleaseSongs = async (req, res) => {
    let songData = await songService.getNewReleaseSongs()
    if (songData.errCode !== 0) {
        return res.status(500).json({
            errCode: songData.errCode,
            message: songData.errMessage
        })
    }
    return res.status(200).json({
        errCode: songData.errCode,
        message: songData.errMessage,
        songs: songData.songs
    })
}

module.exports = {
    handleGetAllSongs: handleGetAllSongs,
    handleCreateNewSong: handleCreateNewSong,
    handleDeleteSong: handleDeleteSong,
    handleUpdateSong: handleUpdateSong,
    handleGetRecentSongs: handleGetRecentSongs,
    handleGetTop3Songs: handleGetTop3Songs,
    handleGetNewReleaseSongs: handleGetNewReleaseSongs,
}
