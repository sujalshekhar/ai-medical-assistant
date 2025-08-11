import mongoose, { Schema, Document, Types } from 'mongoose';
import { LabReport } from '../types/model.type';

const LabReportSchema: Schema = new Schema<LabReport>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadedDate: { type: Date, required: true },
  reportType: { type: String, required: true },
  extractedText: { type: String },
  reportDetailsId: { type: Schema.Types.ObjectId, ref: 'ReportDetails', required: false },
});

export default mongoose.model<LabReport & Document>('LabReport', LabReportSchema);
