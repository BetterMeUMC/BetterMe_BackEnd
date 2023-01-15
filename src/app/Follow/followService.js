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
    
        await followDao.insertFollow(connection, userIdx, followee);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}

// 친구 신청 수락
exports.acceptFollowRequest = async function(followeeIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
    
        await followDao.updateAcceptStatus(connection, followeeIdx);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}