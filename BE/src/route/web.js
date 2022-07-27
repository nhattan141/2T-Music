import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
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


    return app.use("/", router)
}

module.exports = initWebRoutes;