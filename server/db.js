const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('datavis', 'postgres', 'hi', {
   
	host: 'localhost',
	port: '5432',
	dialect: 'postgres',
    logging: false

});

module.exports = {sequelize}
