const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/generateOTP");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exist = await User.findOne({ email: normalizedEmail });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email: normalizedEmail,
      password: hash,
      isVerified: false,
    });

    const otp = String(generateOTP());

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      user.email,
      "Verify Your Skill_UP Account",
      `Your OTP is: ${otp}`
    );

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "OTP sent to email",
      token,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= VERIFY EMAIL ================= */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedOtp = String(otp || "").trim();

    if (!normalizedEmail || !normalizedOtp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (!/^\d{6}$/.test(normalizedOtp)) {
      return res.status(400).json({ message: "OTP must be exactly 6 digits" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (new Date(user.otpExpire).getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (String(user.otp).trim() !== normalizedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Email verified successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= RESEND VERIFY OTP ================= */
exports.resendVerifyOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const otp = String(generateOTP());
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      user.email,
      "Verify Your Skill_UP Account",
      `Your OTP is: ${otp}`
    );

    res.json({ message: "New OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = String(generateOTP());

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      normalizedEmail,
      "Reset Password OTP",
      `Your OTP is: ${otp}`
    );

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedOtp = String(otp || "").trim();

    if (!normalizedEmail || !normalizedOtp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (new Date(user.otpExpire).getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (String(user.otp).trim() !== normalizedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
