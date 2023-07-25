
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { UserModel, FoodModel, UserreviewModel } = require('./models/users');

app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://fakter:Rahmanaariz1992$@cluster20.8gtbaai.mongodb.net/fooddata?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fooddata'
})
  .then(() => {
    console.log('CONNECTED TO MongoDB');
  })
  .catch(error => {
    console.error('ERROR: CONNECTING TO MongoDB: ', error);
  });
/////

const newUserReview = new UserreviewModel({
  name: "Noba ",
  username: "Nobaab",
  comment: "I absolutely loved the drink  and the service was Outstanding!"
});

newUserReview.save()
  .then(savedUserReview => {
    console.log("User review saved:", savedUserReview);
  })
  .catch(error => {
    console.log("Error saving user review:", error);
  });

  app.get("/userreviews", async (req, res) => {
    try {
      const userReviews = await UserreviewModel.find({});
      res.json(userReviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


app.post('/register', async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: name,
      username: username,
      password: hashedPassword
    });

    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.delete("/deleteUsers", async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/foods", async (req, res) => {
  try {
    const foodItems = await FoodModel.find({});
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
