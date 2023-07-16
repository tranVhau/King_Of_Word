const router = require("express").Router();
const passport = require("passport");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");

router.get("/auth/me", isAuthenticated, (req, res) => {
  const { googleId, _id, ...info } = req.user._doc;
  res.status(200).json({ data: info });
});

// request for permission and info code
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// request for the infor following info code above
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: `${process.env.CLIENT_URL}/FlashCards`,
    failureRedirect: "/login/failed",
  })
);

//logout
router.get("/auth/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "logout successfully" });
  });
});

module.exports = router;
