import User from "../models/user.model";
import { hashPassword, response } from "../services/common.services";
import { generateToken, verifyToken } from "../services/jwt.services";

interface IUser {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  sub?: string;
  jti?: string;
}

export const register = async (req: any, res: any) => {
  try {
    const isExist = await User.find({ email: req.body.email });

    if (isExist.length > 0 && req.body.method === "email") {
      return response(res, 400, {
        message: `User with '${req.body.email}' email already exists`,
      });
    }

    if (isExist.length > 0 && req.body.method === "google") {
      const token = generateToken(req.body);
      delete req.body.password;
      delete req.body.jti;
      delete req.body.sub;
      return response(res, 200, {
        message: `User registered successfully`,
        user: req.body,
        token: token,
      });
    }

    if (req.body.method === "email") {
      const hashedPassword = hashPassword(req.body.password);
      await User.create({ ...req.body, password: hashedPassword });
      delete req.body.password;
      return response(res, 200, {
        message: "User registered successfully",
        user: { ...req.body },
      });
    }

    if (req.body.method === "google") {
      const token = generateToken(req.body);
      await User.create({ ...req.body });
      delete req.body.jti;
      delete req.body.sub;
      return response(res, 200, {
        message: "User registered successfully",
        user: req.body,
        token: token,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};

export const login = async (req: any, res: any) => {
  try {
    const isExist: any = await User.find({ email: req.body.email });
    const isExistObj = { ...isExist[0]?._doc };

    if (isExist.length === 0 && req.body?.method === "email") {
      return response(res, 400, {
        message: `User with email '${req.body.email}' is not registered`,
      });
    }

    if (isExist.length === 0 && req.body?.method === "google") {
      const token = generateToken(req.body);
      await User.create({ ...req.body });
      delete req.body.jti;
      delete req.body.sub;
      return response(res, 200, {
        message: "User registered successfully",
        user: req.body,
        token: token,
      });
    }

    let userObject = {
      first_name: isExistObj.first_name || "",
      last_name: isExistObj.last_name || "",
      email: isExistObj.email || "",
      password: isExistObj.password || "",
      avatar: isExistObj.avatar || "",
      sub: isExistObj.sub || "",
      jti: isExistObj.jti || "",
    };

    if (isExist.length > 0 && req.body.method === "google") {
      const token = generateToken(userObject);
      delete userObject.password;
      delete userObject.jti;
      delete userObject.sub;
      return response(res, 200, {
        message: `User registered successfully`,
        user: userObject,
        token: token,
      });
    }

    const hashedPassword = hashPassword(req.body.password);
    if (hashedPassword !== isExist[0]?.password) {
      return response(res, 400, {
        message: `The password you entered is incorrect. Please double-check your password and try again.`,
      });
    }

    const token = generateToken(userObject);
    delete userObject.password;
    delete userObject.jti;
    delete userObject.sub;
    return response(res, 200, {
      message: "login successful",
      user: userObject,
      token: token,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};
