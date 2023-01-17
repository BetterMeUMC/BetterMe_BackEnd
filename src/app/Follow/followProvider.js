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

// 친구 검색
exports.searchFollowList = async function(follower, nickName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const searchResults = await followDao.selectSearchedFollows(connection, follower, nickName);

    // 검색한 유저가 없을 때
    if(!searchResults[0]) {
        return `[ERROR] FOLLOW_USER_NOT_EXIST`
    };

    for(let i = 0; i < searchResults.length; i++) {
        const userIdx = searchResults[i]['followee'];
        const followStarResult = await followDao.selectAllFollowStars(connection, userIdx);
        
        searchResults[i]['stars'] = followStarResult[0]['stars'];
    }

    connection.release();

    return searchResults;
}

// 추가할 친구 이메일 검색
exports.retrieveFollowEmail = async function(follower, email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const searchedFollowInfoResult = await followDao.selectSearchedFollowEmail(connection, email);

    // 검색한 이메일이 없을 때
    if(!searchedFollowInfoResult[0]) {
        return `[ERROR] FOLLOW_EMAIL_NOT_EXIST`;
    }

    const userIdx = searchedFollowInfoResult[0]['userIdx'];
    const followStarsResult = await followDao.selectAllFollowStars(connection, userIdx);
    const acceptStatusResult = await followDao.selectAcceptStatus(connection, follower, userIdx);

    searchedFollowInfoResult[0]['stars'] = followStarsResult[0]['stars'];

    // 친구 요청을 보낸 이력이 없을 때
    if(!acceptStatusResult[0]) {
        searchedFollowInfoResult[0]['acceptStatus'] = null;
    } else {
        searchedFollowInfoResult[0]['acceptStatus'] = acceptStatusResult[0]['acceptStatus'];
    }

    connection.release();

    return searchedFollowInfoResult;
}

// 친구 신청 목록 조회
exports.retrieveFollowRequest = async function(follower) {
    const connection = await pool.getConnection(async (conn) => conn);
    const followRequestResults = await followDao.selectFollowRequest(connection, follower);
   
    connection.release();

    return followRequestResults;
}