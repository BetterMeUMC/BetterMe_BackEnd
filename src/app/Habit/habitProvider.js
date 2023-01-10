const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const habitDao = require("./habitDao");

exports.retrieveHabitList = async function (email){

    const connection = await pool.getConnection(async (conn) => conn);
    const habitListResult = await habitDao.selectHabit(connection);
    connection.release();

    return habitListResult;
}