const {pool} = require("../../../config/database");
const feedbackDao = require("../Feedback/feedbackDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");

// 피드백 작성
exports.sendFeedback = async function(title, content) {
    try {
        const feedbackParams = [title, content];

        const connection = await pool.getConnection(async (conn) => conn);

        await feedbackDao.insertFeedback(connection, feedbackParams);
        connection.release();

        return response(baseResponse.SUCCESS);
    } 
    catch (err) {
        logger.error(`[ERROR] ${err.message}`);   
        return errResponse(baseResponse.DB_ERROR); 
    }
}
