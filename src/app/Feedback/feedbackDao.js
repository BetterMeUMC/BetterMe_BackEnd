 // 1. 피드백 작성
 async function insertFeedback(connection, feedbackParams) {
    const insertFeedbackQuery = `
        INSERT INTO feedback (title, content)
        VALUES (?, ?);
        `;
    
    const [feedbackInfoRows] = await connection.query(insertFeedbackQuery, feedbackParams);

    return feedbackInfoRows;
 }

 module.exports = {
    insertFeedback,
 };