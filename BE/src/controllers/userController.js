import db from '../models/index'
import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleSignup = async (req, res) => {
    let email = req.body.emailSignup
    let password = req.body.passwordSignup
    let confirm = req.body.confirm

    if (!email || !password || !confirm) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input'
        })
    }
    if (password !== confirm) {
        return res.status(500).json({
            errCode: 2,
            message: 'Invalid confirm password'
        })
    }
    let userData = await userService.handleSignup(req.body)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup
}
