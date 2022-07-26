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

let createNewSong = (data, urlImg, urlFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let isExist = await checkSongName(data.songName)
            if (!isExist) {
                await db.Song.create({
                    songName: data.songName,
                    singer: data.singer,
                    lyrics: data.lyrics,
                    img: urlImg,
                    file: urlFile,
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

let updateSong = (data, urlImg, urlFile) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            if (data.id) {

                let song = await db.Song.findOne({
                    where: { id: data.id },
                    raw: false
                })

                if (song) {
                    song.songName = data.songName
                    song.singer = data.singer
                    song.lyrics = data.lyrics
                    if (urlImg) {
                        song.img = urlImg
                    }
                    if (urlFile) {
                        song.file = urlFile
                    }
                    song.isRecent = data.isRecent
                    song.isTop3 = data.isTop3
                    song.isNewRelease = data.isNewRelease

                    await song.save()

                    songData.errCode = 0
                    songData.errMessage = 'Update song successfully'
                } else {
                    songData.errCode = 1
                    songData.errMessage = 'This song is not existed'
                }
            } else {
                songData.errCode = 2
                songData.errMessage = 'Mising song id'
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let getRecentSongs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let songs = await db.Song.findAll({
                where: { isRecent: '1' },
                limit: 6,
                raw: true
            })

            if (songs) {
                songData.errCode = 0
                songData.errMessage = 'Get recent songs successfully'
                songData.songs = songs
            } else {
                songData.errCode = 1
                songData.errMessage = 'Get recent song fail'
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let getTop3Songs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let songs = await db.Song.findAll({
                where: { isTop3: '1' },
                limit: 3,
                raw: true
            })

            if (songs) {
                songData.errCode = 0
                songData.errMessage = 'Get top 3 songs successfully'
                songData.songs = songs
            } else {
                songData.errCode = 1
                songData.errMessage = 'Get top 3 song fail'
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let getNewReleaseSongs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let songs = await db.Song.findAll({
                where: { isNewRelease: '1' },
                limit: 6,
                raw: true
            })

            if (songs) {
                songData.errCode = 0
                songData.errMessage = 'Get new release songs successfully'
                songData.songs = songs
            } else {
                songData.errCode = 1
                songData.errMessage = 'Get new release songs fail'
            }

            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let getFavoriteSongOfUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            // let songs = await db.Song.findAll({
            //     // where: { userID: userId },
            //     include: [
            //         {
            //             // model: db.User,
            //             association: 'songs',
            //         }
            //     ],
            //     // through: {
            //     //     // model: db.Favorite,
            //     //     attributes: ["userID", "songID"],
            //     //     where: {
            //     //         userID: userId
            //     //     }
            //     // }
            //     //     }
            //     // ]
            // })
            let songs = await db.sequelize.query(
                `select f.id, f.userID, f.songID, 
                s.songName, s.singer, s.lyrics, s.lyrics, s.img, s.file 
                from favorites f 
                inner join songs s on f.songID = s.id 
                where f.userID = ${userId};`
            )
            if (songs) {
                songData.errCode = 0
                songData.errMessage = "Get Favorite Song Of User Successfully"
                songData.favoriteSongs = songs[0]
            } else {
                songData.errCode = 1
                songData.errMessage = "Can't find Favorite Song Of this User"
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewFavoriteSong = (songId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            if (!songId || !userId) {
                songData.errCode = 1
                songData.errMessage = 'Missing songid or userid'
            } else {
                let favorite = await db.Favorite.findOne({
                    where: {
                        userID: userId,
                        songID: songId,
                    }
                })
                if (favorite) {
                    songData.errCode = 2
                    songData.errMessage = 'This favorite song is already exist'
                } else {
                    await db.Favorite.create({
                        userID: userId,
                        songID: songId,
                    })
                    songData.errCode = 0
                    songData.errMessage = 'Create new song successfully'
                    songData.userID = userId
                    songData.songID = songId
                }
            }
            resolve(songData)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFavoriteSong = (favoriteId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let songData = {}
            let favorite = await db.Favorite.findOne({
                where: { id: favoriteId }
            })

            if (favorite) {
                await db.Favorite.destroy({
                    where: { id: favoriteId }
                })

                songData.errCode = 0
                songData.errMessage = "Delete Favorite Song Successfully"
            } else {
                songData.errCode = 1
                songData.errMessage = "This Favorite Song is not existed"
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
    getRecentSongs: getRecentSongs,
    getTop3Songs: getTop3Songs,
    getNewReleaseSongs: getNewReleaseSongs,
    getFavoriteSongOfUser: getFavoriteSongOfUser,
    createNewFavoriteSong: createNewFavoriteSong,
    deleteFavoriteSong: deleteFavoriteSong,
}