const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/user.route")

// app
const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
app.use(express.json());
app.use(cors({ credentials: true }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "welcome to buzzlyShop" });
});


// bypass routes
app.use("/api/user",userRoute)

mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`App listen on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
