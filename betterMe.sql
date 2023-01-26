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
	`status` VARCHAR(2) NOT NULL DEFAULT 'W' COMMENT 'W : 초대 요청 대기 상태
A  :  초대 승낙 상태
R : 초대 거절 상태'
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

-- 회원정보 입력
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('mimi@gmail.com', 'f7151aa2440939ce606b0ea0eaa7b4b043a9b2e911fe435251b88ab33cee43ab56903628e2e66594f1a857a0dd918ef65b005f602d584b4d37752c18df72cd0b', '미미', '난 할 수 있서.'); -- pw : mimimimi
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('cindy@gmail.com', 'ab42a55ab18fdc1abc1f6f6d91c1f0f76d31dc29a5f53967c19b05aee6769197a7e71a8330294b046f5a9ee0f77ce7bd95c8e8a594802594889da52b19af466b', '신디', '강신디 파이팅!'); -- pw : cindycindy
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('hyunni@gmail.com', '1ac48b07c121d14a801498655014e9af2953439a5986bf19820d91b0d6d38c4d2bb8fef8dd5bfeb7bbf17d0a183a98580258f9a93024fd3434196e37b763b7f5', '혀니', '전혀니 파이팅!'); -- pw : hyunnihyunni
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('poddy@gmail.com', 'f35d50b982323d6aabe6c72457ee3e12ead44d220c47169349787a3bdb7cd240e757773869838aafe0cda4901f8cc837555df1c56fb123c9cc735f76625ba6ea', '포디', '정포디 파이팅!'); -- pw : poddypoddy
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('junni@gmail.com', '69316ac12502d8ac8d75a20cf952ef8fdf66af650ee7babc7972e52b974bceb5572ecfe24f4a5bcd4d7a17fbf558f07da74d7c5400396a2349d6028a4309b829', '주니', '김주니 파이팅!'); -- pw : junnijunni