module.exports = function(app){
    const habit = require('./habitController');

    // 1. 습관 생성 API
    app.post('/app/habits/:userIdx',habit.postHabits);

    //2. 습관 조회 API
    app.get('/app/habits/:userIdx',habit.getHabits);

    //3. 특정 습관 조회 API
    app.get('/app/habits/:userIdx/:habitIdx',habit.getHabitById);

    //4. 습관 수정 API
    app.patch('/app/habits/changeH/:userIdx/:habitIdx',habit.patchHabit);

    //5. 습관 삭제 API
    app.patch('/app/habits/:userIdx/:habitIdx',habit.deleteHabit);


};