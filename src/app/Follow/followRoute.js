module.exports = function(app) {
    const follow = require('./followController');

    // 1. 친구 전체 조회
    app.get('/app/follow/:follower', follow.getAllFollow);

    // 2. 친구 상세 조회
    app.get('/app/follow/detail/:userIdx', follow.getFollowDetail);

    // 3. 친구 검색
    app.get('/app/follow/search/:follower/:nickName', follow.searchFollows);

    // 4. 추가할 친구 이메일 검색
    app.get('/app/follow/search/:email', follow.searchFollowEmail);
}