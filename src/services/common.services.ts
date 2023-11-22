import bcrypt from "bcrypt"

export const hashPassword = (password: string ) => {
    let hashedPassword = bcrypt.hashSync(
      password,
      "$2b$10$1234567890123456789012"
    );
    return hashedPassword;
};

export const response = (res: any,status: number, response: any) =>{
return res.status(status).send(response);
}

