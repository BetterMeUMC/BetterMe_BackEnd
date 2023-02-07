module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    HABIT_CREATE_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 생성 성공"},
    HABIT_UPDATE_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 변경 성공"},
    HABIT_DELETE_SUCCESS : {"isSuccess" :true, "code" : 201, "message" : "습관 삭제 성공"},

    HABIT_INVITE_SUCCESS: {"isSuccess" :true, "code" : 201, "message" : "습관 초대 성공"},
    HABIT_INVITE_ACCEPT_SUCCESS: {"isSuccess" :true, "code" : 201, "message" : "습관 초대 수락 성공"},
    HABIT_INVITE_REJECT_SUCCESS: {"isSuccess" :true, "code" : 201, "message" : "습관 초대 거절 성공"},

    HABIT_CHECK_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 체크 성공"},
    HABIT_NOCHECK_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 체크x 성공"},
    HABIT_ACHIEVEMENT_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 성취 성공"},

    ALL_ALARM_ON_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "전체 알람 ON 성공"},
    ALL_ALARM_OFF_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "전체 알람 OFF 성공"},
    HABIT_CHECK_ALARM_ON_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 체크 알람 ON 성공"},
    HABIT_CHECK_ALARM_OFF_SUCCESS : {"isSuccess" : true, "code" : 201, "message" : "습관 체크 알람 OFF 성공"},

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 10자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },
    SIGNIN_PASSWORD_LENGTH : { "isSuccess": false, "code": 2012, "message":"비밀번호는 6~20자리를 입력해주세요." },

    SIGNUP_PROMISE_EMPTY: { "isSuccess": false,"code": 2037,"message":"한줄다짐을 입력해주세요." },
    SIGNUP_PROMISE_LENGTH: { "isSuccess": false,"code": 2038,"message":"한줄다짐은 30자 이내로 입력해주세요." },
    
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },
    USER_PASSWORD_EMPTY : { "isSuccess": false, "code": 2018, "message": "변경할 비밀번호 값을 입력해주세요" },
    USER_IDX_EMPTY : { "isSuccess": false, "code": 2030, "message": "유저 인덱스를 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2027, "message": "회원 상태값을 입력해주세요" },

    COMM_ISPARENT_EMPTY : {"isSuccess": false, "code": 2028, "message":"대댓글 여부를 입력해주세요" },
    COMM_CONTENT_EMPTY : {"isSuccess": false, "code": 2029, "message":"내용을 입력해주세요" },
    COMM_ID_EMPTY : {"isSuccess": false, "code": 2030, "message":"댓글 ID를 입력해주세요" },

    HABIT_EMOGE_EMPTY : {"isSuccess" : false, "code": 2031, "message": "이모지를 선택해주세요"},
    HABIT_NAME_EMPTY : {"isSuccess" : false, "code": 2032, "message" : "습관명을 입력해주세요"},
    HABIT_CONTENTS_EMPTY : {"isSuccess" : false, "code" : 2033, "message" : "내용을 입력해주세요"},

    HABIT_EMOGE_LENGTH:{"isSuccess" : false, "code" : 2034, "message" : "이모지는 한개만 선택해주세요"},
    HABIT_NAME_LENGTH : {"isSuccess" : false, "code" : 2035, "message" : "길이는 20 이하로 설정해주세요"},

    HABIT_CONTENTS_LENGTH : {"isSuccess" : false, "code" : 2036, "message" : "길이는 50 이하로 설정해주세요"},


    FOLLOW_WRONG_REQUEST: {"isSuccess": false, "code": 2039, "message":"잘못된 요청 값입니다." },
    FOLLOW_USER_NOT_EXIST: {"isSuccess": false, "code": 2040, "message":"검색 결과가 없습니다." },
    FOLLOW_EMAIL_NOT_EXIST: {"isSuccess": false, "code": 2041, "message":"이메일 검색 결과가 없습니다." },
    FOLLOW_REQUEST_NOT_EXIST: {"isSuccess": false, "code": 2042, "message":"친구 신청 이력이 없습니다." },
    HABIT_ID_EMPTY :  {"isSuccess" : false, "code" : 2043, "message" : "습관 ID를 입력해주세요"},
    FOLLOW_NICKNAME_EMPTY: {"isSuccess": false, "code": 2044, "message":"검색할 닉네임을 입력해주세요." },
    FOLLOW_EMAIL_EMPTY: {"isSuccess": false, "code": 2045, "message":"검색할 이메일을 입력해주세요." },

    FEEDBACK_NO_TITLE : {"isSuccess" : false, "code" : 2044, "message" : "제목을 입력해주세요."},
    FEEDBACK_NO_CONTENT : {"isSuccess" : false, "code" : 2045, "message" : "내용을 입력해주세요."},

    BASIC_PHRASE: {"isSuccess": false, "code": 7000, "message":"DB에 등록된 명언문구가 없어 기본 문구를 return합니다." },

    


    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"이미 등록된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },
    SIGNUP_EMAIL_CHECK_SUCCESS : { "isSuccess": true, "code": 3007, "message":"등록가능한 이메일입니다." },
    SIGNUP_NICKNAME_CHECK_SUCCESS : { "isSuccess": true, "code": 3008, "message":"사용가능한 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "등록되지않은 이메일입니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },


    HABIT_REDUNDANT_INVITE : { "isSuccess": false, "code": 3007, "message":"이미 초대된 습관입니다." },
    HABIT_CONTENT_NULL : {"isSuccess" : false, "code" : 3007, "message" : "조회되는 습관이 없습니다."},



    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
