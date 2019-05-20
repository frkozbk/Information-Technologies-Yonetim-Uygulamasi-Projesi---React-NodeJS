const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User Model
const User = require("../../models/User");
//Validation
const validateLoginInput = require("../../validation/user");
const validateRegisterInput = require("../../validation/register");
/** ! ! ! ! ! ! ! ! */
/**
 * @Router GET api/user/test
 * @Desc User routune unu test eder
 * @Access Public
 */
router.get("/test", (req, res) =>
  User.findOne().then(user => res.status(200).json({ succes: user }))
);
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ tableName: req.body.tableName })
    .then(user => {
      if (user) {
        errors.tableName = "Masa ismi zaten kullanılmaktadır.";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          tableName: req.body.tableName,

          password: req.body.password,
          password: req.body.password2,
          isAdmin: req.body.isAdmin
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => {
      errors.unknown = err;
      return res.status(400).json(errors);
    });
});
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const tableName = req.body.tableName;
  const password = req.body.password;
  console.log(tableName);
  User.findOne({ tableName })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "Masa bulunamadı" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Kullanıcının şifresi doğru
          const payload = {
            id: user._id,
            name: user.tableName,
            isAdmin: user.isAdmin
          };

          // Token ver
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                succes: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ error: "Şifre Yanlış" });
        }
      });
    })
    .catch(err => {
      return res.status(400).json({ error: err });
    });
});
module.exports = router;
