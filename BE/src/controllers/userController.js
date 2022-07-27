import { response } from 'express'
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

let handleGetAllUsers = async (req, res) => {
    let userId = req.query.id //All/id
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing required parameter"
        })
    }
    let users = await userService.handleGetAllUsers(userId)
    return res.status(200).json({
        errCode: 0,
        message: "Ok",
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let gender = req.body.gender
    let roleId = req.body.roleId
    let avatar = req.body.avatar

    if (
        !email || !password ||
        !firstName || !lastName ||
        !gender || !roleId || !avatar
    ) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input"
        })
    }

    let userData = await userService.handleCreateNewUser(req.body)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
    })
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing id",
        })
    }

    let userData = await userService.handleDeleteUser(req.body)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage
    })
}

let handleUpdateUser = async (req, res) => {
    let userData = await userService.handleUpdateUser(req.body)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser
}
