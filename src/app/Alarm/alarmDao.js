async function allAlarmOn(connection,userId){
    const allAlarmOnQuery= `
    UPDATE NotificationTBL
    SET habitCheckAlarm = 'ON',habitInviteAlarm = 'ON', FriendRequestAlarm = 'ON', FriendAwardAlarm = 'ON'
    WHERE userIdx = ?;`;

    const updateAllAlarmOn = await connection.query(allAlarmOnQuery,userId);
    return updateAllAlarmOn;

}

async function allAlarmOff(connection,userId){
    const allAlarmOffQuery= `
    UPDATE NotificationTBL
    SET habitCheckAlarm = 'OFF',habitInviteAlarm = 'OFF', FriendRequestAlarm = 'OFF', FriendAwardAlarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateAllAlarmOff = await connection.query(allAlarmOffQuery,userId);
    return updateAllAlarmOff;

}

async function habitCheckAlarmOn(connection,userId){

    const habitCheckAlarmOnQuery= `
    UPDATE NotificationTBL
    SET habitCheckAlarm = 'ON'
    WHERE userIdx = ?;`;

    const updateHabitCheckAlarmOn = await connection.query(habitCheckAlarmOnQuery,userId);
    return updateHabitCheckAlarmOn;
}

async function habitCheckAlarmOff(connection,userId){

    const habitCheckAlarmOffQuery= `
    UPDATE NotificationTBL
    SET habitCheckAlarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateHabitCheckAlarmOff = await connection.query(habitCheckAlarmOffQuery,userId);
    return updateHabitCheckAlarmOff;
}

async function habitInviteAlarmOn(connection,userId){

    const habitInviteAlarmOnQuery= `
    UPDATE NotificationTBL
    SET habitInviteAlarm = 'ON'
    WHERE userIdx = ?;`;

    const updateHabitInviteAlarmOn = await connection.query(habitInviteAlarmOnQuery,userId);
    return updateHabitInviteAlarmOn;
}

async function habitInviteAlarmOff(connection,userId){

    const habitInviteAlarmOffQuery= `
    UPDATE NotificationTBL
    SET habitInviteAlarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateHabitInviteAlarmOff = await connection.query(habitInviteAlarmOffQuery,userId);
    return updateHabitInviteAlarmOff;
}

async function friendRequestAlarmOn(connection,userId){

    const friendRequestAlarmOnQuery= `
    UPDATE NotificationTBL
    SET FriendRequestAlarm = 'ON'
    WHERE userIdx = ?;`;

    const updateFriendRequestAlarmOn = await connection.query(friendRequestAlarmOnQuery,userId);
    return updateFriendRequestAlarmOn;
}

async function friendRequestAlarmOff(connection,userId){

    const friendRequestAlarmOffQuery= `
    UPDATE NotificationTBL
    SET FriendRequestAlarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateFriendRequestAlarmOff = await connection.query(friendRequestAlarmOffQuery,userId);
    return updateFriendRequestAlarmOff;
}

async function friendAwardAlarmOn(connection,userId){

    const friendAwardAlarmOnQuery= `
    UPDATE NotificationTBL
    SET FriendAwardAlarm = 'ON'
    WHERE userIdx = ?;`;

    const updateFriendAwardAlarmOn = await connection.query(friendAwardAlarmOnQuery,userId);
    return updateFriendAwardAlarmOn;
}

async function friendAwardAlarmOff(connection,userId){

    const friendAwardAlarmOffQuery= `
    UPDATE NotificationTBL
    SET FriendAwardAlarm = 'OFF'
    WHERE userIdx = ?;`;

    const updateFriendAwardAlarmOff = await connection.query(friendAwardAlarmOffQuery,userId);
    return updateFriendAwardAlarmOff;
}

async function selectAlarm(connection,userId){

    const selectAlarmQuery = `
    SELECT habitCheckAlarm,habitInviteAlarm,FriendRequestAlarm,FriendAwardAlarm,HabitCheckTime 
    FROM NotificationTBL
    WHERE userIdx = ?;
    `;
    const selectAlarm = await connection.query(selectAlarmQuery,userId);
    return selectAlarm;
}
module.exports={
    allAlarmOn,
    allAlarmOff,
    habitCheckAlarmOn,
    habitCheckAlarmOff,
    habitInviteAlarmOn,
    habitInviteAlarmOff,
    friendRequestAlarmOn,
    friendRequestAlarmOff,
    friendAwardAlarmOn,
    friendAwardAlarmOff,
    selectAlarm,
};