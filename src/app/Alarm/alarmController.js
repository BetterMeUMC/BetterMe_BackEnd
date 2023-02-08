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

exports.habitInviteAlarmOn = async function(req, res){

    const userId = req.params.userIdx;

    const habitInviteAlarmOn = await alarmService.habitInviteAlarmOn(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.habitInviteAlarmOff = async function(req, res){

    const userId = req.params.userIdx;

    const habitInviteAlarmOff = await alarmService.habitInviteAlarmOff(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.friendRequestAlarmOn = async function(req,res){

    const userId = req.params.userIdx;

    const friendRequestAlarmOn = await alarmService.friendRequestAlarmOn(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.friendRequestAlarmOff = async function(req,res){

    const userId = req.params.userIdx;

    const friendRequestAlarmOff = await alarmService.friendRequestAlarmOff(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.friendAwardAlarmOn = async function(req,res){

    const userId = req.params.userIdx;

    const friendAwardAlarmOn = await alarmService.friendAwardAlarmOn(userId);
    return res.send(response(baseResponse.SUCCESS));
}

exports.friendAwardAlarmOff = async function(req,res){

    const userId = req.params.userIdx;

    const friendAwardAlarmOff = await alarmService.friendAwardAlarmOff(userId);
    return res.send(response(baseResponse.SUCCESS));
}
