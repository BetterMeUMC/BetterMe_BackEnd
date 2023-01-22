

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
async function selectHabit(connection,userId){

    const selectHabitListQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit
    WHERE userIdx = ?;`;
    const [habitRows] = await connection.query(selectHabitListQuery,userId);

    return habitRows;
}
//특정 습관 조회
async function selectHabitId(connection,selectHabitTBLParams){
    const selectHabitIdQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit
    WHERE userIdx = ? and habitIdx = ?;`;
    const [habitRow] = await connection.query(selectHabitIdQuery,selectHabitTBLParams);
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

async function checkHabit(connection,checkHabitTBLParams){
    const checkHabitQuery = `
    UPDATE habit
    SET habitDay = habitDay-1
    WHERE userIdx = ? AND habitIdx = ?; 
    `;

    const checkHabitRow = await connection.query(checkHabitQuery,checkHabitTBLParams);
    return checkHabitRow;
}

async function noCheckHabit(connection, noCheckHabitTBLParams){

    const noCheckHabitQuery = `
    UPDATE habit
    SET life = life - 1
    WHERE userIdx = ? AND habitIdx = ?;
    `;

    const noCheckHabitRow = await connection.query(noCheckHabitQuery,noCheckHabitTBLParams);
    return noCheckHabitRow;
}

async function getHabitDay(connection,getHabitDayTBLParams){

    const getHabitDayQuery = `
    SELECT habitDay
    FROM habit 
    WHERE userIdx = ? AND habitIdx = ? ;
    `;

    const getHabitDayRow = await connection.query(getHabitDayQuery,getHabitDayTBLParams);

    return getHabitDayRow;
}
module.exports= {
    insertHabit,
    selectHabit,
    selectHabitId,
    updateHabit,
    deleteHabit,
    checkHabit,
    noCheckHabit,
    getHabitDay,
};