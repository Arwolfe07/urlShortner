const express = require("express");
const { createShortUrl, referUrl, getAllUrls, deleteUrl } = require("../controllers/urlController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create',protect, createShortUrl);
router.get('/redirect/:unique', referUrl);
router.get('/all',protect, getAllUrls);
router.delete('/delete/:urlId',protect, deleteUrl)

module.exports = router;