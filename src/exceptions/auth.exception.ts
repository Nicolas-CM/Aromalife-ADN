// Defining a custom exception class for authentication errors
export class AuthError extends Error {
    // Setting the name property to the class name
    name: string = this.constructor.name; 

    // Overriding the stack property to include a custom error message
    stack: string = "Authentication Error \n" + this.stack; 
}