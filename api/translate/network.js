const express = require('express')
const router = express.Router()
const axios = require('axios');
const env = require('./../../.env')
require('dotenv').config(env)

router.get('/', translateText)

async function translateText(req, res){
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', req.query.text);
    encodedParams.set('target', 'en');
    encodedParams.set('source', 'es');
    
    const options = {
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      },
      data: encodedParams,
    };
    
    try {
        const response = await axios.request(options);
        res.send(response.data.data.translations)
    } catch (error) {
        console.error(error);
    }
}

module.exports = router