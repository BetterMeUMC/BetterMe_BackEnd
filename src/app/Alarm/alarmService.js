const {pool} = require("../../../config/database");
const alarmDao = require("../Alarm/alarmDao");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const {logger} = require("../../../config/winston");