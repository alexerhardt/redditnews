const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('./config/logger');

const app = express();
app.use(express.static('public'));

const port = 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
