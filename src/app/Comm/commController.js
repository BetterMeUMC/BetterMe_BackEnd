const jwtMiddleware = require("../../../config/jwtMiddleware");
const commProvider = require("../../app/Comm/commProvider");
const commService = require("../../app/Comm/commService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


exports.uploadComments = async function (req, res) {

    const {isParent, content, videoID} = req.body;

    const userIdFromJWT = req.verifiedToken.userId;

    // 빈 값 체크
    if (!isParent)
        return res.send(response(baseResponse.COMM_ISPARENT_EMPTY));
    if (!content)
        return res.send(response(baseResponse.COMM_CONTENT_EMPTY));
    if (!videoID)
    return res.send(response(baseResponse.VIDEO_ID_EMPTY));



    const uploadCommResponse = await commService.createComm(
        userIdFromJWT,
        isParent, 
        content, 
        videoID
    );

    return res.send(uploadCommResponse);
};


exports.getComments = async function (req, res) {
  

        const commListResult = await commProvider.retrieveCommList();
        return res.send(response(baseResponse.SUCCESS, commListResult));

};


exports.getCommentsByVideoID = async function (req, res) {
    const videoId = req.params.videoId;

    if(!videoId) {
        return res.send(response(baseResponse.VIDEO_ID_EMPTY));
    }else {
        const commResult = await commProvider.retrieveCommByVideoId(videoId);
        return res.send(response(baseResponse.SUCCESS, commResult));
    }

};


exports.getCommById = async function (req, res) {
    const commId = req.params.commId;

    if(!commId) {
        return res.send(response(baseResponse.COMM_ID_EMPTY));
    }else {
        const commByIdResult = await commProvider.retrieveCommById(commId);
        return res.send(response(baseResponse.SUCCESS, commByIdResult));
    }

};

exports.updateComm = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId;
    const commId = req.params.commId;
    
    const content = req.body.content;


    if(!commId) {
        return res.send(response(baseResponse.COMM_ID_EMPTY));
    }
    
    const creatorId = await commProvider.getCreatorId(commId);

    if (userIdFromJWT != creatorId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editCommInfo = await commService.editComm(commId, content);
        return res.send(editCommInfo);
    }
};

exports.deleteComm = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const commId = req.params.commId;
    

    if(!commId) {
        return res.send(response(baseResponse.COMM_ID_EMPTY));
    }
    
    const creatorId = await commProvider.getCreatorId(commId);

    if (userIdFromJWT != creatorId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteCommInfo = await commService.deleteComm(commId);
        return res.send(deleteCommInfo);
    }
};