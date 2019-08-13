const sqlite = require('sqlite');

async function configDB() {
  let dbPath;
  let migrateOpts = undefined;

  switch (process.env.NODE_ENV) {
    case 'PRODUCTION':
      dbPath = './db/db.sqlite';
      break;
    case 'DEVELOPMENT':
    default:
      dbPath = './db/db-test.sqlite';
  }

  try {
    let db = await sqlite.open(dbPath);
    console.log('Successfully connected to database');
    await db.migrate(migrateOpts);
    // TODO: This is wrong, why is it not waiting
    return db;
  } catch (error) {
    console.error(`Could not open db: ${error}`);
    process.exit();
  }
}

const db = configDB();

module.exports = db;
