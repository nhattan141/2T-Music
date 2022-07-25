import db from '../models/index'
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },

                    // cho du lieu tra ve dang object
                    raw: true
                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'Password is correct'

                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = 'User is not found'
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your email isn't exist`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let handleSignup = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(data.emailSignup)
            if (!isExist) {
                let hashPasswordFromBcrypt = await hashUserPassword(data.passwordSignup);
                await db.User.create({
                    email: data.emailSignup,
                    password: hashPasswordFromBcrypt,
                    firstName: "2T",
                    lastName: "Music",
                    gender: true,
                    roleId: 0,
                    avatar: '',
                })

                userData.errCode = 0
                userData.errMessage = `Signup success`
            } else {
                userData.errCode = 3
                userData.errMessage = `Your email is exist`
            }

            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)

        } catch (e) {
            reject(e)
        }

    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(user)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleSignup: handleSignup,
}