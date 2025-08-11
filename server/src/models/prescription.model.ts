import mongoose, { Schema } from "mongoose";
import { Prescription } from "../types/model.type";

const PrescriptionSchema: Schema = new Schema<Prescription>({
	userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    uploadedDate: {
        type: Date,
        default: Date.now
    },
    doctorName: {
        type: String,
        required: true
    },
    ocrExtractedText: {
        type: String,
        required: false // Optional field for OCR extracted text
    }
});

export default mongoose.model<Prescription>("Prescription", PrescriptionSchema);
