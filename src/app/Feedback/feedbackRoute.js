module.exports = function(app) {
    const feedback = require('./feedbackController');

    // 1. 피드백 작성 
    app.post('/app/feedback', feedback.postFeedback);

}