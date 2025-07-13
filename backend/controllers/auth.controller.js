import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const otpStore = new Map();

const generateToken = (userId) => {
  jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "90d",
    }
  );
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  console.log(`Sending OTP ${otp} to ${email}`);

  // create testAccount on ethereal
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${testAccount.user}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Preview URL:", previewUrl);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP required" });

  const storedOtp = otpStore.get(email);
  if (!storedOtp)
    return res.status(400).json({ message: "No OTP found for this email" });

  if (storedOtp !== otp)
    return res.status(401).json({ message: "Invalid OTP" });

  res.status(200).json({ message: "OTP verified" });
};

const checkUsername = async (req, res) => {
  const { username } = req.query;
  console.log(username);

  if (!username || username.trim() === "")
    return res.status(400).json({ message: "Username is required" });

  const exists = await User.exists({ username: username.toLowerCase() });

  console.log(!exists);

  res.status(200).json({ available: !exists });
};

const finishSignup = async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, username, password: hashed });

    const token = generateToken(user._id);
    res.status(200).json({ message: "User created successfully", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

const standardLogin = async (req, res) => {
  try {
    const { emailorusername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailorusername }, { username: emailorusername }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export {
  checkUsername,
  finishSignup,
  otpStore,
  sendOTP,
  standardLogin,
  verifyOTP,
};
