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

// 친구 상세 조회
exports.retrieveFollowDetailList = async function(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const followDetailInfoResult = await followDao.selectFollowDetailInfo(connection, userIdx);
    const followIdx = followDetailInfoResult[0]['userIdx'];
    const followDetailAwardResults = await followDao.selectFollowDetailAwards(connection, followIdx);
    
    followDetailInfoResult[0]['awards'] = followDetailAwardResults;

    connection.release();

    return followDetailInfoResult;
}