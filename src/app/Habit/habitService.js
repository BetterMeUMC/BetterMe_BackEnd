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
        const updateHabitInfoParams = [habitName,contents,emoge,userId,habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const editHabitResult = await habitDao.updateHabit(connection,updateHabitInfoParams);
        connection.release();

        return response(baseResponse.HABIT_UPDATE_SUCCESS);
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.deleteHabit=async function(userId,habitId){
    try{
        const deleteHabitInfoParams = [userId,habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteHabitResult = await habitDao.deleteHabit(connection,deleteHabitInfoParams);
        connection.release();

        return response(baseResponse.HABIT_DELETE_SUCCESS);
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}