const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const videoDao = require("./videoDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveCardListByPop = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const videoCardListByPopResult = await videoDao.selectVideoCardsByPopular(connection);
    connection.release();

    return videoCardListByPopResult;
};


exports.retrieveCardListByAlign = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const videoCardListByAlignResult = await videoDao.selectVideoCardsByAlign(connection);
    connection.release();

    return videoCardListByAlignResult;
};

exports.retrieveDetailListByPop = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const videoDetailListByPopResult = await videoDao.selectVideoDetailsByPopular(connection);
    connection.release();

    return videoDetailListByPopResult;
};


exports.retrieveDetailListByAlign = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const videoDetailListByAlignResult = await videoDao.selectVideoDetailsByAlign(connection);
    connection.release();

    return videoDetailListByAlignResult;
};

exports.retrieveDetailById = async function (videoId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const videoResult = await videoDao.selectVideoId(connection, videoId);

  connection.release();

  return videoResult[0];
};


exports.getCreatorId = async function (videoId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const creatorIdResult = await videoDao.selectCreatorId(connection, videoId);

  connection.release();

  return creatorIdResult[0].creatorID;
};
