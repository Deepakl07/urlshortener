const express = require('express');
const { handleGenerateNewShortURL } = require("../controllers/url");

const router = express.Router();

// Define the POST route for /url
router.post("/", handleGenerateNewShortURL);



module.exports = router;
