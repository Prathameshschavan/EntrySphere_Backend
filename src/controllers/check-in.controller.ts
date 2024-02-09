import CheckIn from "../models/check-in.model";
import { response } from "../services/common.services";

export const addCheckIn = async (req: any, res: any) => {
  try {
    const today = new Date();
    const checkInData = {
      ...req.body,
      check_in_time: new Date(),
      check_out_time: "",
      dayIn: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`,
      dayOut: "",
    };
    console.log(checkInData);
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
    const { _id, startDate, endDate } = req?.query;
    let checkInData = null;
    if (_id) {
      checkInData = await CheckIn.findOne({ check_out_time: "", _id });
      if (!checkInData) {
        response(res, 400, { message: "_id not found" });
        return;
      }
    } else if (startDate && endDate) {
      // checkInData = await CheckIn.find({ createdAt: { $gt: new Date("2024-01-25"), $lt: new Date("2024-02-07") }, check_out_time: "" });
      checkInData = await CheckIn.find({
        createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) },
        check_out_time: "",
      });
    } else if (startDate == "true") {
      const today = new Date();
      checkInData = await CheckIn.find({
        createdAt: {
          $gt: new Date(today.setDate(today.getDate() - 1)),
          $lt: new Date(today.setDate(today.getDate() + 1)),
        },
        check_out_time: "",
      });
    } else {
      checkInData = await CheckIn.find({ check_out_time: "" });
    }
    console.log(checkInData);
    response(res, 200, {
      message: "Check In Fetched Successfully",
      data: checkInData,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response(res, 500, { message: error.message });
    } else {
      response(res, 500, { message: "An unexpected error occurred." });
    }
  }
};
