const {pool} = require("../../../config/database");
const userDao = require("../Habit/habitDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");


exports.createHabit = async function(habitName, contents, goodOrBad, emoge){
    try {
        const insertHabitInfoParams = [habitName, contents, goodOrBad,emoge];

        const connection = await pool.getConnection(async (conn) => conn);

        const habitResult = await userDao.insertHabit(connection, insertHabitInfoParams);

        console.log(`추가된 습관: ${habitResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - createHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}