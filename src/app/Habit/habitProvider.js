const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const habitDao = require("./habitDao");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

exports.retrieveHabitList = async function (userId){
    try{

        const connection = await pool.getConnection(async (conn) => conn);
        const habitListResult = await habitDao.selectHabit(connection,userId);
        connection.release();

        return habitListResult;
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.retrieveHabit = async function(userId,habitId){

    try {
        const selectHabitInfoParams = [userId, habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const habitResult = await habitDao.selectHabitId(connection, selectHabitInfoParams);

        connection.release();

        return habitResult;
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}



exports.getHabitDay = async function(userId,habitId){

    try {
        const getHabitDayInfoParams = [userId, habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const habitDayResult = await habitDao.getHabitDay(connection, getHabitDayInfoParams);

        connection.release();

        return habitDayResult;
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getHabitLife = async function(userId,habitId){

    try{
        const getHabitLifeInfoParams = [userId, habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const habitLifeResult = await habitDao.getHabitLife(connection, getHabitLifeInfoParams);

        connection.release();

        return habitLifeResult;
    }catch(err){
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }


}