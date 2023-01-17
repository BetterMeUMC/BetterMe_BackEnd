

const {stringify} = require("nodemon/lib/utils");
//습관생성
async function insertHabit(connection, insertHabitTBLParams){
    const insertHabitTBLQuery = `
    INSERT INTO habit(userIdx, habitName, contents,goodOrBad,emoge)
    VALUES(?, ?, ?, ?, ?);
`;
    const insertHabitTBLRow = await connection.query(
        insertHabitTBLQuery,
        insertHabitTBLParams
    )

    return insertHabitTBLRow;
}
//습관 전체 조회
async function selectHabit(connection){

    const selectHabitListQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit;`;
    const [habitRows] = await connection.query(selectHabitListQuery);

    return habitRows;
}
//특정 습관 조회
async function selectHabitId(connection,habitId){
    const selectHabitIdQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit
    WHERE habitIdx = ?;
`;
    const [habitRow] = await connection.query(selectHabitIdQuery, habitId);
    return habitRow;
}
//습관 수정
async function updateHabit(connection,updateHabitTBLParams){
    const updateHabitQuery= `
    UPDATE habit
    SET habitName = ?, contents = ?, emoge = ?
    WHERE userIdx = ? and habitIdx = ?;`;

    const updateHabitRow = await connection.query(updateHabitQuery,updateHabitTBLParams);
    return updateHabitRow;

}
//습관 삭제
async function deleteHabit(connection,deleteHabitTBLParams){
    const deleteHabitQuery = `
    UPDATE habit
    SET stat = 0
    WHERE userIdx = ? and habitIdx = ?;`;

    const deleteHabitRow = await connection.query(deleteHabitQuery,deleteHabitTBLParams);
    return deleteHabitRow;

}

//습관 초대
async function inviteHabit(connection,inviteHabitTBLParams){
    const inviteHabitTBLQuery= `
    INSERT INTO habit_invite(habitIdx, senderIdx, receiverIdx)
    VALUES(?, ?, ?);
    `;
    
    const insertInviteHabitTBLRow = await connection.query(
        inviteHabitTBLQuery,
        inviteHabitTBLParams
    )

    return insertInviteHabitTBLRow;
}

//습관 초대 조회
async function selectHabitInvite(connection, userIdx){

    const selectHabitInviteQuery = `
    SELECT senderIdx, receiverIdx, habit.habitIdx, habitName, contents, emoge
    FROM habit_invite
    INNER JOIN habit ON habit_invite.habitIdx=habit.habitIdx
    WHERE receiverIdx= ? ;`;
    const [habitRows] = await connection.query(selectHabitInviteQuery, userIdx);

    return habitRows;
}

//습관 초대 응답 - 수락
async function acceptHabitInvite(connection, inviteHabitResponseParams){

    const acceptHabitInviteQuery = `
    UPDATE habit_invite
    SET status = 'A'
    WHERE receiverIdx = ? AND habitIdx = ?;`;
    const [habitRows] = await connection.query(acceptHabitInviteQuery, inviteHabitResponseParams);

    return habitRows;
}


//습관 초대 응답 - 거절
async function rejectHabitInvite(connection, inviteHabitResponseParams){

    const rejectHabitInviteQuery = `
    UPDATE habit_invite
    SET status = 'R'
    WHERE receiverIdx = ? AND habitIdx = ?;`;
    const [habitRows] = await connection.query(rejectHabitInviteQuery, inviteHabitResponseParams);

    return habitRows;
}

//습관 초대 응답 조회
async function selectHabitInviteResponse(connection, userIdx){

    const HabitInviteResponseQuery = `
    SELECT habitIdx, receiverIdx, status
    FROM habit_invite
    WHERE senderIdx= ? ;`;
    const [habitRows] = await connection.query(HabitInviteResponseQuery, userIdx);

    return habitRows;
}

module.exports= {
    insertHabit,
    selectHabit,
    selectHabitId,
    updateHabit,
    deleteHabit,
    inviteHabit,
    selectHabitInvite,
    acceptHabitInvite,
    rejectHabitInvite,
    selectHabitInviteResponse
};