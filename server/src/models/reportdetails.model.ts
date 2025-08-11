import mongoose, { Schema, Document, Types } from 'mongoose';
import { ReportDetails } from '../types/model.type';

const TestSchema = new Schema({
  testName: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  unit: { type: String },
  referenceRange: { type: String },
  status: {
    type: String,
    enum: ['Normal', 'High', 'Low', 'Critical', 'Unknown'],
    required: true
  }
}, { _id: false });

const ReportDetailsSchema: Schema = new Schema<ReportDetails>({
  reportId: { type: Schema.Types.ObjectId, ref: 'LabReport', required: true },
  createdAt: { type: Date, required: true },
  tests: { type: [TestSchema], required: true },
  rawText: { type: String, required: true }
});

export default mongoose.model<ReportDetails & Document>('ReportDetails', ReportDetailsSchema);
