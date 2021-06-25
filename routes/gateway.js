//Load required elements
const router = require('express').Router()
const express = require('express')
const axios = require('axios');

//Use json parser
router.use(express.json());

//Load token controller
const {verifTokenController} = require('../controllers/tokenController')

const pathaccount = "http://localhost:4000/api"
const pathauth = "http://localhost:3000/api"
const pathboard = ""

//User routes
//Login user OK
router.post('/login', async function(req, res){
    try {resultats = await axios.post(pathauth+'/auth/login', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Logout user OK
router.post('/logout', async function(req, res){
    try {resultats = await axios.post(pathauth+'/auth/logout', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Check accesstoken OK
router.post('/accesstoken', async function(req, res){
    try {resultats = await axios.post(pathauth+'/auth/accesstoken', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Register user OK
router.post('/user', async function(req, res){ 
    try {resultats = await axios.post(pathaccount+'/account/user', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Modify user OK
router.put('/user', async function(req, res){
    try {resultats = await axios.put(pathaccount+'/account/user', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user ICI
router.delete('/user/:id', async function(req, res){ 
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/user/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Info user ICI
router.get('/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/user/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Restaurant routes
//Create restaurant OK
router.post('/restaurant', async function(req, res){
    try {resultats = await axios.post(pathaccount+'/account/restaurant', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update restaurant OK
router.put('/restaurant', async function(req, res){
    try {resultats = await axios.put(pathaccount+'/account/restaurant', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete restaurant ICI
router.delete('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/restaurant/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos restaurant ICI
router.get('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/restaurant/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Deliveryman routes
//Create deliveryman OK
router.post('/deliveryman', async function(req, res){
    try {resultats = await axios.post(pathaccount+'/account/deliveryman', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update deliveryman OK
router.put('/deliveryman', async function(req, res){
    try {resultats = await axios.put(pathaccount+'/account/deliveryman', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete deliveryman ICI
router.delete('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/deliveryman/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos deliveryman ICI
router.get('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/deliveryman/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Dev routes
//Create dev OK
router.post('/dev', async function(req, res){
    try {resultats = await axios.post(pathaccount+'/account/dev', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Update dev OK
router.put('/dev', async function(req, res){
    try {resultats = await axios.put(pathaccount+'/account/dev', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete dev ICI
router.delete('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbdev = await Dev.findOne({ where: {id: req.params.id} });
    if (dbdev.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathaccount+'/account/dev/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos dev ICI
router.get('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbdev = await Dev.findOne({ where: {id: req.params.id} });
    if (dbdev.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathaccount+'/account/dev/'+req.params.id); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.get('/restaurantboard/:restaurantId', async function(req, res){
    // const accesstoken = req.headers['authorization'];
    // const userid = await verifTokenController(accesstoken)
    // const dbdev = await Board.findOne({ where: {userid: userid} });
    // if (dbdev.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.get(pathboard+'/board/restaurantboard/'+req.params.restaurantId); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/menu', async function(req, res){
    try {resultats = await axios.post(pathboard+'/board/menu', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.put('/menu', async function(req, res){
    try {resultats = await axios.put(pathboard+'/board/menu', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.delete('/menu/:menuId', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbmenu = await Menu.findOne({ where: {id: req.params.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.restaurantId} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathboard+'/board/menu/'+req.params.menuId); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/article', async function(req, res){
    try {resultats = await axios.post(pathboard+'/board/article', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.put('/article', async function(req, res){
    try {resultats = await axios.put(pathboard+'/board/article', req.body); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.delete('/article/:articleId', async function(req, res){
    const accesstoken = req.headers['authorization'];
    const userid = await verifTokenController(accesstoken)
    const dbarticle = await Article.findOne({ where: {id: req.params.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.restaurantId} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    try {resultats = await axios.delete(pathboard+'/board/article/'+req.params.articleId); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});




module.exports = router;