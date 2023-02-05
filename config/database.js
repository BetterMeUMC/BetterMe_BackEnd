const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    port : '3306',
    password: "37e747937e",
    database: "better_me",
});

module.exports = {
    pool: pool
};