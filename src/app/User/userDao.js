// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickName 
                FROM UserTBL;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickName 
                FROM UserTBL 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT userIdx, email, nickName 
                 FROM UserTBL 
                 WHERE userIdx = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 생성
async function insertUser(connection, insertUserTBLParams) {
  
  const insertUserTBLQuery = `
        INSERT INTO UserTBL(email, pw, nickName, promise)
        VALUES (?, ?, ?, ?);
    `;
  const insertUserTBLRow = await connection.query(
    insertUserTBLQuery,
    insertUserTBLParams
  );

  return insertUserTBLRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickName, pw
        FROM UserTBL 
        WHERE email = ? AND pw = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT stat, userIdx
        FROM UserTBL 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUser(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserTBL 
  SET nickName = ?
  WHERE userIdx = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

async function updateUserP(connection, id, hashedPassword) {
  const updateUserPQuery = `
  UPDATE UserTBL 
  SET pw = ?
  WHERE userIdx = ?;`;
  const updateUserPRow = await connection.query(updateUserPQuery, [hashedPassword, id]);
  return updateUserPRow[0];
}

async function unregisterUser(connection, id) {
  const unregisterUserQuery = `
  UPDATE UserTBL 
  SET stat = 'D'
  WHERE userIdx = ?;`;
  const unregisterUserRow = await connection.query(unregisterUserQuery, [id]);
  return unregisterUserRow[0];
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  insertUser,
  selectUserPassword,
  selectUserAccount,
  updateUser,
  updateUserP,
  unregisterUser
};
