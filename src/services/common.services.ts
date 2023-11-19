
export const response = (res: any,status: number, response: any) =>{
return res.status(status).send(response);
}