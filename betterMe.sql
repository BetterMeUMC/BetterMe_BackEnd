/*better me sql */
DROP database IF EXISTS `BetterMeDB`;
CREATE database BetterMeDB;
use BetterMeDB;

DROP TABLE IF EXISTS `habit`;


CREATE TABLE `habit` (
	`habitIdx` BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`userIdx` BIGINT NOT NULL,	
	`habitName` VARCHAR(20) NOT NULL,
	`contents` VARCHAR(50) NOT NULL, 
	`life` INT(3) NOT NULL DEFAULT 3 COMMENT '습관을 안 할 때마다 줄어들게 한다.',
	`habitDay` INT(31) NOT NULL DEFAULT 30,
	`goodOrBad` VARCHAR(4) NOT NULL COMMENT 'Good or Bad',
	`isAchieved` TINYINT NOT NULL DEFAULT 0 COMMENT '성취 : 1 , 성취 x :0',
	`emoge` CHAR(1) NOT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`stat` TINYINT NOT NULL DEFAULT 1 COMMENT '존재 :1 , 존재 x  : 0'
);

DROP TABLE IF EXISTS `habit_invite`;

CREATE TABLE `habit_invite` (
	`inviteIdx` BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`habitIdx` BIGINT NOT NULL,
	`senderIdx` BIGINT NOT NULL,
	`receiverIdx` BIGINT NOT NULL,
	`status` VARCHAR(2) NOT NULL DEFAULT 'W'
);

DROP TABLE IF EXISTS `UserTBL`;

