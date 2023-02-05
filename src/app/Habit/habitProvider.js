const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const habitDao = require("./habitDao");

exports.retrieveHabitList = async function (){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitListResult = await habitDao.selectHabit(connection);
    connection.release();

    return habitListResult;
}

exports.retrieveHabit = async function(habitId){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitResult = await habitDao.selectHabitId(connection, habitId);

    connection.release();

    return habitResult;
}

exports.retrieveHabitInvite = async function(userIdx){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitInviteResult = await habitDao.selectHabitInvite(connection, userIdx);

    connection.release();

    return habitInviteResult;
}

exports.retrieveHabitInviteResponse = async function(userIdx){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitInviteResult = await habitDao.selectHabitInviteResponse(connection, userIdx);

    connection.release();

    return habitInviteResult;
}