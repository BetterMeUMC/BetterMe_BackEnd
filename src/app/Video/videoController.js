const jwtMiddleware = require("../../../config/jwtMiddleware");
const videoProvider = require("../../app/Video/videoProvider");
const videoService = require("../../app/Video/videoService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


exports.uploadVideo = async function (req, res) {

    const {thumbnailPic, videoName, isStreaming,dscrp, videoURL, privateType, runtime} = req.body;

    const userIdFromJWT = req.verifiedToken.userId;

    // 빈 값 체크
    if (!thumbnailPic)
        return res.send(response(baseResponse.VIDEO_THUMBPIC_EMPTY));
    if (!videoName)
        return res.send(response(baseResponse.VIDEO_NAME_EMPTY));
    if (!isStreaming)
    return res.send(response(baseResponse.VIDEO_ISSTREAMING_EMPTY));
    if (!dscrp)
    return res.send(response(baseResponse.VIDEO_DSCRP_EMPTY));
    if (!videoURL)
    return res.send(response(baseResponse.VIDEO_URL_EMPTY));
    if (!privateType)
    return res.send(response(baseResponse.VIDEO_PRIVATE_EMPTY));
    if (!runtime)
    return res.send(response(baseResponse.VIDEO_RUNTIME_EMPTY));



    const uploadVideoResponse = await videoService.createVideo(
        userIdFromJWT,
        thumbnailPic, 
        videoName, 
        isStreaming,
        dscrp, 
        videoURL, 
        privateType, 
        runtime
    );

    return res.send(uploadVideoResponse);
};


exports.getCards = async function (req, res) {
    const align = req.query.align;

    if(!align) {
        const videoCardListPopResult = await videoProvider.retrieveCardListByPop();
        return res.send(response(baseResponse.SUCCESS, videoCardListPopResult));
    }else {
        const videoCardListAlignResult = await videoProvider.retrieveCardListByAlign();
        return res.send(response(baseResponse.SUCCESS, videoCardListAlignResult));
    }

};


exports.getDetails = async function (req, res) {
    const align = req.query.align;

    if(!align) {
        const videoDetailListPopResult = await videoProvider.retrieveDetailListByPop();
        return res.send(response(baseResponse.SUCCESS, videoDetailListPopResult));
    }else {
        const videoDetailListAlignResult = await videoProvider.retrieveDetailListByAlign();
        return res.send(response(baseResponse.SUCCESS, videoDetailListAlignResult));
    }

};


exports.getDetailById = async function (req, res) {
    const videoId = req.params.videoId;

    if(!videoId) {
        return res.send(response(baseResponse.VIDEO_ID_EMPTY));
    }else {
        const videoDetailResult = await videoProvider.retrieveDetailById(videoId);
        return res.send(response(baseResponse.SUCCESS, videoDetailResult));
    }

};


exports.updateVideo = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId;
    const videoId = req.params.videoId;
    
    const dscrp = req.body.dscrp;


    if(!videoId) {
        return res.send(response(baseResponse.VIDEO_ID_EMPTY));
    }
    
    const creatorId = await videoProvider.getCreatorId(videoId);

    if (userIdFromJWT != creatorId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editVideoInfo = await videoService.editVideo(videoId, dscrp);
        return res.send(editVideoInfo);
    }
};

exports.deleteVideo = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const videoId = req.params.videoId;
    

    if(!videoId) {
        return res.send(response(baseResponse.VIDEO_ID_EMPTY));
    }
    
    const creatorId = await videoProvider.getCreatorId(videoId);

    if (userIdFromJWT != creatorId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteVideoInfo = await videoService.deleteVideo(videoId);
        return res.send(deleteVideoInfo);
    }
};