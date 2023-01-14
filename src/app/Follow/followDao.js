 // 1. 친구 전체 조회 
 async function selectAllFollowInfo(connection, follower) {
    const selectAllFollowInfoQuery = `
        SELECT follow.followee, UserTBL.nickName, UserTBL.photo
        FROM UserTBL, follow
        WHERE UserTBL.userIdx = follow.followee
            AND follow.follower = ?;
        `;
    
    const [followInfoRows] = await connection.query(selectAllFollowInfoQuery, follower);

    return followInfoRows;
 }
 
 async function selectAllFollowStars(connection, userIdx) {
    const selectAllFollowStarsQuery = `
        SELECT count(if(isAchieved=1, 1, NULL)) stars
        FROM habit
        WHERE userIdx = ?;
    `;
    
    const [followStarRows] = await connection.query(selectAllFollowStarsQuery, userIdx);

    return followStarRows;
 }

  // 2. 친구 상세 조회
  async function selectFollowDetailInfo(connection, userIdx) {
    const selectFollowDetailInfoQuery = `
        SELECT userIdx, nickName, photo, promise
        FROM UserTBL
        WHERE userIdx = ?;
    `;
    
    const [followDetailInfoRows] = await connection.query(selectFollowDetailInfoQuery, userIdx);

    return followDetailInfoRows;
 }

 async function selectFollowDetailAwards(connection, userIdx) {
    const selectFollowDetailAwardsQuery = `
        SELECT habitName, contents, goodOrBad, emoge, createdAt
        FROM habit
        WHERE isAchieved = 1
            AND userIdx = ?;    
    `;
    
    const [followDetailAwardRows] = await connection.query(selectFollowDetailAwardsQuery, userIdx);

    return followDetailAwardRows;
 }



 module.exports = {
    selectAllFollowInfo,
    selectAllFollowStars,
    selectFollowDetailInfo,
    selectFollowDetailAwards,
 };