const mysql = require("mysql2");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('products','root','12345678',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize ;