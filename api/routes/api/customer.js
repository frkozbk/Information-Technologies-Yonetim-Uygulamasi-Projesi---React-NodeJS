const router = require("express").Router();
const passport = require("passport");
const Order = require("../../models/Order");

router.post(
  "/makeorder",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { tableName, order } = req.body;

    const newOrder = new Order({
      tableName,
      order
    });
    newOrder.save();
    return res.status(200).json({ success: "Şiparişiniz alındı." });
  }
);

module.exports = router;
