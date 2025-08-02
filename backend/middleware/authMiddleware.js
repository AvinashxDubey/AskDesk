const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }
  next();
};

const isAgent = (req, res, next) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({ message: "Forbidden: Agent access only" });
  }
  next();
};

module.exports = { authToken, isAdmin, isAgent };