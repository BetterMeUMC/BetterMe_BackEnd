const {pool} = require("../../../config/database");
const habitDao = require("../Habit/habitDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");


exports.createHabit = async function(userIdx, habitName, contents, goodOrBad, emoge){
    try {
        const insertHabitInfoParams = [userIdx, habitName, contents, goodOrBad, emoge];

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
        logger.error(`App - editHabit Service error\n: ${err.message}`);
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
        logger.error(`App - deleteHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.inviteHabit=async function(habitIdx, senderIdx, receiverIdx){
    try{
        const checkRedundantInviteParams = [habitIdx, receiverIdx];
        const inviteHabitParams = [habitIdx, senderIdx, receiverIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        // 중복 초대 확인
        const getinviteHabitResult = await habitDao.selectSendHabitInvite(connection, checkRedundantInviteParams);
        if( getinviteHabitResult.length > 1){
            return errResponse(baseResponse.HABIT_REDUNDANT_INVITE);
        }

        const inviteHabitResult = await habitDao.inviteHabit(connection, inviteHabitParams);


        connection.release();
        return response(baseResponse.HABIT_INVITE_SUCCESS);

    }catch(err){
        logger.error(`App - inviteHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.acceptInviteHabit=async function(userIdx, habitIdx){
    try{
        const inviteHabitResponseParams = [userIdx, habitIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const inviteHabitResponseResult = await habitDao.acceptHabitInvite(connection, inviteHabitResponseParams);


        connection.release();
        return response(baseResponse.HABIT_INVITE_ACCEPT_SUCCESS);

    }catch(err){
        logger.error(`App - acceptInviteHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.rejectInviteHabit=async function(userIdx, habitIdx){
    try{
        const inviteHabitResponseParams = [userIdx, habitIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const inviteHabitResponseResult = await habitDao.rejectHabitInvite(connection, inviteHabitResponseParams);


        connection.release();
        return response(baseResponse.HABIT_INVITE_REJECT_SUCCESS);

    }catch(err){
        logger.error(`App - rejectInviteHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}



exports.checkHabit = async function(userId,habitId){
    try{
        const checkHabitInfoParams = [userId,habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const checkHabitResult = await habitDao.checkHabit(connection,checkHabitInfoParams);
        connection.release();

        return response(baseResponse.HABIT_CHECK_SUCCESS);

    }catch(err){
        logger.error(`App - checkHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.noCheckHabit = async function(userId,habitId){
    try{
        const noCheckHabitInfoParams = [userId,habitId];
        const connection = await pool.getConnection(async (conn) => conn);
        const noCheckHabitResult = await habitDao.noCheckHabit(connection,noCheckHabitInfoParams);
        connection.release();

        return response(baseResponse.HABIT_NOCHECK_SUCCESS);

    }catch(err){
        logger.error(`App - noCheckHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.achieveHabit = async function(userId,habitId){
    try{
        const achieveHabitInfoParams = [userId,habitId];
        const connection = await pool.getConnection(async (conn) =>conn);
        const achieveHabitResult = await habitDao.achieveHabit(connection,achieveHabitInfoParams);
        connection.release();

        return response(baseResponse.HABIT_ACHIEVEMENT_SUCCESS);
    }catch(err){
        logger.error(`App - achieveHabit Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}