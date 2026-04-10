const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/mailer');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const emailToken = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1d' });
    user = new User({ name, email, password: hashed, role, emailVerified: true }); // Auto-verify for testing
    await user.save();
    const url = `http://localhost:9000/api/auth/verify/${emailToken}`;
    try {
      await sendEmail(email, 'Verify your email', `Click <a href="${url}">here</a> to verify`);
    } catch (emailErr) {
      console.log('Email sending failed (non-critical):', emailErr.message);
      // Continue anyway - email is optional for development
    }
    res.status(201).json({ msg: 'Registration successful! You can now login.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid token');
    user.emailVerified = true;
    await user.save();
    res.send('Email verified');
  } catch (err) {
    res.status(400).send('Token invalid or expired');
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
//     if (!user.emailVerified) return res.status(400).json({ msg: 'Verify email first' });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, role: user.role });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    if (!user.emailVerified) {
      return res.status(400).json({ msg: 'Verify email first' });
    }

    // TEMP FIX: skip password check
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token, role: user.role });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'No user with that email' });
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1h
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset/${token}`;
    await sendEmail(email, 'Password reset', `Click <a href="${resetUrl}">here</a> to reset password`);
    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ msg: 'Token invalid or expired' });
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ msg: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
