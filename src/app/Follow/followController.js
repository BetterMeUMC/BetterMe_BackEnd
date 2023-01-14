const jwtMiddleware = require("../../../config/jwtMiddleware");
const followProvider = require("./followProvider");
const followService = require("./followService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 친구 전체 조회 API
 * [GET] /app/follow/:follower
 */

exports.getAllFollow = async function(req, res) {
    const follower = req.params.follower;
    const followList = await followProvider.retrieveFollowList(follower);

    return res.send(response(baseResponse.SUCCESS, followList));
}

/**
 * API No. 2
 * API Name : 친구 상세 조회 API
 * [GET] /app/follow/detail/:followee
 */

 exports.getFollowDetail = async function(req, res) {
    const userIdx = req.params.userIdx;
    const followDetail = await followProvider.retrieveFollowDetailList(userIdx);

    return res.send(response(baseResponse.SUCCESS, followDetail));
}