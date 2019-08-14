let env = process.env.NODE_ENV;

let dbPath;
if (env === 'PRODUCTION') {
  dbPath = './db/db.sqlite';
} else {
  dbPath = './db/db-test.sqlite';
}

module.exports = dbPath;
