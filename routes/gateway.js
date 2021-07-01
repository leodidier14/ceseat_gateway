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
const {verifTokenDevController} = require('../controllers/tokenDevController')
const {generateTokenApp} = require('../controllers/tokenAppController');
const { token } = require('morgan');
const apiinf = require('../models/apiinfo')



var serverList = {}

async function  setServerList() {

    var serverTemp = await apiinf.find().exec()

    serverTemp.forEach( (server) => {
        serviceName = ''
        if(server.path != null){
            if(serverList[server.name] == null ){
                serverList[server.name] = []
            } 
            if(!serverList[server.name].includes(serviceName)){
                try { axios.get('http://localhost:' + server.port + server.path+'available',  {headers: {'tokenapp': `${generateTokenApp()}`}}).then(
                    res => {
                        serviceName = 'http://localhost:' + server.port + server.path
                        if(res.data){
                            if(!serverList[server.name].includes(serviceName)){
                            serverList[server.name].push(serviceName)
                            }
                        } else {
                            apiinf.deleteOne({port:server.port}).exec()
                        }
                    }
                );
                } catch(error) {
                    apiinf.deleteOne({port:server.port}).exec()
                }
            }
        }
    })
}
setServerList()


//Road from App
router.delete('/app/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.delete(path+'app/user/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.get('/app/user', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.get(path+'app/user', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.put('/app/user', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.put(path+'app/user', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});


//Auth API
//Login user
router.post('/login', async function(req, res){
    tokenapp = generateTokenApp()
    try {
        path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
        resultats = await axios.post(path+'login', req.body, {headers: {'tokenapp': `${tokenapp}`}}).catch(err => res.status(400).send(err)); 
        
        path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
        role = await axios.get(path+'getrole/'+resultats.data.userId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${resultats.data.token}`}}).catch(err => res.status(400).send(err));     
        let result = {
            userId:resultats.data.userId,
            token:resultats.data.token,
            role:role.data
        }
        res.status(200).send(result);
    }
    catch (error) {res.status(400).send(error);}
});
//Logout user
router.post('/logout', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
    try {resultats = await axios.post(path+'logout', req.body, {headers: {'tokenapp': `${tokenapp}` , 'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
        
        catch (error) {console.log(error); res.status(400).send("error");}
});
//refresh serverList
router.get('/refresh', async function(req, res){
    setServerList()
});
//Check accesstoken
router.post('/accesstoken', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
    try {resultats = await axios.post(path+'accesstoken', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});

router.post('/dev-login', async function(req, res){
    tokenapp = generateTokenApp()
    path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
    try {resultats = await axios.post(path+'dev/login', req.body, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Logout user
router.post('/dev-logout', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
    try {resultats = await axios.post(path+'dev/logout', req.body, {headers: {'tokenapp': `${tokenapp}` , 'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Check accesstoken
router.post('/dev-accesstoken', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-auth'][Math.floor(Math.random() * serverList['ceseat-auth'].length)]
    try {resultats = await axios.post(path+'dev/accesstoken', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});





//Account API

//Register user
router.post('/user', async function(req, res){
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.post(path+'user', req.body, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Modify user
router.put('/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.put(path+'user/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.delete('/user/:id', async function(req, res){ 
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    // if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.delete(path+'user/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Info user
router.get('/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.get(path+'user/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create restaurant
router.post('/restaurant', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats =
         await axios.post(path+'restaurant', req.body, 
                            {headers: 
                                {'tokenapp': `${tokenapp}` ,
                                'Authorization': `${accesstoken[1]}`}
                                });
    res.status(200).send(resultats.data)}
    catch (error) {res.status(400).send(error);} 
});
//Update restaurant
router.put('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.put(path+'restaurant/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});
//Delete restaurant
router.delete('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.delete(path+'restaurant/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos restaurant
router.get('/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.get(path+'restaurant/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create deliveryman
router.post('/deliveryman', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.post(path+'deliveryman', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {  res.status(400).send("error");} 
});
//Update deliveryman
router.put('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.put(path+'deliveryman/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); 
    res.status(200).send(resultats.data);}
    catch (error) { res.status(400).send("error");} 
});
//Delete deliveryman
router.delete('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.delete(path+'deliveryman/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos deliveryman
router.get('/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.get(path+'deliveryman/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/dev', async function(req, res){ 
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.post(path+'dev', req.body, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Modify user
router.put('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.put(path+'dev/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.delete('/dev/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenDevController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.delete(path+'dev/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.get('/dev/:id', async function(req, res){ 
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenDevController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-account'][Math.floor(Math.random() * serverList['ceseat-account'].length)]
    try {resultats = await axios.get(path+'dev/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});





//Board API
router.get('/restaurants', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.get(path +'restaurants', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});


//OK
router.get('/restaurantboard/:restaurantId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.get(path+'restaurantboard/'+req.params.restaurantId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.post('/menu', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    const restaurantid = dbrestaurant.dataValues.id;
    if(dbrestaurant.id != restaurantid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    req.body.restaurantId =  dbrestaurant.dataValues.id
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.post(path+'menu', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/menu/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbmenu = await Menu.findOne({ where: {id: req.body.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.dataValues.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.put(path+'menu/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/menu/:menuId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbmenu = await Menu.findOne({ where: {id: req.params.menuId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.delete(path+'menu/'+req.params.menuId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.post('/article', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    const restaurantid = req.body.restaurantId;
    req.body.restaurantId =  dbrestaurant.dataValues.id
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.post(path+'article', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/article/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.body.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.dataValues.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.put(path+'article/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/article/:articleId', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.params.articleId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.dataValues.restaurantId} });
    if(dbrestaurant.dataValues.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    path = serverList['ceseat-card'][Math.floor(Math.random() * serverList['ceseat-card'].length)]
    try {resultats = await axios.delete(path+'article/'+req.params.articleId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/order', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    req.body.userId = userid
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.post(path+'order', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/order/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.get(path+'user/' + userid, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.delete('/order/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    // check si c'est sa commande
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.delete(path+'user/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/order/restaurant/currentorder/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.get(path+'restaurant/current/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});
router.get('/order/restaurant/ordershistory/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.get(path+'restaurant/history/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});
router.delete('/order/restaurant/ordershistory/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.delete(path+'restaurant/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/order/deliveryman/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.get(path+'deliveryman/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

//Order API


//OK à tester

router.put('/order/statement/validate/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.id} });
    /*if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");*/
    tokenapp = generateTokenApp()
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.put(path+'statement/validate/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); 
    res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");
    } 
});

//OK à tester
router.put('/order/statement/update/:id', async function(req, res){
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.id} });
        /*if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");*/
    tokenapp = generateTokenApp()
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.put(path+'statement/update/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/delivered/:id', async function(req, res){
    try {
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.id} });
        tokenapp = generateTokenApp()
    path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
    try {resultats = await axios.put(path+'statement/delivered/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
    } catch (error) {
        res.status(400).send("Une erreur à été rencontrée !");
    }
});


router.put('/orders/statement/deliverymanaccept/:id', async function(req, res){
    try {
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        console.log(userid)
        const dbdeliveryman = await Deliveryman.findOne({ where: {userId: userid} });
        req.body.deliverymanId = dbdeliveryman.dataValues.id
        tokenapp = generateTokenApp()
        path = serverList['ceseat-commands'][Math.floor(Math.random() * serverList['ceseat-commands'].length)]
        resultats = await axios.put(path+'statement/deliveryman/validate/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);
    } catch (error) {

        res.status(400).send("Une erreur à été rencontrée !");
    }
    
    
});


router.get('/stats/components/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-statistics'][Math.floor(Math.random() * serverList['ceseat-statistics'].length)]
    try {resultats = await axios.get(path+'components/stats/', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/stats/restaurant/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-statistics'][Math.floor(Math.random() * serverList['ceseat-statistics'].length)]
    try {resultats = await axios.get(path+'restaurant/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/devTools/logs/connexion/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.get(path+'logs/connection/', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.get('/devTools/logs/components/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.get(path+'logs/components/', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});
router.post('/devTools/logs/components/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenDevController(accesstoken[1])
    req.body.userId = userid
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.post(path+'logs/components/',req.body, {headers: {'tokenapp': `${generateTokenApp()}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});


router.get('/devTools/components/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.get(path+'components/', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.post('/devTools/components/', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.post(path+'components/',req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

router.delete('/devTools/components/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    path = serverList['ceseat-devtools'][Math.floor(Math.random() * serverList['ceseat-devtools'].length)]
    try {resultats = await axios.delete(path+'components/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        res.status(400).send("error");} 
});

module.exports = router;