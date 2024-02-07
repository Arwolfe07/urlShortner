
const random = require("randomstring");
const ShortURLStore = require("../models/shortUrl");
const asyncHandler = require("express-async-handler");

module.exports.generateUniqueName = asyncHandler(async (req, res) => {
    let name;
    while (true) {
        name = random.generate({length: 6, charset: 'alphabetic'}) // generate a random string of length 6
        const isExist = await ShortURLStore.findOne({ short: name });
        if (!isExist) break;
    }
    return name;
});