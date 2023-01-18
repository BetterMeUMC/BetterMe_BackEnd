const {pool} = require("../../../config/database");
const followDao = require("../Follow/followDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");

// 친구 신청
exports.requestFollow = async function(userIdx, followee) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        await followDao.insertFollow(connection, userIdx, followee, 0);
        await followDao.insertFollow(connection, followee, userIdx, 1);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}

// 친구 신청 수락
exports.acceptFollowRequest = async function(follower, followee) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const acceptStatusResult = await followDao.selectAcceptStatus(connection, follower, followee);
        const acceptStatus = acceptStatusResult[0]['acceptStatus'];

        if(acceptStatus != 1 ) {
            return errResponse(baseResponse.FOLLOW_REQUEST_NOT_EXIST);
        }

        await followDao.updateAcceptStatus(connection, follower, followee);
        await followDao.updateAcceptStatus(connection, followee, follower);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}

// 친구 신청 거절 or 친구 신청
exports.deleteFollowsOrRequest = async function(follower, followee) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const acceptStatusResult = await followDao.selectAcceptStatus(connection, follower, followee);
        const acceptStatus = acceptStatusResult[0]['acceptStatus'];

        if(acceptStatus != 1 && acceptStatus != 2 ) {
            return errResponse(baseResponse.FOLLOW_WRONG_REQUEST);
        }

        await followDao.deleteFollows(connection, follower, followee);
        await followDao.deleteFollows(connection, followee, follower);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}