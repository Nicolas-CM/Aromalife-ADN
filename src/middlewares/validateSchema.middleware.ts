// Importing types for Express
import { Request, Response, NextFunction } from "express"; 

// Importing the Zod library type for schema validation
import { AnyZodObject } from "zod";

// Middleware to validate the request body against a given schema
export const validateSchema = (schema: AnyZodObject) => {
    // Returning an asynchronous middleware function
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parsing and validating the request body using the provided schema
            await schema.parseAsync(req.body);
            // If validation succeeds, proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If validation fails, respond with a 400 status and the error details
            res.status(400).json(error);
        }
    }
}