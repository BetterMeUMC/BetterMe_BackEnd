const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const followDao = require("./followDao");

// 친구 전체 조회
exports.retrieveFollowList = async function(follower) {
    const connection = await pool.getConnection(async (conn) => conn);
    const followInfoResult = await followDao.selectAllFollowInfo(connection, follower);

    for(let i = 0; i < followInfoResult.length; i++) {
        const userIdx = followInfoResult[i]['followee'];
        const followStarResult = await followDao.selectAllFollowStars(connection, userIdx);

        followInfoResult[i]['stars'] = followStarResult[0]['stars'];
    }

    connection.release();

    return followInfoResult;
}