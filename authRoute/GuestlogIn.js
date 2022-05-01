const router = require("express").Router();
const bcrypt = require("bcrypt");
const { GuestAuth } = require("../Schema/GuestAuthSchema");
const jwt = require("jsonwebtoken");

router.route("/").post((req, res) => {
  const logUser = req.body;

  GuestAuth.findOne({ email: logUser.email })
    .then((doc, err) => {
      if (err)
        res.status(400).json({
          isUserLoggedIn: false,
          isCorrectPassword: false,
          isNetworkError: true,
        });
      else if (doc) {
        const tokenData = { doc, date: new Date() };
        bcrypt.compare(logUser.password, doc.password, (error, result) => {
          if (result) {
            const token = jwt.sign(tokenData, process.env.SECRECT);
            res
              .cookie("auth", token, {
                maxAge: 1000 * 60 * 600,
                sameSite: "none",
              })
              .json({
                isUserLoggedIn: true,
                isCorrectPassword: true,
                isCorrectUser: true,
              });
          } else
            res
              .status(400)
              .json({ isUserLoggedIn: false, isCorrectPassword: false });
        });
      } else {
        res.status(400).json({ isUserLoggedIn: false, isCorrectPassword: false, isCorrectUser: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ isUserLoggedIn: false, isNetworkError: true });
    });
});

module.exports = router;