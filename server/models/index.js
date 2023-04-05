const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Item = sequelize.define("items", {
  title: {
      type:Sequelize.STRING,
      allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  category:{
    type:Sequelize.STRING,
    allowNull:false
  },
  quantity:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  image:{
    type:Sequelize.STRING,
    allowNull:false
  }

});

module.exports = {
	db: sequelize,
	Item
};
