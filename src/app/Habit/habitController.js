const jwtMiddleware = require("../../../config/jwtMiddleware");
const habitProvider = require("./habitProvider");
const habitService = require("./habitService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const { DailyRotateFile } = require("winston/lib/winston/transports");

/**
 * API No. 1
 * API Name : 습관 생성 API
 * [POST] /app/habits/:userIdx
 */

exports.postHabits = async function(req, res){

    /**
     * Body : emoge, habitName, contents, goodOrBad
     */
    userIdx = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;
    if (userIdFromJWT != userIdx) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {
        const {habitName, categoryIdx, habitDay, contents, emoji, alarm, isPrivate} = req.body;

        //빈 값 체크
        if (!categoryIdx)
            return res.send(response(baseResponse.HABIT_CATEGORYIDX_EMPTY));
        if (!habitDay)
            return res.send(response(baseResponse.HABIT_HABITDAY_EMPTY));
        if (!emoji)
            return res.send(response(baseResponse.HABIT_EMOJI_EMPTY));
        if (!isPrivate)
            return res.send(response(baseResponse.HABIT_ISPRIVATE_EMPTY));
        if (!habitName)
            return res.send(response(baseResponse.HABIT_NAME_EMPTY));
        if (!contents)
            return res.send(response(baseResponse.HABIT_CONTENTS_EMPTY));


        //길이 체크
        if (emoji.length > 3) 
            return res.send(response(baseResponse.HABIT_EMOGE_LENGTH));
        if (habitName.length > 20)
            return res.send(response(baseResponse.HABIT_NAME_LENGTH));
        if (contents.length > 50)
            return res.send(response(baseResponse.HABIT_CONTENTS_LENGTH));

        const habitResponse = await habitService.createHabit(
            userIdx,
            habitName, 
            categoryIdx, 
            habitDay, 
            contents, 
            emoji,
            alarm,
            isPrivate
        );

        return res.send(habitResponse);
    }
}

/**
 * API No. 2
 * API Name : 습관 조회 API
 * [GET] /app/habits/:userIdx
 */

exports.getHabits = async function(req, res){

    const userId = req.params.userIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {

        //습관 전체 조회
        const habitListResult = await habitProvider.retrieveHabitList(userId);
        return res.send(response(baseResponse.SUCCESS, habitListResult));
    }

}

/**
 * API No. 3
 * API Name : 특정 습관 조회 API
 * [GET] /app/habits/:userIdx/:habitIdx
 */

exports.getHabitById = async function(req,res){

    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {

        const habitByHabitId = await habitProvider.retrieveHabit(userId, habitId);
        return res.send(response(baseResponse.SUCCESS, habitByHabitId))
    }

}

/**
 * API No. 4
 * API Name : 습관 수정 API
 * [PATCH] /app/habits/:userIdx/:habitIdx
 */

exports.patchHabit = async function (req, res){

    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;
    const {habitName, contents, emoge} = req.body;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {
        //빈 값 체크
        if (!emoge)
            return res.send(response(baseResponse.HABIT_EMOGE_EMPTY));
        if (!habitName)
            return res.send(response(baseResponse.HABIT_NAME_EMPTY));
        if (!contents)
            return res.send(response(baseResponse.HABIT_CONTENTS_EMPTY));


        //길이 체크
        if (emoge.length > 1)
            return res.send(response(baseResponse.HABIT_EMOGE_LENGTH));
        if (habitName.length > 20)
            return res.send(response(baseResponse.HABIT_NAME_LENGTH));
        if (contents.length > 50)
            return res.send(response(baseResponse.HABIT_CONTENTS_LENGTH));

        const editHabitInfo = await habitService.editHabit(userId, habitId, habitName, contents, emoge);
        return res.send(editHabitInfo);
    }
}
/**
 * API No. 5
 * API Name : 습관 삭제 API
 * [PATCH] /app/habits/:userIdx/:habitIdx
 */

exports.deleteHabit = async function (req, res){

    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {

        const deleteHabit = await habitService.deleteHabit(userId, habitId);
        return res.send(deleteHabit);
    }
}


/**
 * API No. 6
 * API Name : 습관 초대 API
 * [POST] /app/invite/:userIdx
 */

exports.postHabitInvite = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userIdx;

    const senderIdx = req.params.userIdx;
    const {habitIdx, receiverIdx} = req.body;

    //빈 값 체크
    if(!receiverIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!senderIdx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!habitIdx)
        return res.send(response(baseResponse.HABIT_ID_EMPTY));

    if (userIdFromJWT != senderIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    const habitInviteResponse = await habitService.inviteHabit(
        habitIdx,
        senderIdx,
        receiverIdx
    );
    console.log(habitInviteResponse);

    return res.send(habitInviteResponse);
}

/**
 * API No. 7
 * API Name : 받은 습관 초대 조회 API
 * [GET] /app/invite/:userIdx
 */

exports.getHabitInvite = async function(req,res){

    const userIdFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;

    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    const habitInviteByUserIdx = await habitProvider.retrieveHabitInvite(userIdx);

    return res.send(response(baseResponse.SUCCESS, habitInviteByUserIdx));
}

/**
 * API No. 8
 * API Name : 받은 습관 초대 응답 - 수락 API
 * [PATCH] /app/invite/accept/:userIdx/:habitIdx
 */

exports.patchtHabitInviteAccept = async function(req,res){

    const userIdFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;
    const habitIdx = req.params.habitIdx;

    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));


    const habitInviteResponse = await habitService.acceptInviteHabit(userIdx, habitIdx);
    // 습관 추가
    const habitByHabitId = await habitProvider.retrieveHabit(habitIdx);

    const habitResponse = await habitService.createHabit(
        userIdx,
        habitByHabitId[0].habitName,
        habitByHabitId[0].contents,
        habitByHabitId[0].goodOrBad,
        habitByHabitId[0].emoge
    );

    return res.send(habitInviteResponse);
}

