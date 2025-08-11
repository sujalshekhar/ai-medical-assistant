import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { createPrescriptionService } from "../services/prescription.service";
import { Types } from "mongoose";
import { parseFile } from "../utils/parse.util";

const uploadPrescriptionController = async (req: Request, res: Response) => {
	try {
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
		const userId = req.user.id; // Assuming user ID is stored in req.user
		console.log("User ID:", userId);
		const ocrExtractedText = await parseFile(file.path);
		console.log("OCR Extracted Text:", ocrExtractedText);
		const prescriptionData = {
			...req.body,
			filePath: file.path,
			fileType: file.mimetype,
			userId: new Types.ObjectId(userId),
			uploadedDate: new Date(),
			ocrExtractedText: ocrExtractedText,
		};
		const prescription = await createPrescriptionService(prescriptionData);
		if (!prescription) {
			console.error("Failed to create prescription");
			return res
				.status(500)
				.json(
					errorResponse(
						new ApiError(500, "Failed to create prescription"),
						"Prescription creation failed",
						500
					)
				);
		}
		return res
			.status(200)
			.json(successResponse(null, "File uploaded successfully", 200));
	} catch (error) {
		console.error("Error uploading prescription: ", error);
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
					"An unexpected error occurred",
					500
				)
			);
	}
};

export { uploadPrescriptionController };
