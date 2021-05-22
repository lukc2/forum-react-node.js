const bcrypt = require('bcrypt');
const db = require('../config/database');
const { validationResult } = require('express-validator');


module.exports = {
    //http://localhost:3000/api/login POST
    login: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                success: false,
                errors: errors
            }).end();
            return;
        }
        let body = req.body;
        const exists = await db.User.findOne({ where: { login: body.login } });
        if (exists === null) {
            res.json({
                success: false,
                errors: [{
                    value: body.login,
                    param: "login",
                    msg: "Nie istnieje taki użytkownk"
                }]
            }).end();
            return;
        }
        if(exists.deleted == 1){
            res.json({
                success: false,
                errors: [{
                    value: body.login,
                    param: "login",
                    msg: "Użytkownik usunięty!"
                }]
            }).end();
            return;
        }
        let User = await db.User.findOne(
            {
                where: {
                    login: body.login
                }
            }).catch(err=>{
                res.json({
                    success:false,
                    errors:err
                }).end();
                return;
            });
        if (bcrypt.compareSync(body.password, User.password)) {
            req.session.isLoggedIn=true;
            req.session.userId = User.id;
            res.json({
                success: true,
                userId: req.session.userId,
                nickname: User.nickname,
                rank: User.rank_id,
                msg: "Pomyślnie zalogowano użytkownika",
                //nie jestem pewien jak to bedzie wygladac z przodu i jaka sciezke wpisac, poki co wpisze symbolicznie
                redirectTo: "/"
            }).end();
    
        } else {
            res.json({
                success: false,
                errors: [{
                    param: "password",
                    msg: "Nie poprawne hasło"
                }]
            }).end();
        }
    }
}