const mysql = require('mysql2');

require('dotenv').config();

const { DB_USER, DB_PASS, DB_HOST, DB_DEV_DB_NAME, DB_TEST_DB_NAME, NODE_ENV } =
  process.env;

const dbName = NODE_ENV === 'development' ? DB_DEV_DB_NAME : DB_TEST_DB_NAME;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    if (err && err.code === 'ER_DB_CREATE_EXISTS') {
      console.log('Db already created');
      process.exit(0);
    }

    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  });
});
