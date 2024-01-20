import CheckIn from "../models/check-in.model";
import { response } from "../services/common.services";

export const addCheckIn = async (req: any, res: any) => {
  try {
    const checkInData = {
      ...req.body,
      check_in_time: new Date(),
      check_out_time: "",
    };
    const newRecord = await CheckIn.create(checkInData);
    response(res, 200, { message: "Check In Successfull", data: newRecord });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};

export const getCheckIn = async (req: any, res: any) => {
  try {
    const {_id} = req?.query
    let checkInData = null;
    if(_id){
      checkInData = await CheckIn.findOne({check_out_time: "", _id});
    }
    else{
      checkInData = await CheckIn.find({check_out_time: ""});
    }
    response(res, 200, {message: "Check In Fetched Successfully", data: checkInData})
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
}
