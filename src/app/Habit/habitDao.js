

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
module.exports= {
    insertHabit,
    selectHabit,
    selectHabitId,
    updateHabit,
    deleteHabit,
};