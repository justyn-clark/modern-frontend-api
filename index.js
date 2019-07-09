/* eslint consistent-return:0 import/order:0 */
// require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const logger = require('./helpers/logger');
const argv = require('./helpers/argv');
const port = require('./helpers/port');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

const billing = require('./api/billing.json');
const user = require('./api/user.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api/users', require('./api/users/users.controller'));
app.use('/api/items', require('./api/items/items.controller'));
app.get('/api/billing', (req, res) => {
  res.send(billing);
});

app.get('/api/user/:userId', (req, res) => {
  res.send(user);
});

// global error handler
app.use(errorHandler);

// get the intended host and port number, use localhost and port 3001 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

module.exports.run = sls(app);
