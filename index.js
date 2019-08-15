const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const sqlite = require('sqlite');
const logger = require('./config/logger');
const dbPath = require('./config/db');

const subscriptions = require('./routes/subscriptions');

const app = express();
app.use(express.static('public'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sqlite
  .open(dbPath, { cached: true })
  .then(db => db.migrate({}))
  .then(logger.info('Database: connected and migrated'))
  .catch(e => logger.error('Error opening db: ' + e));

app.use('/', subscriptions);

app.use((err, req, res, next) => {
  if (!err.httpStatus) {
    logger.error(err.stack);
  }
  res.status(err.httpStatus || 500);
  res.json({ error: err.clientMessage || 'Internal server error' });
});

const port = 3000;
app.listen(port, () => {
  logger.info(`Server: listening on port ${port}`);
});

module.exports = app;
