const asyncHandler = require("express-async-handler");
const validUrl = require("valid-url");
const User = require("../models/user");
const ShortURLStore = require("../models/shortUrl");
const { generateUniqueName } = require("../utils/generateUniqueName");
const baseURL = process.env.BASE_URL;

module.exports.createShortUrl = asyncHandler(async (req, res) => {
    const { originalUrl, uniqueName } = req.body;
    const { _id } = req.user;
    try {
        if (!validUrl.isUri(originalUrl)) {
            return res.status(401).json({ message: "Invalid Url" });
        }

        if (uniqueName) {
            const existingName = await ShortURLStore.findOne({ short: uniqueName });
            if (existingName) {
                return res.status(400).json({ message: `Unique Name ${uniqueName} already in use. Please choose a different name.` });
            }
        }

        const existingShortUrl = await ShortURLStore.findOne({ fullUrl: originalUrl });
        if (existingShortUrl && !uniqueName) {
            return res.status(404).json({ message: 'URL already exist\'s' });
        }

        let generatedName;
        if (!uniqueName) {
            generatedName =await generateUniqueName();
        }
        else {
            generatedName = uniqueName;
        }
        const shortUrl = `${baseURL}/short/${generatedName}`;
        const newUrl = await ShortURLStore.create({
            short: generatedName,
            shortUrl,
            fullUrl: originalUrl
        });
        await newUrl.save();
        await User.findByIdAndUpdate(_id, { $push: { shortUrls: newUrl._id } });
        res.status(200).json(newUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...");
    }
});

module.exports.referUrl = asyncHandler(async (req, res) => {
    try {
        const { unique } = req.params;
        const url = await ShortURLStore.findOne({ short: unique });
        if (url) {
            url.clicks += 1;
            await url.save();
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({message:'No URL Found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...");
    }
});

module.exports.getAllUrls = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id).populate('shortUrls');
        res.status(200).json(user.shortUrls);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong...");
    }
})