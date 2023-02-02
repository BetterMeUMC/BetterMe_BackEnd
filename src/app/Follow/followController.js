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
 * [GET] /app/follow/detail/:userIdx
 */

 exports.getFollowDetail = async function(req, res) {
    const userIdx = req.params.userIdx;
    const followDetail = await followProvider.retrieveFollowDetailList(userIdx);

    if(followDetail.includes('ERROR'))
        return res.send(response(baseResponse.FOLLOW_WRONG_REQUEST));

    return res.send(response(baseResponse.SUCCESS, followDetail));
}

/**
 * API No. 3
 * API Name : 친구 검색 API
 * [GET] /app/follow/searchN/:follower
 */

 exports.searchFollows = async function(req, res) {
    const follower = req.params.follower;
    const nickName = req.body.nickName;
    const searchedFollowList = await followProvider.searchFollowList(follower, nickName);

    if(!nickName) 
        return res.send(response(baseResponse.FOLLOW_NICKNAME_EMPTY));

    if(searchedFollowList.includes('ERROR'))
        return res.send(response(baseResponse.FOLLOW_USER_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, searchedFollowList));
}

/**
 * API No. 4
 * API Name : 추가할 친구 이메일 검색 API
 * [GET] /app/follow/searchE/:follower
 */

 exports.searchFollowEmail = async function(req, res) {
    const follower = req.params.follower;
    const email = req.body.email;
    const searchedFollow = await followProvider.retrieveFollowEmail(follower, email);

    if(!email)
        return res.send(response(baseResponse.FOLLOW_EMAIL_EMPTY));

    if(searchedFollow.includes('ERROR'))
        return res.send(response(baseResponse.FOLLOW_EMAIL_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, searchedFollow));
}

/**
 * API No. 5
 * API Name : 친구 신청 API
 * [POST] /app/follow/request/:userIdx/:followee
 */

exports.postFollow = async function(req, res) {
    const userIdx = req.params.userIdx;
    const followee = req.params.followee;

    if(userIdx === followee) 
        return res.send(response(baseResponse.FOLLOW_SELF_REQUEST));

    const followResponse = await followService.requestFollow(userIdx, followee);

    return res.send(response(followResponse));
}

/**
 * API No. 6
 * API Name : 친구 신청 목록 조회 API
 * [GET] /app/follow/request/:follower
 */

 exports.getRequestFollows = async function(req, res) {
    const follower = req.params.follower;
    const followRequestList = await followProvider.retrieveFollowRequest(follower);

    return res.send(response(baseResponse.SUCCESS, followRequestList));
}

/**
 * API No. 7
 * API Name : 친구 신청 수락 API
 * [PATCH] /app/follow/accept/:follower/:followee
 */

 exports.patchAcceptStatus = async function(req, res) {
    const follower = req.params.follower;
    const followee = req.params.followee;
    const acceptFollowRequestResponse = await followService.acceptFollowRequest(follower, followee);

    return res.send(acceptFollowRequestResponse);
}

/**
 * API No. 8
 * API Name : 친구 신청 거절 or 친구 삭제 API
 * [DELETE] /app/follow/delete/:follower
 */

 exports.deleteFollows = async function(req, res) {
    const follower = req.params.follower;
    const followee = req.body.followee;
    console.log(followee);
    const deleteFollowResponse = await followService.deleteFollowsOrRequest(follower, followee);

    return res.send(deleteFollowResponse);
}