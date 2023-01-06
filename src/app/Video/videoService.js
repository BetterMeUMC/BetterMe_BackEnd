const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const videoProvider = require("./videoProvider");
const videoDao = require("./videoDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createVideo = async function (userIdFromJWT, thumbnailPic, videoName, isStreaming, dscrp, videoURL, privateType,  runtime) {
    try {
        const createVideoParams = [userIdFromJWT, thumbnailPic, videoName, isStreaming,dscrp, videoURL, privateType,  runtime];

        const connection = await pool.getConnection(async (conn) => conn);

        const createVideoResult = await videoDao.insertVideo(connection, createVideoParams);
        console.log(`추가된 동영상 : ${createVideoResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createVideo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.editVideo = async function (videoId,dscrp) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const editVideoResult = await videoDao.updateVideo(connection, videoId, dscrp);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editVideo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteVideo = async function (videoId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteVideoResult = await videoDao.deleteVideo(connection, videoId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteVideo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}