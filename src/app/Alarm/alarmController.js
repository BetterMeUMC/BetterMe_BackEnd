const jwtMiddleware = require("../../../config/jwtMiddleware");
const alarmProvider = require("./alarmProvider");
const alarmService = require("./alarmService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


exports.allAlarmOn = async function(req, res) {
    const userId = req.params.userIdx;

    const allAlarmOn = await alarmService.allAlarmOn(userId);
    return res.send(response(baseResponse.SUCCESS));
}


exports.allAlarmOff = async function(req, res) {
    const userId = req.params.userIdx;

    const allAlarmOff = await alarmService.allAlarmOff(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.habitCheckAlarmOn = async function(req, res){

    const userId = req.params.userIdx;

    const habitCheckAlarmOn = await alarmService.habitCheckAlarmOn(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.habitCheckAlarmOff = async function(req, res){

    const userId = req.params.userIdx;

    const habitCheckAlarmOff = await alarmService.habitCheckAlarmOff(userId);
    return res.send(response(baseResponse.SUCCESS));
}
