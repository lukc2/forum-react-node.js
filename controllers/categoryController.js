const db = require('../config/database');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

module.exports = {


    //http://localhost:3000/api/forum/:categoryId GET
    viewCategory: function (req, res) {
        const category_id = req.params.categoryId;
        db.Category.findAll({
            include: [{
                model: db.Thread,
                attributes: ["id","name","updatedAt"],
                include: [{
                    model: db.User,
                    attributes: ["nickname"]
                }]
            }],
            where: {
                id: category_id
            },
            order: [[db.Thread, "updatedAt", 'DESC']]
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            })
        })
    },
    //http://localhost:3000/api/forum/:categoryId/:threadId GET
    viewThread: function (req, res) {
        let category_id = req.params.categoryId;
        let thread_id = req.params.threadId;

        db.Thread.findAll({
            include: [
                {
                    model: db.Post,
                    include: {
                        model: db.User,
                        attributes: ['nickname']
                    }
                }],
            where: {
                [Op.and]: [
                    {id: thread_id},
                    {category_id : category_id}
                ]
            },
            order: [[db.Post, "id", 'ASC']]

        }).then(data => res.json(data))
            .catch(err => {
                res.json({
                    success: false,
                    errors: err
                })
            });
    },

    //http://localhost:3000/api/forum/:categoryId/addThread POST
    addThread: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                success: false,
                errors: errors
            }).end();
            return;
        }
        let body = req.body;
        let catId = req.params.categoryId;
        
        
        db.Thread.create({
            name: body.title,
            user_id: req.session.userId,
            category_id: catId
        }).then(thread => {
            db.Post.create({
                thread_id: thread.id,
                user_id: req.session.userId,
                content: body.content
            }).then(post => {
                res.json({
                    success: true,
                    thread_id: thread.id,
                    post_id: post.id,
                    msg: "Pomyślnie dodano wątek"
                })
            }).catch(err => {
                res.json({
                    success: false,
                    errors: err,
                    msg: "Nie udało się dodać wątku"
                })
                return;
            });
        }).catch(err => {
            res.json({
                success: false,
                errors: err,
                msg: "Nie udało się dodać wątku"
            })
        });
    },
    //http://localhost:3000/api/forum/:categoryId/:threadId POST
    addPost: async (req, res) => {
        let content = req.body.content;
        let ThrId = req.params.threadId;
        const post = await db.Post.create({
            thread_id: ThrId,
            user_id: req.session.userId,
            content: content
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            }).end();
            return;
        });
        db.Thread.update(
            // to jest bardzo dziwne ale działa najlepiej, wymuszamy zmianę updatedAt przez podmianę id na to samo
            // sypie to errora ale działa jak należy, nie wiem co myśleć
            { id: post.thread_id}, 
            {
                where: {
                    id: post.thread_id
                }
            }).then(() => {
                res.json({
                    success: true,
                    id: thread.id,
                    msg: "Utworzono post"
                });
            }).catch(err => {
                res.json({
                    success: false,
                    errors: err,
                    msg:"Nie udalo sie 2"
                    
                }).end();
            });

    }


}
