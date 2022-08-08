import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import songController from '../controllers/songController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/explore', homeController.getExplorePage)

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


    return app.use("/", router)
}

module.exports = initWebRoutes;