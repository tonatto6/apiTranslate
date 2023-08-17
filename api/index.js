const express = require('express');
const app = express();
const cors = require('cors')
const translate = require('./translate/network')
const env = require('./../.env')
require('dotenv').config(env)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send('Hola mundo!')
})

app.use('/api/translate/', translate)

app.listen(process.env.API_PORT, (req, res)=>{
    console.log(`APP corriendo en el puerto ${process.env.API_PORT}`)
})
