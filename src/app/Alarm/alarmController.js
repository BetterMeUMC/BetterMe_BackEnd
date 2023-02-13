const jwtMiddleware = require("../../../config/jwtMiddleware");
const alarmProvider = require("./alarmProvider");
const alarmService = require("./alarmService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


exports.allAlarmOn = async function(req, res) {
    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const allAlarmOn = await alarmService.allAlarmOn(userId);
        return res.send(allAlarmOn);
    }
}


exports.allAlarmOff = async function(req, res) {
    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const allAlarmOff = await alarmService.allAlarmOff(userId);
        return res.send(allAlarmOff);
    }
}

exports.habitCheckAlarmOn = async function(req, res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const habitCheckAlarmOn = await alarmService.habitCheckAlarmOn(userId);
        return res.send(habitCheckAlarmOn);
    }
}

exports.habitCheckAlarmOff = async function(req, res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const habitCheckAlarmOff = await alarmService.habitCheckAlarmOff(userId);
        return res.send(habitCheckAlarmOff);
    }
}

exports.habitInviteAlarmOn = async function(req, res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const habitInviteAlarmOn = await alarmService.habitInviteAlarmOn(userId);
        return res.send(habitInviteAlarmOn);
    }
}

exports.habitInviteAlarmOff = async function(req, res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const habitInviteAlarmOff = await alarmService.habitInviteAlarmOff(userId);
        return res.send(habitInviteAlarmOff);
    }
}

exports.friendRequestAlarmOn = async function(req,res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const friendRequestAlarmOn = await alarmService.friendRequestAlarmOn(userId);
        return res.send(friendRequestAlarmOn);
    }
}

exports.friendRequestAlarmOff = async function(req,res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const friendRequestAlarmOff = await alarmService.friendRequestAlarmOff(userId);
        return res.send(friendRequestAlarmOff);
    }
}

exports.friendAwardAlarmOn = async function(req,res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const friendAwardAlarmOn = await alarmService.friendAwardAlarmOn(userId);
        return res.send(friendAwardAlarmOn);
    }
}

exports.friendAwardAlarmOff = async function(req,res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const friendAwardAlarmOff = await alarmService.friendAwardAlarmOff(userId);
        return res.send(friendAwardAlarmOff);
    }
}

exports.getAlarm = async function(req,res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else {
        const alarmShowResult = await alarmProvider.alarmShow(userId);
        return res.send(response(baseResponse.ALARM_SHOW_SUCCESS, alarmShowResult))
    }
}