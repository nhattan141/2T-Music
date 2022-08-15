import { request, response } from 'express'
import db from '../models/index'
import userService from '../services/userService'
import path from 'path'
var appRoot = require('app-root-path')

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
    let userData = await userService.handleUserSignup(req.body)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
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

    if (!req.files) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing file"
        })
    }

    //Use the name of the input field (i.e. "avatar") 
    //to retrieve the uploaded file
    let avatar = req.files.avatar;
    let info = req.body
    var file_name = new Date().getTime() + '_' + avatar.name
    let urlAvatar = `http://127.0.0.1:8887/images/${file_name}`
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    avatar.mv(appRoot + '/src/public/images/' + file_name);

    let userData = await userService.handleCreateNewUser(info, urlAvatar);
    //send response

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        data: {
            name: avatar.name,
            mimetype: avatar.mimetype,
            size: avatar.size
        },
        info,
        urlAvatar
    })

}

let handleDeleteUser = async (req, res) => {
    let userId = req.query.id
    if (!userId) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing id",
        })
    }

    let userData = await userService.handleDeleteUser(userId)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage
    })
}

let handleUpdateUser = async (req, res) => {
    let urlAvatar = ''
    if (!req.files) {
        urlAvatar = req.body.avatar
    } else {

        //Use the name of the input field (i.e. "avatar") 
        //to retrieve the uploaded file
        let avatar = req.files.avatar;
        var file_name = new Date().getTime() + '_' + avatar.name
        urlAvatar = `http://127.0.0.1:8887/images/${file_name}`
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        avatar.mv(appRoot + '/src/public/images/' + file_name);
    }
    let info = req.body


    let userData = await userService.handleUpdateUser(info, urlAvatar)
    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            message: userData.errMessage
        })
    } else {
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            info,
            urlAvatar
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser
}
