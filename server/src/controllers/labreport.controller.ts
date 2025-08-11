import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { Types } from "mongoose";
import { uploadLabReportService } from "../services/labreport.service";

const uploadLabReportController = async (req: Request, res: Response) => {
 try {
    const userId = req.user.id
    const file = req.file;
    if (!file) {
      console.error("No file uploaded");
      return res
        .status(400)
        .json(
          errorResponse(
            new ApiError(400, "No file uploaded"),
            "File upload failed",
            400
          )
        );
    }
    console.log("File uploaded successfully:", file.filename);
    const labReport = await uploadLabReportService(userId, file, req.body);
    return res.status(200).json(successResponse(labReport, "Lab report uploaded successfully", 200));
 } catch (error) {
    console.error("Error creating lab report: ", error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(errorResponse(error, error.message, error.statusCode));
    }
    return res
      .status(500)
      .json(
        errorResponse(
          new ApiError(500, "Internal Server Error"),
          "Failed to create lab report",
          500
        )
      );
    
 }
}

export { uploadLabReportController };