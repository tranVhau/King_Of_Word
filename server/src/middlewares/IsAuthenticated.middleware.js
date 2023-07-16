const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthenticated" });
  }
  next();
};

module.exports = { isAuthenticated };
