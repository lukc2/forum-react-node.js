module.exports = module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        nickname: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "test",
            unique: true
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
		footer: {
            type: DataTypes.TEXT,
        },
		date_of_birth:{
            type: DataTypes.DATE,
        },
		avatar: {
            type: DataTypes.TEXT,
        },
        rank_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    }, {
        tableName: 'user',
        timestamps: true
    });

    return User;
};