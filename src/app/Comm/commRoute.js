module.exports = function(app){
    const comm = require('./commController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 비디오에 댓글을 다는 API
    app.post('/app/comms/create/:videoId', jwtMiddleware, comm.uploadComments);

    // 전체 댓글 조회 API
    app.get('/app/comms',comm.getComments); 

    // 비디오 ID를 주면 달린 댓글을 가져오는 API
    app.get('/app/comms/:videoId',comm.getCommentsByVideoID); 

    //특정 댓글 조회 API
    app.get('/app/comms/:commId', comm.getCommById);

    // 비디오에 댓글을 수정하는 API
    app.patch('/app/comms/update/:commId', jwtMiddleware, comm.updateComm);

    // 비디오에 댓글을 삭제하는 API
    app.patch('/app/comms/delete/:commId', jwtMiddleware, comm.deleteComm);

};