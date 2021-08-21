'use strict';
require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const xmlRouter = require('./routes/xmlRouter');

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/.netlify/functions/server/xml', xmlRouter);
app.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(err.cod || 500).send(err.message);
  } else {
    next(err);
  }
});

module.exports.handler = serverless(app);
