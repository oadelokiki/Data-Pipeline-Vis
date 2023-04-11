const express = require("express");
const router = express.Router();
const pipeline = require('./pipeline');

// different model routers

router.use('/pipeline', pipeline);

module.exports = router;
~                            


