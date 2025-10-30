const createHttpError = require("http-errors");
// CHANGE 1: Import 'jsonwebtoken'
const jwt = require("jsonwebtoken");
// CHANGE 2: Import your 'config' file
const config = require("../config/config");
// CHANGE 3: Import your 'User' model
const User = require("../modals/userModal");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      const error = createHttpError(401, "please provide token!");
      return next(error);
    }

    // These lines will now work
    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      const error = createHttpError(401, "User not exist!");
      return next(error);
    }
    req.user = user;
    return next();
  } catch (error) {
    const err = createHttpError(401, "Invalid Tokens!");
    return next(err);
  }
};

module.exports = { isVerifiedUser };