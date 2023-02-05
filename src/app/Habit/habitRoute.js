module.exports = function(app){
    const habit = require('./habitController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 습관 생성 API
    app.post('/app/habits/:userIdx',jwtMiddleware,habit.postHabits);

    //2. 습관 조회 API
    app.get('/app/habits/:userIdx',jwtMiddleware,habit.getHabits);

    //3. 특정 습관 조회 API
    app.get('/app/habits/:userIdx/:habitIdx',jwtMiddleware,habit.getHabitById);

    //4. 습관 수정 API
    app.patch('/app/habits/changeH/:userIdx/:habitIdx',jwtMiddleware,habit.patchHabit);

    //5. 습관 삭제 API
    app.patch('/app/habits/:userIdx/:habitIdx',jwtMiddleware,habit.deleteHabit);

    //6. 습관 체크 API
    app.patch('/app/habits/check/:userIdx/:habitIdx',jwtMiddleware,habit.checkHabit);

    //6. 습관 초대 API
    app.post('/app/invite/:userIdx',habit.postHabitInvite);

    //7. 습관 초대 조회 API
    app.get('/app/invite/:userIdx',habit.getHabitInvite);

    //8. 습관 초대 응답 - 수락 API
    app.patch('/app/invite/accept/:userIdx/:habitIdx',habit.patchtHabitInviteAccept);

    //9. 습관 초대 응답 - 거절 API
    app.patch('/app/invite/reject/:userIdx/:habitIdx',habit.patchtHabitInviteReject);

    //10. 습관 초대 응답 조회 API
    app.get('/app/invite/response/:userIdx', habit.getHabitInviteResponse);
};