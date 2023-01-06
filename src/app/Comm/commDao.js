async function selectComms(connection) {
    const selectCommsQuery = `
    select * 
    from VideoCommTBL					
    ;					
    `;
    const [commRows] = await connection.query(selectCommsQuery);
    return commRows;
  }


  async function selectCommId(connection, commId) {
    const selectCommQuery = `
    select * 
    from VideoCommTBL
    where commIdx = ?				
    ;				
                  `;
    const [commByIDRows] = await connection.query(selectCommQuery, commId);
    return commByIDRows;
  }

  async function selectCommByVideoId(connection, videoId) {
    const selectCommQuery = `
    select * 
    from VideoCommTBL
    where videoID = ?				
    ;				
                  `;
    const [commByIDRows] = await connection.query(selectCommQuery, videoId);
    return commByIDRows;
  }

  async function selectCreatorId(connection, commId) {
    const selectCreatorIdQuery = `
                   SELECT creatorID 
                   FROM VideoCommTBL
                   WHERE commIdx = ?;
                   `;
    const [creatorRow] = await connection.query(selectCreatorIdQuery, commId);
    return creatorRow;
  }
  
  
  
  async function insertComm(connection, insertCommTBLParams) {
    const insertCommTBLQuery = `
          INSERT INTO VideoCommTBL(isParent, content, creatorID, videoID)
          VALUES (?,?,?,?);
      `;

    const insertCommTBLRow = await connection.query(
      insertCommTBLQuery,
      insertCommTBLParams
    );

    return insertCommTBLRow;
  }
  
  

  async function updateComm(connection, commId, content) {
    const updateCommQuery = `
    UPDATE VideoCommTBL
    SET content = ?
    WHERE commIdx = ?;`;
    const updateCommRow = await connection.query(updateCommQuery, [content, commId]);
    return updateCommRow[0];
  }
  
  async function deleteComm(connection, commId) {
    const deleteCommQuery = `
    UPDATE VideoCommTBL
    SET stat = 'D'
    WHERE commIdx = ?;`;
    const deleteCommRow = await connection.query(deleteCommQuery, [commId]);
    return deleteCommRow[0];
  }
  
  
  module.exports = {
    selectComms,
    selectCommId,
    selectCreatorId,
    insertComm,
    selectCommByVideoId,
    updateComm,
    deleteComm
  };