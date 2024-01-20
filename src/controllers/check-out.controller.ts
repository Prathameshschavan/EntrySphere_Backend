import CheckIn from "../models/check-in.model";
import { response } from "../services/common.services";

export const getCheckOut = async (req: any, res: any) => {
  const checkOutData = await CheckIn.find({ check_out_time: { $ne: "" } });
  response(res, 200, checkOutData);
};

export const addCheckOut = async (req: any, res: any) => {
  try {
    const { _id } = req?.query;
    if(!_id){
        response(res, 400, {message: "_id not found"});
        return;
    }
    const checkOutData = await CheckIn.findOne({ _id });
    
    if(!checkOutData){
        response(res, 400, {message: "_id not found"});
        return;
    }

    const updatedData = await CheckIn.findOneAndUpdate(
      { _id },
      { $set: { check_out_time: new Date() } },
      { new: true }
    );
    response(res, 200, updatedData);
  } catch (error) { 
    console.log(error);
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};
