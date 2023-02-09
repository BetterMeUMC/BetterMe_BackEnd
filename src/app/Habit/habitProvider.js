const baseResponseStatus = require("../../../config/baseResponseStatus");
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

    try{    
        const connection = await pool.getConnection(async (conn) => conn);
        const habitInviteResult = await habitDao.selectHabitInvite(connection, userIdx);
            
        connection.release();
    
        //조회된 습관 초대가 없는 경우
        if (!habitInviteResult) {
            return res.send(baseResponseStatus.HABIT_CONTENT_NULL);
        }
    
        return habitInviteResult;
    }catch(err){
        logger.error(`App - retrieveHabitInvite Service error\n: ${err.message}`);
        return errResponse(baseResponseStatus.DB_ERROR);
    }

}

exports.retrieveHabitInviteResponse = async function(userIdx){

    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const habitInviteResult = await habitDao.selectHabitInviteResponse(connection, userIdx);

        connection.release();

        return habitInviteResult;
    }catch(err)
    {
        logger.error(`App - retrieveHabitInviteResponse Service error\n: ${err.message}`);
        return errResponse(baseResponseStatus.DB_ERROR);
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
        return errResponse(baseResponseStatus.DB_ERROR);
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
        return errResponse(baseResponseStatus.DB_ERROR);
    }


}
