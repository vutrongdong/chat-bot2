const express = require("express");
const serverless = require("serverless-http");
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const bodyParser= require('body-parser');
const cors      = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());
const router = express.Router();

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.use('/api', require('./routers'));

module.exports = app;
module.exports.handler = serverless(app);
