const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// route post api/users
// desc Test route

router.post('/', [
  check('firstName', 'first name is required').not().isEmpty(),
  check('lastName', 'last name name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 4 or more characters'
  ).isLength({ min: 4 }),
],
async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() });
  };

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
  
    // See if user exists
    if(user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exist' }] });
    }

  user = new User({
    firstName,
    lastName,
    email,
    password
  });

  // Encrypt password

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  // Save into the DB
  await user.save();

  // return jsonwebtoken

  const payload = {
    user: {
      // No need to call _id, abstraction made
      id: user.id
    }
  };

  jwt.sign(
    payload,
    config.get('jwToken'),
    { expiresIn: 360000 },
    (err, token) => {
      if(err) throw err;
      res.json({ token });
    });

  console.log(`[Server] User registerd`);
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;