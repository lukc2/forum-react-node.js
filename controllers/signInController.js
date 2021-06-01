const bcrypt = require('bcrypt');
const db = require('../config/database');
const { validationResult } = require('express-validator');

module.exports = {

    //http://localhost:3000/api/signin/ POST
    register: async (req, res) => {
        const errorsArray = validationResult(req);
        if (!errorsArray.isEmpty()) {
            res.json({
                success: false,
                errors: errorsArray
            }).end();
            return;
        }
        let body = req.body;
        const name = await db.User.findOne(
            {
                where: { nickname: body.name }
            }).catch(err => {
                res.json({
                    success: false,
                    errors: err
                });
                return;
            });
        if (name !== null) {
            res.json({
                success: false,
                errors: [{
                    value: body.name,
                    param: "name",
                    msg: "Nazwa zajeta"
                }]
            }).end();
            return;
        }
        const email = await db.User.findOne({
            where: { email: body.email }
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            })
            return;
        });;
        if (email !== null) {
            res.json({
                success: false,
                errors: [{
                    value: body.email,
                    param: "email",
                    msg: "Email zajęty"
                }]
            }).end();
            return;
        }
        const login = await db.User.findOne({
            where: { login: body.login }
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            })
            return;
        });;
        if (login !== null) {
            res.json({
                success: false,
                errors: [{
                    value: body.login,
                    param: "login",
                    msg: "Login zajęty"
                }]
            }).end();
            return;
        }
        const salt = bcrypt.genSaltSync(8);
        const pwd = bcrypt.hashSync(body.password, salt);
        db.User.create({
            nickname: body.name,
            login: body.login,
            password: pwd,
            rank_id: 3,
            email: body.email
        }).then(User => {
            res.json({
                success: true,
                id: User.id,
                msg: "Pomyślnie dodano użytkownika",
                //nie jestem pewien jak to bedzie wygladac z przodu i jaka sciezke wpisac, poki co wpisze symbolicznie
                redirectTo: "/login" 
            });
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            })
        });
    }
}