/**
 * API No. 9
 * API Name : 받은 습관 초대 응답 - 거절 API
 * [PATCH] /app/invite/reject/:userIdx/:habitIdx
 */

exports.patchtHabitInviteReject = async function(req,res){
    const userIdFromJWT = req.verifiedToken.userIdx;

    const userIdx = req.params.userIdx;
    const habitIdx = req.params.habitIdx;

    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    const habitInviteResponse = await habitService.rejectInviteHabit(userIdx, habitIdx);
    return res.send(habitInviteResponse);
}

/**
 * API No. 10
 * API Name : 받은 습관 초대 응답 조회 api
 * [GET] /app/invite/response/:userIdx
 */

exports.getHabitInviteResponse = async function(req, res){
    const userIdFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userIdx;

    if (userIdFromJWT != userIdx)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    const habitInviteResponse = await habitProvider.retrieveHabitInviteResponse(userIdx);
    return res.send(response(baseResponse.SUCCESS, habitInviteResponse));
}


/**
 * API No. 11
 * API Name : 습관 체크 API
 * [PATCH] /app/habits/check/:userIdx/:habitIdx
 */

exports.checkHabit = async function (req, res){

    const check = req.body;
    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }else {

        const habitDay = await habitProvider.getHabitDay(userId, habitId);
        const habitLife = await habitProvider.getHabitLife(userId, habitId);

        if (habitDay[0][0].habitDay <= 0) { //습관 남은 일 수가 0일 때 처리하는 logic
            const achieveHabit = await habitService.achieveHabit(userId, habitId);
            return res.send(response(baseResponse.HABIT_ACHIEVEMENT_SUCCESS));
        }

        if (habitLife[0][0].life <= 0) {// life가 0이 되어 습관이 삭제되는 logic
            const deleteHabit = await habitService.deleteHabit(userId, habitId);
            return res.send(response(baseResponse.HABIT_DELETE_SUCCESS));
        }


        if (check.check) {
            const checkHabit = await habitService.checkHabit(userId, habitId);
            return res.send(checkHabit);
        } else {
            const noCheckHabit = await habitService.noCheckHabit(userId, habitId);
            return res.send(noCheckHabit);
        }
    }

}