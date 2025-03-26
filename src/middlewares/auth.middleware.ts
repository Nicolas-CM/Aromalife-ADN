import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.header("Authorization");

  if (!token) {
    res.status(401).json("Not Authorized");
    return;
  }

  try {
    //console.log("Token: "+token);
    token = token.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.body.loggedUser = decoded.user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json("Token Expired");
      return;
    }
    res.status(401).json("Not Authorized");
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.body.loggedUser.roles;
    if (!roles.some((role) => userRoles.includes(role))) {
      res.status(403).json("Forbidden");
      return;
    }
    next();
  };
};
