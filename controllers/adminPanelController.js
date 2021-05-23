const db = require('../config/database');


module.exports = {
    //http://localhost:3000/api/adminpanel GET
    listUsers : async (req, res) => {
        req.session.userId = 1;
        const user = await db.User.findByPk(req.session.userId);
        if(user.rank_id != 1)//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
        {
            res.json({
                success: false,
                msg: "Nie masz uprawnien do korzystania z panelu administratora!"
            }).end();
            return; 
        }

        db.User.findAll().then(data => {
            res.json(data);
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            }).end();
        })


    },
    //http://localhost:3000/api/adminpanel PUT
    makeMod : async (req, res) => {
        req.session.userId = 1;
        const user = await db.User.findByPk(req.session.userId);
        const updatedUser = req.body.updatedId

        if(user.rank_id != 1)//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
        {
            res.json({
                success: false,
                msg: "Nie masz uprawnien do korzystania z panelu administratora!"
            }).end();
            return; 
        }

        db.User.update(
            {rank_id: 2},
            {where: {id: updatedUser}} 
        ).then(() => {
            res.json({
                success: true,
                msg: "Uzytkownik zostal moderatorem!"
            });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udalo sie uczynic uzytkownika moderatorem!"         
            })
        });


        
    },
    //http://localhost:3000/api/adminpanel DELETE
    banUser : async (req, res) => {
        req.session.userId = 1;
        const user = await db.User.findByPk(req.session.userId);
        const updatedUser = req.body.updatedId

        if(user.rank_id != 1)//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
        {
            res.json({
                success: false,
                msg: "Nie masz uprawnien do korzystania z panelu administratora!"
            }).end();
            return; 
        }

        db.User.update(
            {deleted: 1},
            {where: {id: updatedUser}}, 
        ).then(() => {
                res.json({
                    success: true,
                    msg: "Zabanowano użytkownika!"
                });
        }).catch(err => {
             res.json({
                success: false,
                errors: err,
                msg:"Nie udało się zbanować użytkownika"
                    
            }).end();
        });

    },
    //http://localhost:3000/api/adminpanel POST
    addCategory : async (req, res) => {
        req.session.userId = 1;
        const user = await db.User.findByPk(req.session.userId);
        const categoryName = req.body.categoryName

        if(user.rank_id != 1)//tutaj zależy od tego jak jest w bazie, można ustalić że 1 to admin a 2 to mod
        {
            res.json({
                success: false,
                msg: "Nie masz uprawnien do korzystania z panelu administratora!"
            }).end();
            return; 
        }
       
        db.Category.create({
            name: categoryName
        }).then(() => {
            res.json({
                success: true,
                msg: "Pomyślnie utworzono kategorie!",
            });
        }).catch(err => {
            res.json({
                success: false,
                errors: err
            })
        });
    }
}