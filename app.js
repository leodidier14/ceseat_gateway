const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, {useNewUrlParser: true}, () =>
    console.log("connected to database")
);
const requestLog = require('./models/requestLog')

//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const apiinfos = apiinf.findOneAndUpdate({name: pjson.name, port:process.env.PORT}, {version : pjson.version}, {upsert: true}).exec()
//################################################//

app.use((req,res,next) =>{
    requestLog.create({name:pjson.name,date: Date.now()}, (err)=> {
        if(err) console.log(err)
      })
    next()
})

//Import routes
const authRoute = require('./routes/gateway')

//Route middlewares
app.use('/', authRoute)

//Running server and listening on port 3000
app.listen(process.env.PORT, () => console.log(`Serveur running on port ${process.env.PORT}`))

