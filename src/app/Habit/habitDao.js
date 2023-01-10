
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
module.exports= {
    insertHabit,
};