const passport = require('passport');

module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const  multer  = require('../../../config/multer');


    // 0. 테스트 API
    //app.get('/app/test', user.getTest)


    // 1. 유저 생성 (회원가입) API
    app.post('/app/auth/register', user.postUsers);

    app.get('/app/users/checkEmail', user.getUserByEmail);
    app.get('/app/users/checkNName', user.getUserByNname);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users',user.getUsers); 

    // 3. 특정 유저 조회 API
    app.get('/app/users/get_id/:userId', user.getUserById);
    app.get('/app/users/get_email/:userEmail', user.getUserInfoByEmail);


    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/auth/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users/changeN/:userIdx', jwtMiddleware, user.patchUsers);

    app.patch('/app/users/changePw/:userIdx', jwtMiddleware, user.patchUsersP);

    app.patch('/app/users/changePm/:userIdx', jwtMiddleware, user.patchUsersPm);

    // 마이페이지 회원정보 불러오기
    app.get('/app/users/getMyPage/:userIdx', jwtMiddleware, user.getUserMyPageInfo);

    // 임시 비밀번호 발급 API
    app.patch('/app/users/issuedPw/:userIdx', user.issuePw)


    // 자동로그인 API (JWT 검증 및 Payload 내뱉기)
    // JWT 검증 API
    app.get('/app/auth/auto-login', jwtMiddleware, user.check);

    // TODO: 탈퇴하기 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.delete('/app/auth/unregister/:userIdx', jwtMiddleware, user.unregisterUsers);



    //이미지 업로드
    app.patch('/app/users/upload/:userIdx',jwtMiddleware,multer.single('profile'), user.updatePhoto);

    // 소셜 로그인 API
    // 카카오 로그인
    app.get('/app/auth/kakao-login', user.kakaoLogin);
    app.get('/app/auth/kakao-login/callback', user.callbackKakaoLogin);
};
