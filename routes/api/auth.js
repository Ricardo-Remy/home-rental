const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// route GET api/auth
// desc Test route

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});


// route Post api/auth
// desc Authenticate user & get token

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Password is mandatory'
  ).exists()
],
async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array() });
  };

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
  
    // See if user exists
    if(!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid user credentials' }] });
    }


    // To avoid security issue, log same error message
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid user credentials' }] })
    }

    const payload = {
      user: {
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