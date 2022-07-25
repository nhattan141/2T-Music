import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/explore', homeController.getExplorePage)

    router.post('/api/login', userController.handleLogin)
    router.post('/api/signup', userController.handleSignup)

    return app.use("/", router)
}

module.exports = initWebRoutes;