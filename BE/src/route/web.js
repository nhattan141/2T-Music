import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import songController from '../controllers/songController'
import multer from 'multer'
import path from 'path'

var appRoot = require('app-root-path')
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/explore', homeController.getExplorePage)
    router.post('/upload-profile-pic', homeController.handleUploadFile)
    router.post('/upload', homeController.handleUpload)

    //router login/signup
    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.handleSignup)

    //router User
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.put('/api/update-user', userController.handleUpdateUser)

    //router Song
    router.get('/api/get-all-songs', songController.handleGetAllSongs)
    router.post('/api/create-new-song', songController.handleCreateNewSong)
    router.delete('/api/delete-song', songController.handleDeleteSong)
    router.put('/api/update-song', songController.handleUpdateSong)

    router.get('/api/get-recent-songs', songController.handleGetRecentSongs)
    router.get('/api/get-top3-songs', songController.handleGetTop3Songs)
    router.get('/api/get-new-release-songs', songController.handleGetNewReleaseSongs)

    //router favorite-songs
    router.put('/api/create-new-favorite-song', songController.handleCreateNewFavoriteSong)
    router.delete('/api/delete-favorite-song', songController.handleDeleteFavoriteSong)

    return app.use("/", router)
}

module.exports = initWebRoutes;