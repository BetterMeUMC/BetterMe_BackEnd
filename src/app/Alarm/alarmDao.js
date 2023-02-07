async function allAlarmOn(connection,userId){
    const allAlarmOnQuery= `
    UPDATE notification
    SET habitCheck_alarm = 'ON',habitInvite_alarm = 'ON', friendRequest_alarm = 'ON', friendAward_alarm = 'ON'
    WHERE userIdx = ?;`;

    const updateAllAlarmOn = await connection.query(allAlarmOnQuery,userId);
    return updateAllAlarmOn;

}

async function allAlarmOff(connection,userId){
    const allAlarmOffQuery= `
    UPDATE notification
    SET habitCheck_alarm = 'OFF',habitInvite_alarm = 'OFF', friendRequest_alarm = 'OFF', friendAward_alarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateAllAlarmOff = await connection.query(allAlarmOffQuery,userId);
    return updateAllAlarmOff;

}

async function habitCheckAlarmOn(connection,userId){

    const habitCheckAlarmOnQuery= `
    UPDATE notification
    SET habitCheck_alarm = 'ON'
    WHERE userIdx = ?;`;

    const updateHabitCheckAlarmOn = await connection.query(habitCheckAlarmOnQuery,userId);
    return updateHabitCheckAlarmOn;
}

async function habitCheckAlarmOff(connection,userId){

    const habitCheckAlarmOffQuery= `
    UPDATE notification
    SET habitCheck_alarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateHabitCheckAlarmOff = await connection.query(habitCheckAlarmOffQuery,userId);
    return updateHabitCheckAlarmOff;
}

module.exports={
    allAlarmOn,
    allAlarmOff,
    habitCheckAlarmOn,
    habitCheckAlarmOff,
};