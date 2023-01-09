module.exports = function(app){
    const habit = require('./habitController');

    // 1. 습관 생성 API
    app.post('/app/habits',habit.postHabits);

};