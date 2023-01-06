const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const commProvider = require("./commProvider");
const commDao = require("./commDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createComm = async function (userIdFromJWT, isParent, content, videoID) {
    try {
        const createCommParams = [isParent, content, userIdFromJWT,videoID];

        const connection = await pool.getConnection(async (conn) => conn);

        const createCommResult = await commDao.insertComm(connection, createCommParams);
        console.log(`추가된 댓글 : ${createCommResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createComments Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.editComm = async function (commId,content) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const editCommResult = await commDao.updateComm(connection, commId, content);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteComm = async function (commId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteCommResult = await commDao.deleteComm(connection, commId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}