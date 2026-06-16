const express = require("express");
const router = express.Router();

const {
  login,
  logout,
} = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("AUTH OK");
});

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;