const express = require("express");
const router = express.Router();
//const { Item } = require("../models");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const sauces = "hello" //  = await Item.findAll();
    res.json(sauces);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
