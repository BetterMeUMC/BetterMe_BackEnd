module.exports = function(app){

    const alarm = require('/alarmController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/alarm/all/on/:userIdx',jwtMiddleware,alarm.allAlarmOn);
};