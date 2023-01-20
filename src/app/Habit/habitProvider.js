const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const habitDao = require("./habitDao");

exports.retrieveHabitList = async function (userId){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitListResult = await habitDao.selectHabit(connection,userId);
    connection.release();

    return habitListResult;
}

exports.retrieveHabit = async function(userId,habitId){

    const selectHabitInfoParams = [userId,habitId];
    const connection = await pool.getConnection(async (conn) => conn);
    const habitResult = await habitDao.selectHabitId(connection,selectHabitInfoParams);

    connection.release();

    return habitResult;
}

//exports.retrieveHabitDay = async function()