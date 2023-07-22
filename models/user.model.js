const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    occupation: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user","seler","admin"],
      default:"user",
      require: true
    },
  },
  {
    timestamps: true,
  }
);
// signup user
userSchema.statics.signup = async function (
  name,
  email,
  password,
  image,
  address,
  occupation
) {
  if (!name || !email || !password || !image || !address || !occupation) {
    throw new Error("All feilds must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password incorrect. Please make sure your password is at least 8 characters long and contains at least one number, one uppercase letter, one lowercase letter, and one symbol."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPass,
    image,
    address,
    occupation,
  });
  return user;
};

// login user

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All feilds must be filled!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email or password.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email or password.");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
