const bcrypt = require('bcryptjs');
module.exports = {
    register: async (req,res)=>{
        const db = req.app.get('db');
        const {username, password} = req.body;
        const [result] = await db.user.find_user_by_username(username)
        if(result){
            return res.status(409).send('Username taken.')
        }
        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(password, salt);
        const [user] = await db.user.create_user([username, hash, `https://robohash.org/${username}.png` ])
        req.session.user = {
            username: user.username,
            password: user.password,
            profilePic: user.profile_pic
        }
        return res.status(201).send(req.session.user)
    },

    login: async(req,res)=>{
        const db = req.app.get('db');
    }
}