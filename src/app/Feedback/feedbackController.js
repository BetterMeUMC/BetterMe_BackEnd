const jwtMiddleware = require("../../../config/jwtMiddleware");
const feedbackProvider = require("./feedbackProvider");
const feedbackService = require("./feedbackService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 피드백 작성 API
 * [POST] /app/feedback
 */

exports.postFeedback = async function(req, res) {
    const title = req.body.title;
    const content = req.body.content;

    if(!title)
        return res.send(baseResponse.FEEDBACK_NO_TITLE);
    else if (!content) 
        return res.send(baseResponse.FEEDBACK_NO_CONTENT);

    const feedbackResponse = await feedbackService.sendFeedback(title, content);

    return res.send(baseResponse.SUCCESS);
}
