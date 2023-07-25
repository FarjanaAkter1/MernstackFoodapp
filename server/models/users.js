const mongoose = require('mongoose');

const UserreviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  comment: {
    type: String,
    default: 'I had the most amazing dining experience at Delicious Delights!',
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);
const FoodModel = mongoose.model('Food', foodSchema);
const UserreviewModel = mongoose.model('UserReview', UserreviewSchema);

module.exports = { UserModel, FoodModel, UserreviewModel };
