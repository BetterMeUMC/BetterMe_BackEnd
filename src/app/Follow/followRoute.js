const jwtMiddleware = require('../../../config/jwtMiddleware');

module.exports = function(app) {
    const follow = require('./followController');

    // 1. 친구 전체 조회
    app.get('/app/follow/:follower', jwtMiddleware, follow.getAllFollow);

    // 2. 친구 상세 조회
    app.get('/app/follow/detail/:userIdx/:followee', jwtMiddleware, follow.getFollowDetail);

    // 3. 친구 검색
    app.get('/app/follow/searchN/:follower', jwtMiddleware, follow.searchFollows);

    // 4. 추가할 친구 이메일 검색
    app.get('/app/follow/searchE/:follower', jwtMiddleware, follow.searchFollowEmail);

    // 5. 친구 신청
    app.post('/app/follow/request/:userIdx/:followee', jwtMiddleware, follow.postFollow);

    // 6. 친구 신청 목록 조회
    app.get('/app/follow/request/:follower', jwtMiddleware, follow.getRequestFollows);

    // 7. 친구 신청 수락
    app.patch('/app/follow/accept/:follower/:followee', jwtMiddleware, follow.patchAcceptStatus);

    // 8. 친구 신청 거절 / 친구 삭제
    app.delete('/app/follow/delete/:follower', jwtMiddleware, follow.deleteFollows);
}