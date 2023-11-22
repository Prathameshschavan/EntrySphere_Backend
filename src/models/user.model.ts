import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
        type: String,
        require: false,
    },
    avatar: {
      type: String,
      require: false,
    },
    jti: {
      type: String,
      require: false,
    },
    sub: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
