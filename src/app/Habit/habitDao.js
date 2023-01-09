
//습관 생성
async function insertHabit(connection, insertHabitTBLParams){
    const insertHabitTBLQuery = `
    INSERT INTO habit(habitName, contents,goodOrBad,emoge)
    VALUES(?, ?, ?, ?);
`;
    const insertHabitTBLRow = await connection.query(
        insertHabitTBLQuery,
        insertHabitTBLParams
    )
    return insertHabitTBLRow;
}
module.exports= {
    insertHabit,
};