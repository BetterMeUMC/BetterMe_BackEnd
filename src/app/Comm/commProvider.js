const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const commDao = require("./commDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveCommList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const commListResult = await commDao.selectComms(connection);
    connection.release();

    return commListResult;
};

exports.retrieveCommById = async function (commId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const commResult = await commDao.selectCommId(connection, commId);

  connection.release();

  return commResult[0];
};


exports.retrieveCommByVideoId = async function (videoId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const commsResult = await commDao.selectCommByVideoId(connection, videoId);
  
    connection.release();
  
    return commsResult;
  };

exports.getCreatorId = async function (commId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const creatorIdResult = await commDao.selectCreatorId(connection, commId);

  connection.release();

  return creatorIdResult[0].creatorID;
};