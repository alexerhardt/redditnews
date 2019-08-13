const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('./config/logger');
const db = require('./config/db');
// const sqlite = require('sqlite');

const app = express();
app.use(express.static('public'));

// sqlite.open('./db/db-test.sqlite').then(console.log('db ready'));

const port = 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
