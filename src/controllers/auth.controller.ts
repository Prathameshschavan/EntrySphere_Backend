import User from "../models/user.model";
import { response } from "../services/common.services";
import { generateToken, verifyToken } from "../services/jwt.services";

export const register = async (req: any, res: any) => {
  try {
    const isExist = await User.find({ email: req.body.email });
    if (isExist.length > 0) {
      return response(
        res,
        400,
        `User with "${req.body.email}" email already exists`
      );
    }
    const newUser = await User.create(req.body);
    const token = generateToken({ ...newUser });
    return response(res, 200, {
      message: "User registered successfully",
      user: newUser,
      access_token: token,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(Object.keys(error), error.message);
      response(res, 500, { message: error.message });
    } else {
      console.log("Caught non-Error object:", error);
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};
