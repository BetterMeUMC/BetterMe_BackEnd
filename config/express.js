const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());

    app.use('/images',express.static('/home/ubuntu/BetterMe_BackEnd/images'));
    // app.use(express.static(process.cwd() + '/public'));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/User/userRoute')(app);
    require('../src/app/Video/videoRoute')(app);
    require('../src/app/Comm/commRoute')(app);
    // require('../src/app/Board/boardRoute')(app);
    require('../src/app/Habit/habitRoute')(app);
    require('../src/app/Follow/followRoute')(app);
    require('../src/app/Phrase/phraseRoute')(app);
    require('../src/app/Feedback/feedbackRoute')(app);
    require('../src/app/Alarm/alarmRoute')(app);

    return app;
};