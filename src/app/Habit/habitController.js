const jwtMiddleware = require("../../../config/jwtMiddleware");
const habitProvider = require("./habitProvider");
const habitService = require("./habitService");
const habitDao = require("./habitDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

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

    const {habitName, contents, goodOrBad, emoge} = req.body;

    //빈 값 체크
    if(!emoge)
        return res.send(response(baseResponse.HABIT_EMOGE_EMPTY));
    if(!habitName)
        return res.send(response(baseResponse.HABIT_NAME_EMPTY));
    if (!contents)
        return res.send(response(baseResponse.HABIT_CONTENTS_EMPTY));


    //길이 체크
    if(emoge.length>1)
        return res.send(response(baseResponse.HABIT_EMOGE_LENGTH));
    if(habitName.length>20)
        return res.send(response(baseResponse.HABIT_NAME_LENGTH));
    if(contents.length>50)
        return res.send(response(baseResponse.HABIT_CONTENTS_LENGTH));

    const habitResponse = await habitService.createHabit(
        userIdx,
        habitName,
        contents,
        goodOrBad,
        emoge
    );

    return res.send(habitResponse);
}

/**
 * API No. 2
 * API Name : 습관 조회 API
 * [GET] /app/habits/:userIdx
 */

exports.getHabits = async function(req, res){

    const userId = req.params.userIdx;
    //습관 전체 조회
    const habitListResult = await habitProvider.retrieveHabitList(userId);
    if(!habitListResult)
        return res.send(response(baseResponse.HABIT_CONTENT_NULL));

    return res.send(response(baseResponse.SUCCESS,habitListResult));

}

/**
 * API No. 3
 * API Name : 특정 습관 조회 API
 * [GET] /app/habits/:userIdx/:habitIdx
 */

exports.getHabitById = async function(req,res){

    const habitId = req.params.habitIdx;
    const userId = req.params.userIdx;

    const habitByHabitId = await habitProvider.retrieveHabit(userId,habitId);
    if(!habitByHabitId)
        return res.send(response(baseResponse.HABIT_CONTENT_NULL));

    return res.send(response(baseResponse.SUCCESS, habitByHabitId));


}

/**
 * API No. 4
 * API Name : 습관 수정 API
 * [PATCH] /app/changeH/habits/:userIdx/:habitIdx
 */

exports.patchHabit = async function (req, res){

    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;
    const {habitName, contents, emoge} = req.body;
    //빈 값 체크
    if(!emoge)
        return res.send(response(baseResponse.HABIT_EMOGE_EMPTY));
    if(!habitName)
        return res.send(response(baseResponse.HABIT_NAME_EMPTY));
    if (!contents)
        return res.send(response(baseResponse.HABIT_CONTENTS_EMPTY));


    //길이 체크
    if(emoge.length>1)
        return res.send(response(baseResponse.HABIT_EMOGE_LENGTH));
    if(habitName.length>20)
        return res.send(response(baseResponse.HABIT_NAME_LENGTH));
    if(contents.length>50)
        return res.send(response(baseResponse.HABIT_CONTENTS_LENGTH));

    const editHabitInfo = await habitService.editHabit(userId,habitId,habitName, contents, emoge);
    return res.send(editHabitInfo);
}
/**
 * API No. 5
 * API Name : 습관 삭제 API
 * [PATCH] /app/habits/:userIdx/:habitIdx
 */

exports.deleteHabit = async function (req, res){

    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;

    const deleteHabit = await habitService.deleteHabit(userId,habitId);
    return res.send(deleteHabit);
}

/**
 * API No. 6
 * API Name : 습관 체크 API
 * [PATCH] /app/habits/check/:userIdx/:habitIdx
 */

exports.checkHabit = async function (req, res){

    const check = req.body;
    const userId = req.params.userIdx;
    const habitId = req.params.habitIdx;

    const habitDay = await habitProvider.getHabitDay(userId,habitId);
    const habitLife = await habitProvider.getHabitLife(userId,habitId);

    if(habitDay[0][0].habitDay<=0){ //습관 남은 일 수가 0일 때 처리하는 logic
        const achieveHabit = await habitService.achieveHabit(userId,habitId);
        return res.send(response(baseResponse.HABIT_ACHIEVEMENT_SUCCESS));
    }

    if(habitLife[0][0].life<=0){// life가 0이 되어 습관이 삭제되는 logic
        const deleteHabit =await habitService.deleteHabit(userId,habitId);
        return res.send(response(baseResponse.HABIT_DELETE_SUCCESS));
    }


    if(check.check){
        const checkHabit = await habitService.checkHabit(userId,habitId);
        return res.send(checkHabit);
    }else{
        const noCheckHabit = await habitService.noCheckHabit(userId,habitId);
        return res.send(noCheckHabit);
    }

}