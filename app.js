const express = require('express')
const app = express()

//Import routes
const authRoute = require('./routes/gateway')

//Route middlewares
app.use('/', authRoute)

//Running server and listening on port 3000
const PORT = 3000
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

