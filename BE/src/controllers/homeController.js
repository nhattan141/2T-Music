import db from '../models/index'
import multer from 'multer'
import path from 'path'
var appRoot = require('app-root-path')
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (err) {
        console.log(err);
    }
}


let getExplorePage = (req, res) => {
    return res.render('explore.ejs')
}

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

let handleUploadFile = async (req, res) => {

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
    console.log(req.file);
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
        res.send(`You have uploaded this image: <hr/>
        <img src="http://127.0.0.1:8887/images/${req.file.filename}" width="500" />
        <hr /><a href="./">Upload another image</a>`);
    });
}


module.exports = {
    getHomePage: getHomePage,
    getExplorePage: getExplorePage,
    handleUploadFile: handleUploadFile
}