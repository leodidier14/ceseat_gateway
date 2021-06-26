//Load required elements
const router = require('express').Router()
const express = require('express')
const axios = require('axios');

//Load table models
const User = require('../models/user')
const Deliveryman = require('../models/deliveryman')
const Restaurant = require('../models/restaurant')
const Menu = require('../models/menu')
const Dev = require('../models/dev')
const Article = require('../models/article')
const Order = require('../models/orders')

//Use json parser
router.use(express.json());

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

const pathaccount = "http://localhost:4000/api"   //Account API
const pathauth = "http://localhost:3000/api"   //Auth API
const pathboard = ""   //Board API
const pathorder = ""   //Order API

//Auth API
//Login user
router.post('/login', async function(req, res){
    try {resultats = await axios.post(pathauth+'/auth/login', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Logout user
router.post('/logout', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.post(pathauth+'/auth/logout', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Check accesstoken
router.post('/accesstoken', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.post(pathauth+'/auth/accesstoken', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});





//Account API
//Register user
router.post('/user', async function(req, res){ 
    try {resultats = await axios.post(pathaccount+'/account/user', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Modify user
router.put('/user', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.put(pathaccount+'/account/user', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.delete('/user/:id', async function(req, res){ 
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/user/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Info user 
router.get('/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/user/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create restaurant
router.post('/restaurant', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.post(pathaccount+'/account/restaurant', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update restaurant
router.put('/restaurant', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.put(pathaccount+'/account/restaurant', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete restaurant
router.delete('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/restaurant/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos restaurant
router.get('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/restaurant/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create deliveryman
router.post('/deliveryman', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.post(pathaccount+'/account/deliveryman', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update deliveryman
router.put('/deliveryman', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.put(pathaccount+'/account/deliveryman', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete deliveryman
router.delete('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/deliveryman/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos deliveryman
router.get('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    console.log(dbdeliveryman)
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/deliveryman/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create dev
router.post('/dev', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.post(pathaccount+'/account/dev', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update dev
router.put('/dev', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    try {resultats = await axios.put(pathaccount+'/account/dev', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete dev
router.delete('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdev = await Dev.findOne({ where: {id: req.params.id} });
    if (dbdev.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/dev/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos dev
router.get('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdev = await Dev.findOne({ where: {id: req.params.id} });
    if (dbdev.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/dev/'+req.params.id, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});





//Board API
//OK
router.get('/restaurantboard/:restaurantId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");

    try {resultats = await axios.get(pathboard+'/board/restaurantboard/'+req.params.restaurantId, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.post('/menu', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    const restaurantid = req.body.restaurantId;
    if(dbrestaurant.id != restaurantid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.post(pathboard+'/board/menu', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/menu', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbmenu = await Menu.findOne({ where: {id: req.body.menuId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathboard+'/board/menu', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/menu/:menuId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbmenu = await Menu.findOne({ where: {id: req.params.menuId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathboard+'/board/menu/'+req.params.menuId, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.post('/article', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    const restaurantid = req.body.restaurantId;
    if(dbrestaurant.id != restaurantid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.post(pathboard+'/board/article', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/article', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.body.articleId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathboard+'/board/article', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/article/:articleId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.params.articleId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathboard+'/board/article/'+req.params.articleId, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});






//Order API
//OK à tester
router.put('/orders/statement/validate', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");


    try {resultats = await axios.put(pathorder+'/orders/statement/validate/', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/denied', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathorder+'/orders/statement/denied/', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/startingRealization', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathorder+'/orders/statement/startingRealization/', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/waitingdelivery', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathorder+'/orders/statement/waitingdelivery/', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/indelivery', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathorder+'/orders/statement/indelivery', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/delivered', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.orderId} });
    if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.put(pathorder+'/orders/statement/delivered', req.body, {headers: {'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});


module.exports = router;