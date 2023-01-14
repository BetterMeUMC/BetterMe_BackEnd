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


 module.exports = {
    selectAllFollowInfo,
    selectAllFollowStars,
 };