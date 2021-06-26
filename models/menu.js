var Sequelize = require('sequelize')
var db = require('../database')

var menu = db.define("Menus", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    restaurantId: {
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    pictureLink: Sequelize.STRING
})



module.exports = menu;