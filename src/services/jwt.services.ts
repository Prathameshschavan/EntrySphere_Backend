import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload : any) => {
    let token = JWT.sign(payload,process.env.JWT_SECRET || "codenext029");
    return token;
}

export const verifyToken = (token : string) => {
    try {
        const decodedToken = JWT.verify(token,process.env.JWT_SECRET || "codenext029"); 
        return decodedToken;   
    } catch (error) {
        throw new Error("Invalid Token")
    }
}