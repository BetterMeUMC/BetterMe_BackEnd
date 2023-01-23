/*better me sql */
DROP database IF EXISTS `BetterMeDB`;
CREATE database BetterMeDB;
use BetterMeDB;

DROP TABLE IF EXISTS `habit`;

CREATE TABLE `habit` (
	`habitIdx`	BIGINT	NOT NULL,
	`userIdx`	BIGINT	NOT NULL	COMMENT 'auto increase',
	`habitName`	VARCHAR(20)	NOT NULL,
	`contents`	VARCHAR(50)	NOT NULL	COMMENT '글자 수 제한',
	`life`	INT(3)	NOT NULL	DEFAULT 3	COMMENT '습관을 안 할 때마다 줄어들게 한다.',
	`habitDay`	INT(31)	NOT NULL	DEFAULT 30,
	`goodOrBad`	VARCHAR(4)	NOT NULL	COMMENT 'Good or Bad',
	`isAchieved`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '성취 : 1 , 성취 x :0',
	`emoge`	CHAR(1)	NOT NULL,
	`createdAt`	TIMESTAMP	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	TIMESTAMP	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`stat`	TINYINT	NOT NULL	DEFAULT 1	COMMENT '존재 :1 , 존재 x  : 0'
);

DROP TABLE IF EXISTS `habit_invite`;

CREATE TABLE `habit_invite` (
	`inviteIdx`	BIGINT	NOT NULL 	COMMENT 'auto increase',
	`habitIdx`	BIGINT	NOT NULL,
	`senderIdx`	BIGINT	NOT NULL,
	`receiverIdx`	BIGINT	NOT NULL,
	`status`	VARCHAR(2)	NOT NULL	DEFAULT 'W'	COMMENT 'W : 초대 요청 대기 상태
A  :  초대 승낙 상태
R : 초대 거절 상태'
);

DROP TABLE IF EXISTS `UserTBL`;

CREATE TABLE `UserTBL` (
	`userIdx`	BIGINT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`email`	text	NOT NULL,
	`pw`	varchar(300)	NOT NULL,
	`nickName`	varchar(10)	NOT NULL,
	`promise`	varchar(30)	NOT NULL,
	`token`	text	NULL	COMMENT '로그인시 사용',
	`photo`	text	NULL,
	`createdAt`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`updatedAt`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `follow`;

CREATE TABLE `follow` (
	`followIdx`	BIGINT	NOT NULL	COMMENT 'auto increase',
	`follower`	BIGINT	NOT NULL	COMMENT 'auto increase',
	`followee`	BIGINT	NOT NULL	COMMENT 'auto increase',
	`acceptStatus`	TINYINT	NOT NULL	DEFAULT 0	COMMENT '대기: 0,수락: 1',
	`followedAt`	TIMESTAMP	NOT NULL	DEFAULT CURRENT_TIMESTAMP
	`acceptedAt` TIMESTAMP	NULL	ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `habit` ADD CONSTRAINT `PK_HABIT` PRIMARY KEY (
	`habitIdx`
);

ALTER TABLE `habit_invite` ADD CONSTRAINT `PK_HABIT_INVITE` PRIMARY KEY (
	`inviteIdx`
);

ALTER TABLE `follow` ADD CONSTRAINT `PK_FOLLOW` PRIMARY KEY (
	`followIdx`
);


-- 회원정보 입력
INSERT INTO UserTBL(email, pw, nickName, promise) VALUES ('mimi@gmail.com', 'f7151aa2440939ce606b0ea0eaa7b4b043a9b2e911fe435251b88ab33cee43ab56903628e2e66594f1a857a0dd918ef65b005f602d584b4d37752c18df72cd0b', '미미', '난 할 수 있서.');