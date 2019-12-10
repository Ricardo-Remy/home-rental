const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const HouseProfile = require('../../models/houseProfile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');


// route GET api/profile/me
// desc Create or Update user profile

router.get('/me', auth, async (req, res) => {
  try {
    const houseProfile = await HouseProfile.findOne({ user: req.user.id }).populate('user',
    ['firstName, lastName']);

    if(!houseProfile) {
      return res.status(400).json({ msg: 'There is no Houseprofile for this user' });
    }

    res.json();

  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// route    POST api/profile
// desc     Create or update user profile
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty(),
      check('location', 'Location is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      houseType,
      location,
      description,
      availability,
      price
    } = req.body;

    // Create houseprofile object
    const houseProfileFields = {};
    houseProfileFields.user = req.user.id;
    if (houseType) houseProfileFields.houseType = houseType;
    if (description) houseProfileFields.description = description;
    if (location) houseProfileFields.location = location;
    if (availability) houseProfileFields.availability = availability;
    if (price) houseProfileFields.price = price;

    try {
      // Using upsert option (creates new doc if no match is found):
      let houseProfile = await HouseProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: houseProfileFields },
        { new: true, upsert: true }
      );
      res.json(houseProfile);

      // Create Profile

      houseProfile = new HouseProfile(houseProfileFields);
      
      await houseProfile.save();

      res.json(houseProfile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// route    GET api/profile/user/:user_id
// @desc     Get profile by user ID

router.get('/user/:user_id', async (req, res) => {
  try {
    const houseProfile = await HouseProfile.findOne({
      user: req.params.user_id
    }).populate('user', ['firstName, lastName']);

    if (!houseProfile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(houseProfile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'HouseProfile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// route    DELETE api/houseProfile
// desc     Delete profile, user
router.delete('/', auth, async (req, res) => {
  try {
    // Remove houseProfile
    await HouseProfile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

