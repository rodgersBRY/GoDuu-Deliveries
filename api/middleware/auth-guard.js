const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    const error = new Error("No headers received!");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[0];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    next(err);
  }

  if (!decodedToken) {
    const error = new Error("Unauthorized Operation!");
    error.statusCode = 401;
    throw error;
  }

  // store the userId inside the request
  req.userId = decodedToken.userId;
  next();
};
