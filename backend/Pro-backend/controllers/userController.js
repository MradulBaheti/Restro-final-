const createHttpError = require("http-errors");
const User = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "All fields are required");
      return next(error); // <-- FIX: Added 'return'
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(400, "User already exists!");
      return next(error); // <-- FIX: Added 'return'
    }

    // Your model is hashing the password, which is correct
    const user = { name, phone, email, password, role };
    const newUser = new User(user);
    await newUser.save();
    
    res
      .status(201)
      .json({ success: true, message: "New User created!", data: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = createHttpError(400, "All fields required");
      return next(error); // <-- FIX: Added 'return'
    }

    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      const error = createHttpError(401, "Invalid Credentials");
      return next(error); // <-- FIX: Added 'return'
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      const error = createHttpError(401, "Invalid Credentials");
      return next(error); // <-- FIX: This was the main error
    }

    const accessToken = jwt.sign(
      { _id: userLogin._id },
      config.accessTokenSecret,
      {
        expiresIn: "1d"
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: config.nodeEnv === "production" ? "none" : "lax",
    });

    res
      .status(200)
      .json({
        success: true,
        message: "User login successfull!",
        data: userLogin
      });
  } catch (error) {
    next(error);
  }
};

const getUserData=async(req,res,next)=>{
try {
  const user=await User.findById(req.user._id);
  res.status(200).json({success:true,data:user});
  
} catch (error) {
   return  next(error);
}
}

const logout=async (req,res,next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({success:true,message:"User Logged out successfully"});
  } catch (error) {
    next(error);
  }
  
}

module.exports = { register, login,getUserData,logout };