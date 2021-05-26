import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import { validateRegisterInput, validateLoginInput } from "../../utils/validators";
import User from "../../models/Users";

function generateUserToken(user) {
  return sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}
export const Mutation = {
  async login(_, { username, password }) {
    const { errors, valid } = validateLoginInput(username, password);
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    const user = await User.findOne({ username });
    if (!user) {
      errors.general = "Wrong credentials.";
      throw new UserInputError("Wrong credentials.", { errors });
    }
    const match = await compare(password, user.password);
    if (!match) {
      errors.general = "Wrong credentials.";
      throw new UserInputError("Wrong credentials.", { errors });
    }
    const token = generateUserToken(user);

    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },
  async register(
    _,
    { registerInput: { username, password, confirmPassword, email } }
  ) {
    // Validate user data
    const { valid, errors } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    // User should not exist
    const checkExisting = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (checkExisting) {
      if (checkExisting.username === username &&
        checkExisting.email === email)
        throw new UserInputError("Username and email already registered.", {
          errors: {
            username: "Username taken and email is also registered.",
          },
        });
      else if (checkExisting.username === username)
        throw new UserInputError("Username already registered.", {
          errors: {
            username: "Username taken.",
          },
        });
      else if (checkExisting.email === email)
        throw new UserInputError("Email already registered.", {
          errors: {
            username: "Email is already registered taken.",
          },
        });
    }
    // TODO hash password and auth token
    password = await hash(password, 12);

    const newUser = new User({
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    });

    const res = await newUser.save();

    const token = generateUserToken(res);

    return {
      ...res._doc,
      id: res._id,
      token,
    };
  },
};
