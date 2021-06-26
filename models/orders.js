var Sequelize = require('sequelize')
var db = require('../database')

var Order = db.define("Orders",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    restaurantId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    deliveryManId:{
        type: Sequelize.INTEGER,
        foreignkey: true,
    },
    orderDate : Sequelize.DATE,
    delivredDate : Sequelize.DATE,
    requireDate : Sequelize.DATE,
    status : Sequelize.ENUM('pendingValidation','pendingRealization','realization','pendingDelivery','delivery','delivered'),
    comment : Sequelize.STRING,
})

module.exports = Order;