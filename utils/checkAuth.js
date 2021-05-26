import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";

export default (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
