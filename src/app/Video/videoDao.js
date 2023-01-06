
async function selectVideoCardsByAlign(connection) {
    const selectVideoCardsQuery = `
    select VideoTBL.thumbnailPic, VideoTBL.videoName, VideoTBL.isStreaming, VideoTBL.runtime,					
    UserTBL.profilePic, UserTBL.nickName, (					
        select count(*)				
        from PlayListVideoTBL				
        where listIdx in (				
            select listIdx from PlayListTBL where sort = 'W'			
        ) and videoIdx = VideoTBL.videoIdx				
    )	as viewNum,				
    (TIMESTAMPDIFF(Minute, VideoTBL.createdAt, now())) as ago					
                        
    from UserTBL, VideoTBL					
    where UserTBL.userIdx = VideoTBL.creatorID;					
                  `;
    const [videoCardRows] = await connection.query(selectVideoCardsQuery);
    return videoCardRows;
  }
  

  async function selectVideoCardsByPopular(connection) {
    const selectVideoCardsByPopQuery = `
    select VideoTBL.thumbnailPic, VideoTBL.videoName, VideoTBL.isStreaming, VideoTBL.runtime,					
    UserTBL.profilePic, UserTBL.nickName, (					
        select count(*)				
        from PlayListVideoTBL				
        where listIdx in (				
            select listIdx from PlayListTBL where sort = 'W'			
        ) and videoIdx = VideoTBL.videoIdx				
    )	as viewNum,				
    (TIMESTAMPDIFF(Minute, VideoTBL.createdAt, now())) as ago					
                        
    from UserTBL, VideoTBL					
    where UserTBL.userIdx = VideoTBL.creatorID
    ORDER BY viewNum DESC;				
                  `;
    const [videoCardByPopRows] = await connection.query(selectVideoCardsByPopQuery);
    return videoCardByPopRows;
  }

  async function selectVideoDetailsByAlign(connection) {
    const selectVideoDetailsQuery = `
    select VideoTBL.thumbnailPic, VideoTBL.videoName, VideoTBL.hashtag1, VideoTBL.hashtag2, VideoTBL.hashtag3, VideoTBL.dscrp, VideoTBL.creatorID, VideoTBL.videoURL, VideoTBL.createdAt, VideoTBL.updatedAt, VideoTBL.stat, VideoTBL.privateType, VideoTBL.isStreaming, VideoTBL.runtime,					
    UserTBL.profilePic, UserTBL.nickName, (					
        select count(*)				
        from PlayListVideoTBL				
        where listIdx in (				
            select listIdx from PlayListTBL where sort = 'W'			
        ) and videoIdx = VideoTBL.videoIdx				
    )	as viewNum,				
    (TIMESTAMPDIFF(Minute, VideoTBL.createdAt, now())) as ago					
                        
    from UserTBL, VideoTBL					
    where UserTBL.userIdx = VideoTBL.creatorID;					
                  `;
    const [videoDetailRows] = await connection.query(selectVideoDetailsQuery);
    return videoDetailRows;
  }
  

  async function selectVideoDetailsByPopular(connection) {
    const selectVideoDetailsByPopQuery = `
    select VideoTBL.thumbnailPic, VideoTBL.videoName, VideoTBL.hashtag1, VideoTBL.hashtag2, VideoTBL.hashtag3, VideoTBL.dscrp, VideoTBL.creatorID, VideoTBL.videoURL, VideoTBL.createdAt, VideoTBL.updatedAt, VideoTBL.stat, VideoTBL.privateType, VideoTBL.isStreaming, VideoTBL.runtime,					
    UserTBL.profilePic, UserTBL.nickName, (					
        select count(*)				
        from PlayListVideoTBL				
        where listIdx in (				
            select listIdx from PlayListTBL where sort = 'W'			
        ) and videoIdx = VideoTBL.videoIdx				
    )	as viewNum,				
    (TIMESTAMPDIFF(Minute, VideoTBL.createdAt, now())) as ago					
                        
    from UserTBL, VideoTBL					
    where UserTBL.userIdx = VideoTBL.creatorID
    ORDER BY viewNum DESC;				
                  `;
    const [videoDetailByPopRows] = await connection.query(selectVideoDetailsByPopQuery);
    return videoDetailByPopRows;
  }


  async function selectVideoId(connection, videoId) {
    const selectVideoDetailQuery = `
    select VideoTBL.thumbnailPic, VideoTBL.videoName, VideoTBL.hashtag1, VideoTBL.hashtag2, VideoTBL.hashtag3, VideoTBL.dscrp, VideoTBL.creatorID, VideoTBL.videoURL, VideoTBL.createdAt, VideoTBL.updatedAt, VideoTBL.stat, VideoTBL.privateType, VideoTBL.isStreaming, VideoTBL.runtime,					
    UserTBL.profilePic, UserTBL.nickName, (					
        select count(*)				
        from PlayListVideoTBL				
        where listIdx in (				
            select listIdx from PlayListTBL where sort = 'W'			
        ) and videoIdx = VideoTBL.videoIdx				
    )	as viewNum,				
    (TIMESTAMPDIFF(Minute, VideoTBL.createdAt, now())) as ago					
                        
    from UserTBL, VideoTBL					
    where UserTBL.userIdx = VideoTBL.creatorID and VideoTBL.videoIdx = ?;				
                  `;
    const [videoDetailRows] = await connection.query(selectVideoDetailQuery, videoId);
    return videoDetailRows;
  }


  async function selectCreatorId(connection, videoId) {
    const selectCreatorIdQuery = `
                   SELECT creatorID 
                   FROM VideoTBL 
                   WHERE videoIdx = ?;
                   `;
    const [creatorRow] = await connection.query(selectCreatorIdQuery, videoId);
    return creatorRow;
  }
  
  
  
  // 비디오 생성
  async function insertVideo(connection, insertVideoTBLParams) {
    //console.log("agasgag : "+insertVideoTBLParams[0]);

    const insertVideoTBLQuery = `
          INSERT INTO VideoTBL(creatorID, thumbnailPic, videoName, isStreaming,dscrp, videoURL, privateType,  runtime)
          VALUES (?,?,?,?,?,?,?,?);
      `;

    const insertVideoTBLRow = await connection.query(
      insertVideoTBLQuery,
      insertVideoTBLParams
    );

    return insertVideoTBLRow;
  }
  
  
  
  async function updateVideo(connection, videoId, dscrp) {
    const updateVideoQuery = `
    UPDATE VideoTBL 
    SET dscrp = ?
    WHERE videoIdx = ?;`;
    const updateVideoRow = await connection.query(updateVideoQuery, [dscrp, videoId]);
    return updateVideoRow[0];
  }
  
  async function deleteVideo(connection, videoId) {
    const deleteVideoQuery = `
    UPDATE VideoTBL 
    SET stat = 'D'
    WHERE videoIdx = ?;`;
    const deleteVideoRow = await connection.query(deleteVideoQuery, [videoId]);
    return deleteVideoRow[0];
  }
  
  
  module.exports = {
    selectVideoCardsByAlign,
    selectVideoCardsByPopular,
    selectVideoDetailsByPopular,
    selectVideoDetailsByAlign,
    selectVideoId,
    selectCreatorId,
    insertVideo,
    updateVideo,
    deleteVideo
  };