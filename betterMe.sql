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
	`photo` text NULL,
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
		

