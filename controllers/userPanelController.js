const db = require('../config/database');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
    //http://localhost:3000/api/userpanel GET
    getUserPanel : async (req, res) => {
        let user = req.session.userId;

        let postCount = await db.Post.count(
            {where: {'user_id': user}}
        )
        let reputationCount = await db.Post.sum(
            'reputation',
            {where: {'user_id': user}}
        )
        db.User.findOne(
            {where: {'id': user}}
        ).then(data => {res.json({
            success: true,
            nickname: data.nickname,
            avatar: data.avatar,
            email: data.email,
            footer: data.footer,
            reputationCount: reputationCount,
            joinDate: data.createdAt, 
            postCount: postCount
        })})


    },
    //http://localhost:3000/api/userpanel POST
    updateUserData : async (req, res) => {
        let userId = req.session.userId
        let nick = req.body.nickname
        let email = req.body.email
        let date = req.body.date

        let msgNick = ""
        let msgDate = ""
        let msgEmail = ""

        if(nick != null && nick != ''){
            await db.User.update(
                {nickname: nick},
                {where: {id: userId}}
            ).then(()=>
                {msgNick = "Pomyślnie zaktualizowano nick. "}
            ).catch(err => {
                res.json({
                    success: false,
                    errors: err,
                    msg:"Błąd aktualizacji nicku"
                }).end();
            })   
        }
        if(email != null && email != ''){
            await db.User.update(
                {email: email},
                {where: {id: userId}}
            ).then(()=>
                {msgEmail = "Pomyślnie zaktualizowano email. "}
            ).catch(err => {
                res.json({
                    success: false,
                    errors: err,
                    msg:"Błąd aktualizacji email"
                }).end();
            }) 
        }
        if(date != null && date != ''){
            date = Date.parse(date+' GMT-0200')
            await db.User.update(
                {date_of_birth: date},
                {where: {id: userId}}
            ).then(()=>
                {msgDate = "Pomyślnie zaktualizowano date urodzenia. "}
            ).catch(err => {
                res.json({
                    success: false,
                    errors: err,
                    msg:"Błąd aktualizacji daty urodzenia!"
                }).end();
            }) 
        }
        res.json({
            success: true,
            msg: msgNick+msgDate+msgEmail
        }).end()


        
    },
    //http://localhost:3000/api/userpanel PUT
    updatePassword : async (req, res) => {
        const errorsArray = validationResult(req);
        if (!errorsArray.isEmpty()) {
            res.json({
                success: false,
                errors: errorsArray
            }).end();
            return;
        }

        let userId = req.session.userId

        const salt = bcrypt.genSaltSync(8);
        const pass = bcrypt.hashSync(req.body.password, salt);

        db.User.update(
            {password: pass},
            {where: {id: userId}}, 
        ).then(() => {
                res.json({
                    success: true,
                    msg: "Zmieniono hasło!"
                });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udało zmienić hasła!"
                    
            }).end();
        });

    },
    //http://localhost:3000/api/userpanel PATCH
    updateFooter : async (req, res) => {
        let userId = req.session.userId
        const footer = req.body.footer

        db.User.update(
            {footer: footer},
            {where: {id: userId}}, 
        ).then(() => {
                res.json({
                    success: true,
                    msg: "Ustawiono stopke!"
                });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udało ustawic stopki!"
                    
            }).end();
        });
    },
    //http://localhost:3000/api/userpanel/avatar POST
    updateAvatar : async (req, res) => {
        let userId = req.session.userId
        const avatar = req.body.avatar

        db.User.update(
            {avatar: avatar},
            {where: {id: userId}}, 
        ).then(() => {
                res.json({
                    success: true,
                    msg: "Ustawiono awatar!"
                });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udało ustawic awatara!"
                    
            }).end();
        });
    },
    //http://localhost:3000/api/userpanel DELETE
    deleteUser : async (req, res) => {
        let userId = req.session.userId

        db.User.update(
            {deleted: 1},
            {where: {id: userId}}, 
        ).then(() => {
                res.json({
                    success: true,
                    msg: "Usunięto użytkownika!"
                });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udało się usunąć użytkownika"
                    
            }).end();
        });

    }
}