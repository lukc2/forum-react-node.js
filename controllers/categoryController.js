const db = require('../config/database');
const { Op } = require("sequelize");

module.exports = {

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
    }

}
