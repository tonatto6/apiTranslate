const express = require('express')
const router = express.Router()
const axios = require('axios');
const env = require('./../../.env')
require('dotenv').config(env)

router.post('/', translateText)

router.get('/languages', getLanguages)

async function translateText(req, res){
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', req.body.text);
    encodedParams.set('target', req.query.target);
    encodedParams.set('source', req.query.source);
    
    const options = {
      method: 'POST',
      url: process.env.API_URL_TRANSLATE,
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

async function getLanguages(req, res){
    const options = {
        method: 'GET',
        url: process.env.API_URL_LANGUAGES,
        headers: {
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': process.env.API_HOST
        }
      };
      
      try {
            const response = await axios.request(options);
            res.send(response.data)
        } catch (error) {
            console.error(error);
        }
}

module.exports = router