CREATE TABLE `UserTBL` (
	`userIdx` BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`email` text NOT NULL,
	`pw` varchar(300) NOT NULL,
	`nickName` varchar(10) NOT NULL,
	`promise` varchar(30) NOT NULL,
	`token` text NULL COMMENT '로그인시 사용',
	`photo` text NULL PRIMARY KEY 'http://54.180.13.219:3000/images/account.png',
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `follow`;

CREATE TABLE `follow` (
	`followIdx` BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`follower` BIGINT NOT NULL,	
	`followee` BIGINT NOT NULL,	
	`acceptStatus` TINYINT NOT NULL DEFAULT 0 COMMENT '대기: 0, 수락: 1',
	`followedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`acceptedAt` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `PhraseTBL`;
CREATE TABLE `PhraseTBL`
(
    `phraseIdx` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    `content` VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
	`feedbackIdx` BIGINT PRIMARY KEY AUTO_INCREMENT,
	`title` VARCHAR(100) NOT NULL,
	`content` TEXT NOT NULL
);
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
    `notificationIdx`	BIGINT	NOT NULL PRIMARY KEY COMMENT 'auto increase',
    `userIdx`	BIGINT	NOT NULL	COMMENT 'auto increase',
    `habitCheck_alarm`	VARCHAR(4)	NOT NULL	DEFAULT 'OFF'	COMMENT '활성 : ON, 비활성: OFF',
    `habitInvite_alarm`	VARCHAR(4)	NOT NULL	DEFAULT 'OFF'	COMMENT '활성 : ON, 비활성: OFF',
    `friendRequest_alarm`	VARCHAR(4)	NOT NULL	DEFAULT 'OFF'	COMMENT '활성 : ON, 비활성: OFF',
    `friendAward_alarm`	VARCHAR(4)	NOT NULL	DEFAULT 'OFF'	COMMENT '활성 : ON, 비활성: OFF',
    `habitCheck_time`	TIMESTAMP	NULL
);


-- foreign key 추가
ALTER TABLE `habit` ADD CONSTRAINT `FK_UserTBL_TO_habit_1` FOREIGN KEY (`userIdx`) REFERENCES `UserTBL` (`userIdx`);

ALTER TABLE `habit_invite` ADD CONSTRAINT `FK_habit_TO_habit_invite_1` FOREIGN KEY (`habitIdx`)
REFERENCES `habit` (`habitIdx`);

ALTER TABLE `habit_invite` ADD CONSTRAINT `FK_UserTBL_TO_habit_invite_1` FOREIGN KEY (`senderIdx`)
REFERENCES `UserTBL` (`userIdx`);

ALTER TABLE `habit_invite` ADD CONSTRAINT `FK_UserTBL_TO_habit_invite_2` FOREIGN KEY (`receiverIdx`)
REFERENCES `UserTBL` (`userIdx`);

ALTER TABLE `follow` ADD CONSTRAINT `FK_UserTBL_TO_follow_1` FOREIGN KEY (`follower`)
 REFERENCES `UserTBL` (`userIdx`);

ALTER TABLE `follow` ADD CONSTRAINT `FK_UserTBL_TO_follow_2` FOREIGN KEY (`followee`)
REFERENCES `UserTBL` (`userIdx`);

ALTER TABLE `notification` ADD CONSTRAINT `FK_UserTBL_TO_notification_1` FOREIGN KEY (`userIdx`)
REFERENCES `UserTBL` (`userIdx`);

-- 회원정보 입력
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('mimi@gmail.com', 'f7151aa2440939ce606b0ea0eaa7b4b043a9b2e911fe435251b88ab33cee43ab56903628e2e66594f1a857a0dd918ef65b005f602d584b4d37752c18df72cd0b', '미미', '난 할 수 있서.'); -- pw : mimimimi
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('cindy@gmail.com', 'ab42a55ab18fdc1abc1f6f6d91c1f0f76d31dc29a5f53967c19b05aee6769197a7e71a8330294b046f5a9ee0f77ce7bd95c8e8a594802594889da52b19af466b', '신디', '강신디 파이팅!'); -- pw : cindycindy
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('hyunni@gmail.com', '1ac48b07c121d14a801498655014e9af2953439a5986bf19820d91b0d6d38c4d2bb8fef8dd5bfeb7bbf17d0a183a98580258f9a93024fd3434196e37b763b7f5', '혀니', '전혀니 파이팅!'); -- pw : hyunnihyunni
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('poddy@gmail.com', 'f35d50b982323d6aabe6c72457ee3e12ead44d220c47169349787a3bdb7cd240e757773869838aafe0cda4901f8cc837555df1c56fb123c9cc735f76625ba6ea', '포디', '정포디 파이팅!'); -- pw : poddypoddy
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('junni@gmail.com', '69316ac12502d8ac8d75a20cf952ef8fdf66af650ee7babc7972e52b974bceb5572ecfe24f4a5bcd4d7a17fbf558f07da74d7c5400396a2349d6028a4309b829', '주니', '김주니 파이팅!'); -- pw : junnijunni


-- 습관 데이터 입력
INSERT INTO `habit` VALUES (1,1,'자전거','한강 다녀오기',1,0,'good',1,'g','2023-01-10 08:47:45','2023-01-10 08:47:45',1),
                           (2,1,'책읽기','하루 30분',3,30,'good',0,'g','2023-01-10 08:48:01','2023-01-10 08:48:01',1),
                           (3,1,'명상','하루 5분',0,25,'good',0,'m','2023-01-10 08:48:12','2023-01-10 08:48:12',0),
                           (4,1,'시간낭비 하지 않기','스마트폰 1시간 이상 사용 X',3,30,'bad',0,'b','2023-01-10 08:49:28','2023-01-10 08:49:28',1),
                           (5,1,'영어공부','토익',3,30,'good',0,'b','2023-01-11 05:00:02','2023-01-11 05:00:02',1);
			   
-- 습관 초대 입력
INSERT INTO habit_invite(habitIdx, senderIdx, receiverIdx)
	VALUES 	(1, 1, 2),
		(2, 1, 3),
		(3, 1, 2),
		(4, 1, 5),
		(4, 1, 3),
		(5, 1, 4);


-- 명언 입력
INSERT INTO PhraseTBL (content) VALUES ('노력을 중단하는 것보다 더 위험한 것은 없다. 습관은 버리기는 쉽지만, 다시 들이기는 어렵다. -빅토르 마리 위고 ');
INSERT INTO PhraseTBL (content) VALUES ('습관이란 인간으로 하여금 어떤 일이든지 하게 만든다. -도스토예프스키 ');
INSERT INTO PhraseTBL (content) VALUES ('처음에는 사람이 습관을 만들지만 나중에는 습관이 사람을 만든다. - 아리스토 텔레스');
INSERT INTO PhraseTBL (content) VALUES ('일상을 바꾸기 전에는 삶을 변화시킬 수 없다. 성공의 비밀은 자기 일상에 있다. - 존 맥스웰');
INSERT INTO PhraseTBL (content) VALUES ("승자가 즐겨쓰는 말은 '다시 한번 해보자'이고 패자가 즐겨쓰는 말은 '해봐야 별 수 없다'이다. - 탈무드");


-- 팔로우 입력
INSERT INTO follow(follower, followee, acceptStatus, followedAt, acceptedAt)	VALUES 	(1, 2, 0, '2023-01-10 08:47:45', NULL),
																						(2, 1, 1, '2023-01-10 08:47:45', NULL),
																						(1, 4, 2, '2023-01-27 21:58:28', '2023-01-27 22:38:08'),
																						(4, 1, 2, '2023-01-27 21:58:28', '2023-01-27 22:38:08'),
																						(3, 5, 2, '2023-01-31 03:20:06', '2023-02-01 06:03:22'),
																						(5, 3, 2, '2023-01-31 03:20:06', '2023-02-01 06:03:22');

																						
																						
-- 피드백 입력
INSERT INTO feedback (title, content) VALUES ('구글 플레이스토어 출시 문의', '안녕하세요. 안드로이드 유저도 사용하고 싶습니다. 구글플레이스토어에도 런칭해주시면 좋겠어요.');
INSERT INTO feedback (title, content) VALUES ('습관 초대 에러 고쳐주세요', '습관 초대 버튼을 눌렀는데 친구에게 초대 요청이 오지 않았다고 합니다. 확인 부탁드립니다.');
INSERT INTO feedback (title, content) VALUES ('게시판이 있으면 좋겠어요', 'Better Me 잘 사용하고 있습니다. 추가되면 좋을 것 같은 기능 제안드립니다. 전체 유저를 대상으로 습관을 검색할 수 있는 기능이 있으면 나와 비슷한 습관을 가진 사용자들을 만나볼 수 있어서 좋을 것 같습니다. 감사합니다.');
INSERT INTO feedback (title, content) VALUES ('상장 실물 출력 관련', '안녕하세요. 혹시 Better Me에서 얻은 상장을 실물로 출력해서 배포해도 괜찮나요?');
INSERT INTO feedback (title, content) VALUES ('실수로 습관을 삭제했어요', '잘 기록하던 습관을 실수로 삭제했는데 복구할 방법 없을까요? ㅠㅠ');


-- 7일이상 수락하지 않은 초대 삭제
DELIMITER $$
CREATE PROCEDURE select_timediff_invite()
BEGIN
	delete from habit_invite where DATE_ADD(createdAt, INTERVAL 7 DAY) < CURRENT_DATE  and status = 'W';
END $$
DELIMITER ;

CREATE EVENT IF NOT EXISTS rejectWaitedInvites
    ON SCHEDULE
		EVERY 1 DAY
    ON COMPLETION PRESERVE
    ENABLE
    COMMENT '7일 이상 수락하지 않은 초대를 삭제합니다.'
    DO 
    CALL select_timediff_invite();



