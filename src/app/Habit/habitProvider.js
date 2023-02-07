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

    const connection = await pool.getConnection(async (conn) => conn);
    const habitResult = await habitDao.selectHabitId(connection, userId,habitId);

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
