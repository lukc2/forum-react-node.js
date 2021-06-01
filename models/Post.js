module.exports=module.exports=(sequelize,DataTypes)=>{
    const Post=sequelize.define('post',{
        thread_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        reputation:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
		voted:{
            type: DataTypes.TEXT//DataTypes.ARRAY(DataTypes.TEXT),
        },
		attachement:{
            type: DataTypes.TEXT,
        },
    },{
        tableName: 'post',
        timestamps:true
    });
    return Post;
};