const phraseProvider = require("./phraseProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getAPhrase = async function (req, res) {

    const APhrase = await phraseProvider.getPhrase();
    if (APhrase == undefined) return res.send(response(baseResponse.BASIC_PHRASE, "변화는 느리게 일어난다. 그러나 확실하게 일어난다."));
    else return res.send(response(baseResponse.SUCCESS, APhrase));
};