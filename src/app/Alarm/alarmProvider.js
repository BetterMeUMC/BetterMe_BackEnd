const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const alarmDao = require("./alarmDao");
const habitDao = require("../Habit/habitDao");
const baseResponseStatus = require("../../../config/baseResponseStatus");


exports.alarmShow= async function(userIdx){

    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const alarmResult = await alarmDao.selectAlarm(connection, userIdx);

        connection.release();

        return alarmResult[0];
    }catch(err){
        logger.error(`App - alarmShow Service error\n: ${err.message}`);
        return errResponse(baseResponseStatus.DB_ERROR);
    }

}