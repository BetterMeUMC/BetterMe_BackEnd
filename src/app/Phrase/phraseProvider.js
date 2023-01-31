const { pool } = require("../../../config/database");

const phraseDao = require("./phraseDao");

exports.getPhrase = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const phraseGetResult = await phraseDao.getAPhrase(connection);
    connection.release();
  
    return phraseGetResult[0].content;
  };