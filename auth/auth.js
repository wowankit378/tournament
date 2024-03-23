const User = require("../models/User")
const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
      }

    //   var bcrypt = dcodeIO.bcrypt;

    /** One way, can't decrypt but can compare */
    var salt = bcrypt.genSaltSync(10);

    try {
        
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({ username, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
        }
  }
  exports.login = async (req, res) => {
    try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(401).json({ error: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.status(401).json({ error: 'Passwords not match' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h',
    });
    res.status(200).json({ token });
    } catch (error) {
    res.status(500).json({ error: 'Login failed' });
    }
    }