const router = require("express").Router();
const passport = require("passport");
const Order = require("../../models/Order");
var mongoose = require("mongoose");

router.get(
  "/getOrder",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Order.find({ isSent: false })
      .sort({ date: -1 })
      .then(order => res.status(200).json(order))
      .catch(err => res.status(404).json(err));
  }
);
router.post(
  "/closeOrder",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const orders = [...req.body.orders];
    console.log(orders);
    console.log(Array.isArray(orders));
    try {
      orders.forEach(async id => {
        console.log(id);
        Order.findOneAndUpdate(
          { _id: id },
          { $set: { isSent: true } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log(err);
            }
            console.log(doc);
          }
        );
      });
      return res.status(200).json({ succes: "Şiparişler yollandı" });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);
module.exports = router;
