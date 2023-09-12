const router = require("express").Router();
const passport = require("passport");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");

router.get("/auth/me", isAuthenticated, (req, res) => {
  const { googleId, ...info } = req.user._doc;
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
router.get("/auth/logout", (req, res) => {
  // Clear the session and destroy the session object
  req.session = null;
  res.clearCookie("session");
  res.clearCookie("session.sig");
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully" });
});

// for checking

// for checking
router.get("/", (req, res) => {
  res.send("KNGofWRD server");
});

module.exports = router;
