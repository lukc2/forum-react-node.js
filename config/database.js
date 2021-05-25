const Sequelize = require('sequelize');

require("dotenv").config();
const sequelize = new Sequelize(process.env.DATABASE_URL+'?sslmode=require');
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../models/User")(sequelize, Sequelize);
db.Thread = require("../models/Thread")(sequelize, Sequelize);
db.Post = require("../models/Post")(sequelize, Sequelize);
db.Category = require("../models/Category")(sequelize, Sequelize);
db.Rank = require("../models/Rank")(sequelize, Sequelize);

//RELACJE tabel

//thread-category
db.Thread.belongsTo(db.Category, {
    foreignKey: 'category_id',
    allowNull: false
});
db.Category.hasMany(db.Thread, {
    foreignKey: 'category_id',
    allowNull: false
});
//post-thread
db.Post.belongsTo(db.Thread, {
    foreignKey: 'thread_id',
    allowNull: false
});
db.Thread.hasMany(db.Post, {
    foreignKey: 'thread_id',
    allowNull: false
});
//post-user
db.Post.belongsTo(db.User, {
    foreignKey: 'user_id',
    allowNull: false
});
db.User.hasMany(db.Post, {
    foreignKey: 'user_id',
    allowNull: false
});
//thread-user
db.Thread.belongsTo(db.User, {
    foreignKey: 'user_id',
    allowNull: false
});
db.User.hasMany(db.Thread, {
    foreignKey: 'user_id',
    allowNull: false
});
//rank-user
db.User.belongsTo(db.Rank, {
    foreignKey: 'rank_id',
    allowNull: false
});
db.Rank.hasMany(db.User, {
    foreignKey: 'rank_id',
    allowNull: false
});

db.Rank.sync()
    .then(db.Category.sync()
    .then(()=>db.User.sync()
    .then(()=>db.Thread.sync()
    .then(()=>db.Post.sync()
    ))));


;



module.exports = db;