module.exports = function(app){
    const phrase = require('./phraseController');

    app.get('/app/phrase/getOne', phrase.getAPhrase);
};
