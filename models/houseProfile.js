const mongoose = require('mongoose');

const HouseProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  houseType: {
    type: String,
  },
  availability: {
    type: Date,
    default: Date.now
  }
});

module.exports = HouseProfile = mongoose.model('houseProfile', HouseProfileSchema);