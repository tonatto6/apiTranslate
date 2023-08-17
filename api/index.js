const app = require('express')()
const cors = require('cors')
const translate = require('./translate/network')
const env = require('./../.env')
require('dotenv').config(env)

app.get('/', (req, res)=>{
    res.send('Hola mundo!')
})

app.use('/api/translate/', translate)

app.listen(process.env.API_PORT, (req, res)=>{
    console.log(`APP corriendo en el puerto ${process.env.API_PORT}`)
})
