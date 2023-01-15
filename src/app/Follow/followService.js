const {pool} = require("../../../config/database");
const followDao = require("../Follow/followDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");

// 친구 신청
exports.requestFollow = async function(userIdx, followee) {
    const connection = await pool.getConnection(async (conn) => conn);
    
    await followDao.insertFollow(connection, userIdx, followee);
    connection.release();

    return response(baseResponse.SUCCESS);
}