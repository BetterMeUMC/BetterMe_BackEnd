const alarm = require("./alarmController");
module.exports = function(app){

    const alarm = require('./alarmController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/app/alarm/all/on/:userIdx',alarm.allAlarmOn);

    app.patch('/app/alarm/all/off/:userIdx',alarm.allAlarmOff);

    app.patch('/app/alarm/habitCheck/on/:userIdx',alarm.habitCheckAlarmOn);

    app.patch('/app/alarm/habitCheck/off/:userIdx',alarm.habitCheckAlarmOff);
};