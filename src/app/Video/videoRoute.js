module.exports = function(app){
    const video = require('./videoController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 비디오 업로드 API
    app.post('/app/videos/upload', jwtMiddleware, video.uploadVideo);

    // 비디오를 카드형식으로 모두 가져오는 API
    app.get('/app/videos/card',video.getCards); 

    // 비디오를 상세형식으로 모두 가져오는 API
    app.get('/app/videos/detail',video.getDetails); 

    // 비디오 상세정보를 가져오는 API
    app.get('/app/videos/detail/:videoId', video.getDetailById);

    // 비디오 상세 정보를 수정하는 API
    app.patch('/app/videos/update/:videoId', jwtMiddleware, video.updateVideo);

    // 비디오를 삭제하는 API
    app.patch('/app/videos/delete/:videoId', jwtMiddleware, video.deleteVideo);

};
