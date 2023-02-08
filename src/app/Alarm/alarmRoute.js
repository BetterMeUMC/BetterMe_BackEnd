const alarm = require("./alarmController");
module.exports = function(app){

    const alarm = require('./alarmController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/app/alarm/all/on/:userIdx',alarm.allAlarmOn);

    app.patch('/app/alarm/all/off/:userIdx',alarm.allAlarmOff);

    app.patch('/app/alarm/habitCheck/on/:userIdx',alarm.habitCheckAlarmOn);

    app.patch('/app/alarm/habitCheck/off/:userIdx',alarm.habitCheckAlarmOff);

    app.patch('/alarm/habitInvite/on/:userIdx',alarm.habitInviteAlarmOn);

    app.patch('/app/alarm/habitInvite/off/:userIdx',alarm.habitInviteAlarmOff);

    app.patch('/alarm/friendRequest/on/:userIdx',alarm.friendRequestAlarmOn);

    app.patch('/alarm/friendRequest/off/:userIdx',alarm.friendRequestAlarmOff);

    app.patch('/alarm/friendAward/on/:userIdx',alarm.friendAwardAlarmOn);

    app.patch('/alarm/friendAward/off/:userIdx',alarm.friendAwardAlarmOff);
};