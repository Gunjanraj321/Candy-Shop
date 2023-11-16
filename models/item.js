const { Sequelize , DataTypes } = require("sequelize");

const sequelize = require('../util/db')

const Item = sequelize.define('items', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true,
    },
    itemName :{
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type: DataTypes.STRING,
        allowNull: false
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull:false
    },
    quantity : {
        type : DataTypes.INTEGER,
        allowNull:false
    }
},
    {
        timestamps:false
    }    
)

module.exports = Item;