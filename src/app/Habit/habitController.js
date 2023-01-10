const jwtMiddleware = require("../../../config/jwtMiddleware");
const habitProvider = require("./habitProvider");
const habitService = require("./habitService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 습관 생성 API
 * [POST] /app/habits
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