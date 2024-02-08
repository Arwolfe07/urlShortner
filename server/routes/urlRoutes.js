const express = require("express");
const { createShortUrl, referUrl, getAllUrls } = require("../controllers/urlController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create',protect, createShortUrl);
router.get('/redirect/:unique', referUrl);
router.get('/all',protect, getAllUrls);

module.exports = router;