module.exports=(sequelize,DataTypes)=>{
    const Category=sequelize.define('category',{
        name:{
            type: DataTypes.TEXT,
            allowNull:false,
            unique: true
        },
    },{
        tableName: 'category',
        timestamps: true
    });
    return Category;
};