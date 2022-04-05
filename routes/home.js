const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send("Hello there! We have genres for you!");
});

module.exports = router;
