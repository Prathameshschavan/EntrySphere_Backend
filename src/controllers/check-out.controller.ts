import CheckIn from "../models/check-in.model";
import { response } from "../services/common.services";

export const getCheckOut = async (req: any, res: any) => {
  try {
    const { _id, startDate, endDate } = req?.query;
    let checkOutData;
    if (_id) {
      checkOutData = await CheckIn.findOne({
        _id,
        check_out_time: { $ne: "" || undefined || null },
      });

      if (!checkOutData) {
        response(res, 400, { message: "_id not found" });
        return;
      }
    } else if (startDate && endDate) {
      checkOutData = await CheckIn.find({
        createdAt: { $gt: new Date(startDate), $lt: new Date(endDate) },
        check_out_time: { $ne: "" || undefined || null },
      });
    } else if (startDate == "true") {
      const today = new Date();
      checkOutData = await CheckIn.find({
        createdAt: {
          $gt: new Date(today.setDate(today.getDate() - 1)),
          $lt: new Date(today.setDate(today.getDate() + 1)),
        },
        check_out_time: { $ne: "" || undefined || null },
      });
    } else {
      checkOutData = await CheckIn.find({
        check_out_time: { $ne: "" || undefined || null },
      });
    }

    response(res, 200, {
      message: "Checkout fetched successfully",
      data: checkOutData,
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

export const addCheckOut = async (req: any, res: any) => {
  try {
    const { _id } = req?.query;
    if (!_id) {
      response(res, 400, { message: "_id not found" });
      return;
    }
    const checkOutData = await CheckIn.findOne({ _id });

    if (!checkOutData) {
      response(res, 400, { message: "_id not found" });
      return;
    }

    if (checkOutData.check_out_time !== "") {
      response(res, 400, { message: "This visitor is already checked out" });
      return;
    }
    const today = new Date();
    const updatedData = await CheckIn.findOneAndUpdate(
      { _id },
      {
        $set: {
          check_out_time: new Date(),
          dayOut: `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`,
        },
      },
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
