import CheckIn from "../models/check-in.model";
import { response } from "../services/common.services";

export const getDashboardData = async (req: any, res: any) => {
  try {
    const today = new Date();
    const start = new Date(today.setDate(today.getDate() - 1));
    const end = new Date(today.setDate(today.getDate() + 1));
    const checkInData = await CheckIn.find({
      createdAt: {
        $gt: start,
        $lt: end,
      },
    });
    const checkOutData = await CheckIn.find({
      createdAt: {
        $gt: start,
        $lt: end,
      },
    });
    response(res, 200, {
      message: "done successfully",
      data: { checkIns: checkInData.length, checkOuts: checkOutData.length },
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
