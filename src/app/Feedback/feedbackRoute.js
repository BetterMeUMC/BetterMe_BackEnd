const feedback = require('./feedbackController');
const jwtMiddleware = require("../../../config/jwtMiddleware");

module.exports = function(app) {
    // 1. 피드백 작성 
    app.post('/app/feedback/:userIdx',jwtMiddleware,feedback.postFeedback);

}