import db from '../models/index'
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


module.exports = {
    getHomePage: getHomePage,
    getExplorePage: getExplorePage
}