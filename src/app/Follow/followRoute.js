module.exports = function(app) {
    const follow = require('./followController');

    // 1. 친구 전체 조회
    app.get('/app/follow/:follower', follow.getAllFollow);

}