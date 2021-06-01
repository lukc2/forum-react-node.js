module.exports=(sequelize,DataTypes)=>{
    const Rank=sequelize.define('rank',{
        name:{
            type: DataTypes.TEXT,
            allowNull:false,
            unique: true
        },
    },{
        tableName: 'rank',
        timestamps: true
    });
    return Rank;
};