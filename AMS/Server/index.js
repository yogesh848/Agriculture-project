const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const FramersSchema = require("./Models/Framers");
const products = require("./Models/products")
const order = require('./Models/order')
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/farmersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  FramersSchema.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success")
          

        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("User doesn't exist");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json("Error occurred during login");
    });
});


app.post("/register", (req, res) => {
  FramersSchema.create(req.body)
    .then(farmer => res.json(farmer))
    .catch(err => {
      console.error(err);
      res.status(500).json("Error occurred during registration");
    });
});
app.use(express.json())
app.use('/api/v1/',products);
app.use('/api/v1/',order)


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

