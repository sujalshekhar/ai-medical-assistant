import { Types } from 'mongoose';

// ---------- Shared Types ----------
type TestStatus = "Normal" | "High" | "Low" | "Critical" | "Unknown";

interface TestResult {
    testName: string;
    value: number | string;
    unit?: string;
    referenceRange?: string;
    status: TestStatus;
}

// ---------- User ----------
interface User {
    _id?: Types.ObjectId;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

// ---------- Prescription ----------
interface Prescription {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    filePath: string;
    fileType: string;
    uploadedDate: Date;
    doctorName: string;
    ocrExtractedText?: string;
}

// ---------- Lab Report ----------
interface LabReport {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    filePath: string;
    fileType: string;
    uploadedDate: Date;
    reportType: string; // e.g., "blood", "urine"
    extractedText?: string;
    reportDetailsId?: Types.ObjectId;
}

// ---------- Report Details ----------
interface ReportDetails {
    _id?: Types.ObjectId;
    reportId: Types.ObjectId;
    createdAt: Date;
    tests: TestResult[];
    rawText: string;
}

export { User, Prescription, LabReport, ReportDetails, TestResult, TestStatus };
