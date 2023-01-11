
//습관 생성
const {stringify} = require("nodemon/lib/utils");

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

async function selectHabit(connection){

    const selectHabitListQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit;`;
    const [habitRows] = await connection.query(selectHabitListQuery);

    return habitRows;
}

async function selectHabitId(connection,habitId){
    const selectHabitIdQuery = `
    SELECT userIdx, habitName, contents, life, habitDay, goodOrBad, emoge
    FROM habit
    WHERE habitIdx = ?;
`;
    const [habitRow] = await connection.query(selectHabitIdQuery, habitId);
    return habitRow;
}

async function updateHabit(connection,updateHabitTBLParams){
    const updateHabitQuery= `
    UPDATE habit
    SET habitName = ?, contents = ?, emoge = ?
    WHERE userIdx = ? and habitIdx = ?;`;

    const updateHabitRow = await connection.query(updateHabitQuery,updateHabitTBLParams);
    return updateHabitRow;

}
module.exports= {
    insertHabit,
    selectHabit,
    selectHabitId,
    updateHabit,
};