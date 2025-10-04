import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //destructure value given by user
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(200).json({
      message: "All Credential is Required",
    });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "User Already Exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    //user detaile is ready to store data base
    user = {
      name,
      email,
      password: hashpassword,
    };

    //create OTP using math function
    // const otp = Math.floor(Math.random() * 10000);
    const otp = Math.floor(1000 + Math.random() * 9000);


    //create activaton token using jwt
    const activatonToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "5m" }
    );

    console.log(activatonToken);

    const data = {
      name,
      otp,
    };

    console.log(otp);

    return res.status(200).json({
      message: "OTP Send to Your Mail",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Send OTP",
    });
  }
};

export const verifyUser = async (req, res) => {
  const { otp, activationToken } = req.body;

  if (!otp || !activationToken) {
    return res.status(400).json({ 
        message: "All credentials are required" 
    });
  }

  try {
    const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    if (verify.otp != otp) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    });

    return res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error("Verification Error: ", error);
    return res.status(500).json({
      message: "User Verification Failed. Token might be expired or invalid.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required",
    });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User Doesn't Exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    console.error("Login Error: ", error);
    return res.status(500).json({
      message: "Login Failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('authToken', '', { expires: new Date(0), httpOnly: true });

    return res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to log out",
    });
  }
};