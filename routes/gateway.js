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

const pathauth = "http://localhost:3001/api"   //Auth API
const pathaccount = "http://localhost:3002/api"   //Account API
const pathorder = "http://localhost:3003/api"   //Order API
const pathboard = "http://localhost:3004/api"   //Board API

//Auth API
//Login user
router.post('/login', async function(req, res){
    tokenapp = generateTokenApp()
    try {
        resultats = await axios.post(pathauth+'/auth/login', req.body, {headers: {'tokenapp': `${tokenapp}`}}); 
        try {
            role = await axios.get(pathaccount+'/account/getrole/'+resultats.data.userId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${resultats.data.token}`}});
            let result = {
                userId:resultats.data.userId,
                token:resultats.data.token,
                role:role.data
            }
            console.log(result)
        res.status(200).send(result);
        } catch (error) {console.log(error)}
    }
    catch (error) {res.status(400).send(error);}
});
//Logout user
router.post('/logout', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathauth+'/auth/logout', req.body, {headers: {'tokenapp': `${tokenapp}` , 'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {console.log(error); res.status(400).send("error");}
});
//Check accesstoken
router.post('/accesstoken', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathauth+'/auth/accesstoken', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});

router.post('/dev-login', async function(req, res){
    console.log('/dev-login')
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathauth+'/auth/dev/login', req.body, {headers: {'tokenapp': `${tokenapp}`}}); console.log(resultats) ;res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Logout user
router.post('/dev-logout', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathauth+'/auth/dev/logout', req.body, {headers: {'tokenapp': `${tokenapp}` , 'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});
//Check accesstoken
router.post('/dev-accesstoken', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathauth+'/auth/dev/accesstoken', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");}
});





//Account API

//Register user
router.post('/user', async function(req, res){
    console.log('/user post') 
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathaccount+'/account/user', req.body, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Modify user
router.put('/user/:id', async function(req, res){
    console.log('/user put');
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathaccount+'/account/user/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.delete('/user/:id', async function(req, res){ 
    console.log('/user delete') 
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathaccount+'/account/user/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Info user
router.get('/user/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathaccount+'/account/user/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create restaurant
router.post('/restaurant', async function(req, res){
    console.log('/restaurant post') 
    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    try {resultats =
         await axios.post(pathaccount+'/account/restaurant', req.body, 
                            {headers: 
                                {'tokenapp': `${tokenapp}` ,
                                'Authorization': `${accesstoken[1]}`}
                                });
    res.status(200).send(resultats.data)}
    catch (error) {console.log(error);} 
});
//Update restaurant
router.put('/restaurant/:id', async function(req, res){
    console.log('/restaurant put') 

    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathaccount+'/account/restaurant/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {console.log(error)
        res.status(400).send("error");} 
});
//Delete restaurant
router.delete('/restaurant/:id', async function(req, res){
    console.log('/restaurant delete') 

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathaccount+'/account/restaurant/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos restaurant
router.get('/restaurant/:id', async function(req, res){
    console.log('/restaurant get') 

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {id: req.params.id} });
    if (dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathaccount+'/account/restaurant/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Create deliveryman
router.post('/deliveryman', async function(req, res){
    console.log('/deliveryman post') 
    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathaccount+'/account/deliveryman', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) { console.log(error); res.status(400).send("error");} 
});
//Update deliveryman
router.put('/deliveryman/:id', async function(req, res){
    console.log('/deliveryman put')
    const accesstoken = req.headers['authorization'].split(" ");

    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathaccount+'/account/deliveryman/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); 
    console.log(resultats)
    res.status(200).send(resultats.data);}
    catch (error) {console.log(error); res.status(400).send("error");} 
});
//Delete deliveryman
router.delete('/deliveryman/:id', async function(req, res){
    console.log('/deliveryman delete')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathaccount+'/account/deliveryman/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Infos deliveryman
router.get('/deliveryman/:id', async function(req, res){
    console.log('/deliveryman get')

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbdeliveryman = await Deliveryman.findOne({ where: {id: req.params.id} });
    console.log(dbdeliveryman)
    if (dbdeliveryman.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathaccount+'/account/deliveryman/'+req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/dev', async function(req, res){ 
    console.log('/dev post')

    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathaccount+'/account/dev', req.body, {headers: {'tokenapp': `${tokenapp}`}}); console.log(resultats);res.status(200).send(resultats.data);}
    catch (error) {console.log(error);res.status(400).send("error");} 
});
//Modify user
router.put('/dev/:id', async function(req, res){
    console.log('/dev put')

    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathaccount+'/account/dev/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});console.log(resultats); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.delete('/dev/:id', async function(req, res){ 
    console.log('/dev delete')

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenDevController(accesstoken[1])
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathaccount+'/account/dev/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//Delete user YES
router.get('/dev/:id', async function(req, res){ 
    console.log('/dev get')

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenDevController(accesstoken[1])
    
    if(userid != req.params.id) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathaccount+'/account/dev/'+req.params.id, {headers: {'tokenapp': `${tokenapp}`}});console.log(resultats.data); res.status(200).send(resultats.data);}
    catch (error) {console.log(error);res.status(400).send("error");} 
});





//Board API
router.get('/restaurants', async function(req, res){
    console.log('/restaurants get')
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathboard+'/board/restaurants', {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {console.log(error);res.status(400).send("error");} 
});


//OK
router.get('/restaurantboard/:restaurantId', async function(req, res){
    console.log('/restaurantboard get')
    const accesstoken = req.headers['authorization'].split(" ");
    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathboard+'/board/restaurantboard/'+req.params.restaurantId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) { console.log(error);res.status(400).send("error");} 
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
    try {resultats = await axios.post(pathboard+'/board/menu', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/menu/:id', async function(req, res){
    console.log('/menu put')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    console.log(req.body)
    const dbmenu = await Menu.findOne({ where: {id: req.body.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.dataValues.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathboard+'/board/menu/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/menu/:menuId', async function(req, res){
    console.log('/menu delete')

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbmenu = await Menu.findOne({ where: {id: req.params.menuId} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbmenu.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");

    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathboard+'/board/menu/'+req.params.menuId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.post('/article', async function(req, res){
    console.log('/article post')

    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbrestaurant = await Restaurant.findOne({ where: {userid: userid} });
    const restaurantid = req.body.restaurantId;
    /*console.log(dbrestaurant.dataValues.id)
    if(dbrestaurant.id != restaurantid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");*/
    req.body.restaurantId =  dbrestaurant.dataValues.id
    tokenapp = generateTokenApp()
    try {resultats = await axios.post(pathboard+'/board/article', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.put('/article/:id', async function(req, res){
    console.log('/article put')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.body.id} });
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.dataValues.restaurantId} });
    if(dbrestaurant.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathboard+'/board/article/'+ req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});
//OK à tester
router.delete('/article/:articleId', async function(req, res){
    console.log('/article delete')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dbarticle = await Article.findOne({ where: {id: req.params.articleId} });
    console.log(dbarticle)
    const dbrestaurant = await Restaurant.findOne({ where: {id: dbarticle.dataValues.restaurantId} });
    if(dbrestaurant.dataValues.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    tokenapp = generateTokenApp()
    try {resultats = await axios.delete(pathboard+'/board/article/'+req.params.articleId, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

router.post('/order', async function(req, res){
    console.log('/order post')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    req.body.userId = userid
    try {resultats = await axios.post(pathorder+'/orders/order', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});

router.get('/order/user/:id', async function(req, res){
    console.log('/order get')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathorder+'/orders/user/' + userid, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});

router.delete('/order/user/:id', async function(req, res){
    console.log('/order get')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    // check si c'est sa commande
    try {resultats = await axios.delete(pathorder+'/orders/user/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});

router.get('/order/restaurant/currentorder/:id', async function(req, res){
    console.log('/order/restaurant/currentorder/:id get')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    try {resultats = await axios.get(pathorder+'/orders/restaurant/current/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});
router.get('/order/restaurant/ordershistory/:id', async function(req, res){
    console.log('/order/restaurant/ordershistory/:id get')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    try {resultats = await axios.get(pathorder+'/orders/restaurant/history/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});console.log(resultats.data); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});
router.delete('/order/restaurant/ordershistory/:id', async function(req, res){
    console.log('/order/restaurant/ordershistory/:id delete')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    //check userid possède restaurant
    try {resultats = await axios.get(pathorder+'/orders/restaurant/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}});console.log(resultats.data); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});

router.get('/order/deliveryman/:id', async function(req, res){
    console.log('/order get')
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    tokenapp = generateTokenApp()
    try {resultats = await axios.get(pathorder+'/orders/deliveryman/' + req.params.id, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});

//Order API
//OK à tester
/*router.put('/orders/statement/restaurant', async function(req, res){
    console.log('/orders/statement/validate put')

    try {
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.orderId} });
        if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    } catch (error) {
        res.status(200).send("Une erreur à été rencontrée !");
    }
    

    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathorder+'/orders/statement/validate/', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});*/


//OK à tester

router.put('/order/statement/validate/:id', async function(req, res){
    const accesstoken = req.headers['authorization'].split(" ");
    const userid = await verifTokenController(accesstoken[1])
    const dborder = await Order.findOne({ where: {id: req.body.id} });
    /*if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");*/
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathorder+'/orders/statement/validate/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); 
    console.log(resultats)
    res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");
    } 
});

//OK à tester
router.put('/order/statement/update/:id', async function(req, res){
    console.log('/orders/statement/startingRealization put')
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.id} });
        /*if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");*/
    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathorder+'/orders/statement/update/'+req.params.id, req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {
        console.log(error)
        res.status(400).send("error");} 
});
//OK à tester
router.put('/orders/statement/delivered', async function(req, res){
    console.log('/orders/statement/delivered put')

    try {
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.orderId} });
        if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    } catch (error) {
        res.status(200).send("Une erreur à été rencontrée !");
    }

    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathorder+'/orders/statement/delivered', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});


router.put('/orders/statement/deliveryMan', async function(req, res){
    console.log('/orders/statement/denied put')

    try {
        const accesstoken = req.headers['authorization'].split(" ");
        const userid = await verifTokenController(accesstoken[1])
        const dborder = await Order.findOne({ where: {id: req.body.orderId} });
        if(dborder.userid != userid) return res.status(200).send("Vous ne pouvez pas effectuer ceci");
    } catch (error) {
        res.status(200).send("Une erreur à été rencontrée !");
    }

    tokenapp = generateTokenApp()
    try {resultats = await axios.put(pathorder+'/orders/statement/denied/', req.body, {headers: {'tokenapp': `${tokenapp}` ,'Authorization': `${accesstoken[1]}`}}); res.status(200).send(resultats.data);}
    catch (error) {res.status(400).send("error");} 
});

module.exports = router;