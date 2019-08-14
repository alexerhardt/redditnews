const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const sqlite = require('sqlite');
const logger = require('./config/logger');
const dbPath = require('./config/db');

const app = express();
app.use(express.static('public'));

sqlite
  .open(dbPath, { cached: true })
  .then(db => db.migrate({}))
  .then(logger.info('Database: connected and migrated'))
  .catch(e => logger.error('Error opening db: ' + e));

const port = 3000;
app.listen(port, () => {
  logger.info(`Server: listening on port ${port}`);
});
