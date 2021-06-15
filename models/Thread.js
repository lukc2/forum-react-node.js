  module.exports=module.exports=(sequelize,DataTypes)=>{
    const Thread=sequelize.define('thread',{
        category_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type: DataTypes.TEXT,
            allowNull:false,
            unique: true
        },
		closed:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false,
        },
		reputation:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
		voted:{
            type: DataTypes.TEXT,//DataTypes.ARRAY(DataTypes.TEXT),
            defaultValue: "0"
        },
    },{
        tableName: 'thread',
        timestamps: true
    });
    return Thread;
};