const alarm = require("./alarmController");
module.exports = function(app){

    const alarm = require('./alarmController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/app/alarm/all/on/:userIdx',jwtMiddleware, alarm.allAlarmOn);

    app.patch('/app/alarm/all/off/:userIdx',jwtMiddleware, alarm.allAlarmOff);

    app.patch('/app/alarm/habitCheck/on/:userIdx',jwtMiddleware, alarm.habitCheckAlarmOn);

    app.patch('/app/alarm/habitCheck/off/:userIdx',jwtMiddleware,alarm.habitCheckAlarmOff);

    app.patch('/app/alarm/habitInvite/on/:userIdx',jwtMiddleware, alarm.habitInviteAlarmOn);

    app.patch('/app/alarm/habitInvite/off/:userIdx',jwtMiddleware, alarm.habitInviteAlarmOff);

    app.patch('/app/alarm/friendRequest/on/:userIdx',jwtMiddleware, alarm.friendRequestAlarmOn);

    app.patch('/app/alarm/friendRequest/off/:userIdx',jwtMiddleware, alarm.friendRequestAlarmOff);

    app.patch('/app/alarm/friendAward/on/:userIdx',jwtMiddleware, alarm.friendAwardAlarmOn);

    app.patch('/alarm/friendAward/off/:userIdx',jwtMiddleware, alarm.friendAwardAlarmOff);
};