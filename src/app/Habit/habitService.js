const {pool} = require("../../../config/database");
const habitDao = require("../Habit/habitDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");


exports.createHabit = async function(userIdx, habitName, contents, goodOrBad, emoge){
    try {
        const insertHabitInfoParams = [userIdx, habitName, contents, goodOrBad,emoge];

        const connection = await pool.getConnection(async (conn) => conn);

        const habitResult = await habitDao.insertHabit(connection, insertHabitInfoParams);


        connection.release();
        return response(baseResponse.HABIT_CREATE_SUCCESS);
    }
    catch(err){
        logger.error(`App - createHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.editHabit=async function(userId,habitId,habitName, contents, emoge){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const editHabitResult = await habitDao.updateHabit(connection,userId,habitId,habitName, contents, emoge);
        connection.release();

        return response(baseResponse.SUCCESS);
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}