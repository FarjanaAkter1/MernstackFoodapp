
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const cors = require("cors");
app.use (express.json());
app.use(cors());
const MONGO_URI = "mongodb+srv://fakter:Rahmanaariz1992$@cluster20.8gtbaai.mongodb.net/fooddata?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fooddata'
})
  .then(() => {
    console.log('CONNECTED TO MongoDB');
    
    // Create a new user document and save it to the database
    const newUser = new UserModel({
      name: "Valentina",
      age: 0,
      username:"Valentina"


    });



    app.delete("/deleteUsers", async (req, res) => {
      try {
        // Delete all users from the collection
        await UserModel.deleteMany({});
        res.json({ message: "All users deleted successfully" });
      } catch (error) {
        res.json({ error: error.message });
      }
    });
    






    
    newUser.save()
      .then(savedUser => {
        console.log("User saved:", savedUser);
      })
      .catch(error => {
        console.log("Error saving user:", error);
      });
  })
  .catch(error => {
    console.log.error('ERROR: CONNECTING TO MongoDB: ', error);
  });

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/createUser",async(req, res) =>{
  const user =req.body
  const newUser = new UserModel(user)
  await newUser.save();

  res.json(user);

})

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
