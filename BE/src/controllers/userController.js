import { request, response } from 'express'
import db from '../models/index'
import userService from '../services/userService'
import multer from 'multer'

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

const upload = multer().single('avatar');

let handleCreateNewUser = async (req, res) => {
    let avatar = req.file
    let urlAvatar = `http://127.0.0.1:8887/images/${avatar.filename}`
    let data = req.body
    console.log(avatar)
    let userData = await userService.handleCreateNewUser(data, urlAvatar)
    console.log(req.file)
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        // res.send(`You have uploaded this image: <hr/>
        // <img src="http://127.0.0.1:8887/images/${req.file.filename}" width="500" />
        // <hr /><a href="./">Upload another image</a>`);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            // data,
            // avatar,
            // urlAvatar
        })
    });

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
    let userData = await userService.handleUpdateUser(req.body)
    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            message: userData.errMessage
        })
    } else {
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage
        })
    }
}

let handleUploadFile = async (req, res) => {
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
    });
}
module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser
}
