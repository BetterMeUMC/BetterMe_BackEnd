const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const secret_config = require("../../../config/secret");
const {response, errResponse} = require("../../../config/response");

const sendgrid = require('@sendgrid/mail');
const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const fetch = require('node-fetch');

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
//exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, nickName, promise} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if (!nickName)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if (!promise)
        return res.send(response(baseResponse.SIGNUP_PROMISE_EMPTY));

    // 길이 체크
    if (email.length > 50)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    if ((password.length < 6)||(password.length > 20))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    if (nickName.length > 10)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
    if (promise.length > 30)
        return res.send(response(baseResponse.SIGNUP_PROMISE_LENGTH));
       
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        nickName,
        promise
    );
    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};

exports.getUserByEmail = async function (req, res) {

    const userEm = req.query.email;

    if (!userEm) return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));

    const userByUserEm = await userProvider.emailCheck(userEm);

    if (userByUserEm == undefined) {
        return res.send(response(baseResponse.SIGNUP_EMAIL_CHECK_SUCCESS));
    }
    else{
        return res.send(response(baseResponse.SIGNUP_REDUNDANT_EMAIL));
    }
};

exports.getUserByNname = async function (req, res) {

    /**
     * query params: nickName
     */
    const userNN = req.query.nickName;

    if (!userNN) return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));

    const userByUserNN = await userProvider.nickNameCheck(userNN);
    if (userByUserNN.num == 0)return res.send(response(baseResponse.SIGNUP_NICKNAME_CHECK_SUCCESS));
    else return res.send(response(baseResponse.SIGNUP_REDUNDANT_NICKNAME));
};

exports.getUserInfoByEmail = async function (req, res) {

    const userEm = req.params.userEmail;

    const userByUserEm = await userProvider.emailCheck(userEm);
    if (!userByUserEm) return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    return res.send(response(baseResponse.SUCCESS, userByUserEm));

};



// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // email, password 형식적 Validation
    if (!email)
        return res.send(response(baseResponse.SIGNIN_EMAIL_EMPTY));
    if (!password)
        return res.send(response(baseResponse.SIGNIN_PASSWORD_EMPTY));
    
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNIN_EMAIL_LENGTH));
    if ((password.length < 6)||(password.length > 20))
        return res.send(response(baseResponse.SIGNIN_PASSWORD_LENGTH));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const userId = req.params.userIdx;
    const nickname = req.body.nickName;


    if (!userId)
        return res.send(response(baseResponse.USER_IDX_EMPTY));
    if (!nickname)
        return res.send(response(baseResponse.USER_NICKNAME_EMPTY));

    // 길이 체크
    if (nickname.length > 10)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};

exports.patchUsersP = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const userId = req.params.userIdx;
    const password = req.body.password;

    if (!userId)
        return res.send(response(baseResponse.USER_IDX_EMPTY));
    if (!password)
        return res.send(response(baseResponse.USER_PASSWORD_EMPTY));
    
    if ((password.length < 6)||(password.length > 20))
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editUserInfoP = await userService.editUserP(userId, password)
        return res.send(editUserInfoP);
    }
};

exports.patchUsersPm = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const userId = req.params.userIdx;
    const promise = req.body.promise;
    if (!userId)
        return res.send(response(baseResponse.USER_IDX_EMPTY));
    if (!promise)
        return res.send(response(baseResponse.SIGNUP_PROMISE_EMPTY));

    if (promise.length > 30)
        return res.send(response(baseResponse.SIGNUP_PROMISE_LENGTH));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editUserInfoPm = await userService.editUserPm(userId, promise)
        return res.send(editUserInfoPm);
    }
};

exports.getUserMyPageInfo = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const userId = req.params.userIdx;
    const promise = req.body.promise;

    if (!userId)
        return res.send(response(baseResponse.USER_IDX_EMPTY));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getUserMyPage = await userProvider.getUserMyPage(userId);
        return res.send(response(baseResponse.SUCCESS, getUserMyPage));
    }
};

exports.unregisterUsers = async function (req, res) {

    // jwt - userId, path variable :userId
    
    const userIdFromJWT = req.verifiedToken.userIdx;
    const userId = req.params.userIdx;

    if (!userId)
        return res.send(response(baseResponse.USER_IDX_EMPTY));
        
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const unregisterUser = await userService.unregisterUser(userId);
        return res.send(unregisterUser);
    }
};


exports.issuePw = async function (req, res) {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY || secret_config.betterme_sendgrid);

    const userId = req.params.userIdx;
    const userEmail = req.body.userEmail;

    const temporaryPw = Math.random().toString(36).slice(2);

    const editTemporaryP = await userService.sendEmail(userId, temporaryPw);

    async function sendTemporaryPw() {
        try { 
            
            await sendgrid.send({
            to: userEmail,
            from: "TEAM.betterMe.habit@gmail.com",
            subject: "BetterMe 임시 비밀번호를 전송드립니다.",
            text:`
            안녕하세요.
            BetterMe 서비스를 이용해주셔서 감사합니다.
            BetterMe 임시 비밀번호를 전송드립니다.
            임시 비밀번호 : ${temporaryPw}
            
            감사합니다.`,
            });

        } catch(err) {
            logger.error(`App - sendEmail Controller error\n: ${err.message}`);
            return errResponse(baseResponse.SENDGRID_ERROR);
        }
       
    }
    
    sendTemporaryPw();

    return res.send(editTemporaryP);

};

exports.updatePhoto = async function (req,res){


    const userId = req.params.userIdx;
    const profile = `/home/ubuntu/BetterMe_BackEnd/images/${req.file.originalname}`;
    //const profile = `Better_Me/images/${req.file.originalname}`;
    const userIdFromJWT = req.verifiedToken.userIdx;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    }
    else{
        const updateUserPhoto = await userService.updateUserPhoto(userId,profile);
        return res.send(updateUserPhoto);
    }

}





/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userIdx;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};


exports.kakaoLogin = async function (req, res) {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
      client_id: "d50460c60f16a2e42cd8add38c7f76ae",
      redirect_uri: "https://localhost:3000/app/auth/kakao-login/callback",
      response_type: "code",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl);
  };

exports.callbackKakaoLogin = async function (req, res) {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
        grant_type: "authorization_code",
        client_id: "d50460c60f16a2e42cd8add38c7f76ae",
        redirect_uri: "https://localhost:3000/app/auth/kakao-login/callback",
        code: req.query.code,
        // client_secret: "",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);

    const kakaoTokenRequest = await fetch(finalUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json", 
        },
      });
      const json = await kakaoTokenRequest.json();
      console.log(json);
      res.send(JSON.stringify(json));
  };
