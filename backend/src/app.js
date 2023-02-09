// const express = require('express')
import express from 'express'
const app = express();
//Rotas
// const index = require('./routes/index');
import index from './routes/index.js'
app.use(express.json())
app.use('/', index);

// module.exports = app;
export default app

