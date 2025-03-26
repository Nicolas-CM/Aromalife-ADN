import { Request, Response, NextFunction } from "express"; // Importing types for Express
import jwt, { TokenExpiredError } from "jsonwebtoken"; // Importing JWT library and TokenExpiredError for token handling

// Middleware to authenticate users
export const auth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.header("Authorization"); // Extracting the Authorization header

  if (!token) {
    // If no token is provided, respond with a 401 status
    res.status(401).json("Not Authorized");
    return;
  }

  try {
    // Removing the "Bearer " prefix from the token
    token = token.replace("Bearer ", "");
    // Verifying the token using the secret key
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    // Attaching the decoded user information to the request body
    req.body.loggedUser = decoded.user;
    next(); // Proceeding to the next middleware or route handler
  } catch (error) {
    // Handling token expiration error
    if (error instanceof TokenExpiredError) {
      res.status(401).json("Token Expired");
      return;
    }
    // Handling other token-related errors
    res.status(401).json("Not Authorized");
  }
};

// Middleware to authorize users based on roles
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.body.loggedUser.roles; // Extracting the roles of the logged-in user
    // Checking if the user has at least one of the required roles
    if (!roles.some((role) => userRoles.includes(role))) {
      // If the user does not have the required roles, respond with a 403 status
      res.status(403).json("Forbidden");
      return;
    }
    next(); // Proceeding to the next middleware or route handler
  };
};