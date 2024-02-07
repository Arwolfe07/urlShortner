const express = require("express");
const { createShortUrl, referUrl } = require("../controllers/urlController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create',protect, createShortUrl);
router.get('/redirect/:unique', referUrl);

module.exports = router;