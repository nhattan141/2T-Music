import db from '../models/index'
import { raw } from 'body-parser';
import multer from 'multer'
import path from 'path'

let getAllSongs = (songId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songs = '12312312312'
            if (songId === "All") {
                songs = await db.Song.findAll()
            } else {
                songs = await db.Song.findOne({
                    where: { id: songId }
                })
            }
            resolve(songs)
        } catch (e) {
            reject(e)
        }
    })
}

let checkSongName = (songName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Song.findOne({
                where: { SongName: songName },
            })
            if (songName) {
                resolve(song)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createNewSong = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let isExist = await checkSongName(data.songName)
            if (!isExist) {
                await db.Song.create({
                    songName: data.songName,
                    singer: data.singer,
                    lyrics: data.lyrics,
                    img: data.img,
                    file: data.file,
                    isRecent: data.isRecent,
                    isTop3: data.isTop3,
                    isNewRelease: data.isNewRelease,
                })
                songData.errCode = 0
                songData.errMessage = 'Create new song successfully'
            } else {
                songData.errCode = 1
                songData.errMessage = 'Song is already existed'
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteSong = (songId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}

            let song = await db.Song.findOne({
                where: { id: songId }
            })

            if (song) {
                await db.Song.destroy({
                    where: { id: songId }
                })

                songData.errCode = 0
                songData.errMessage = "Delete song successfully"
            } else {
                songData.errCode = 2
                songData.errMessage = "This song is not existed"
            }

            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let updateSong = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            if (!data.id) {
                songData.errCode = 1
                songData.errMessage = "Missing song id"
            }

            let song = await db.Song.findOne({
                where: { id: data.id },
                raw: false
            })

            if (song) {
                song.songName = data.songName
                song.singer = data.singer
                song.lyrics = data.lyrics
                if (data.img) {
                    song.img = data.img
                }
                if (data.file) {
                    song.file = data.file
                }
                song.isRecent = data.isRecent
                song.isTop3 = data.isTop3
                song.isNewRelease = data.isNewRelease

                await song.save()

                songData.errCode = 0
                songData.errMessage = 'Update song successfully'
            } else {
                songData.errCode = 2
                songData.errMessage = 'This song is not existed'
            }

            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllSongs: getAllSongs,
    createNewSong: createNewSong,
    deleteSong: deleteSong,
    updateSong: updateSong,
}