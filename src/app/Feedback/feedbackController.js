const jwtMiddleware = require("../../../config/jwtMiddleware");
const feedbackProvider = require("./feedbackProvider");
const feedbackService = require("./feedbackService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 피드백 작성 API
 * [POST] /app/feedback/:userIdx
 */

exports.postFeedback = async function(req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;
    const title = req.body.title;
    const content = req.body.content;


    if (userIdFromJWT != userIdx)
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    if(!title)
        return res.send(baseResponse.FEEDBACK_NO_TITLE);
    else if (!content) 
        return res.send(baseResponse.FEEDBACK_NO_CONTENT);

    const feedbackResponse = await feedbackService.sendFeedback(title, content);

    return res.send(baseResponse.SUCCESS);
}
