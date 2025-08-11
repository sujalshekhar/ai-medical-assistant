import { Types } from "mongoose";
import { createLabReport } from "../repositories/labreport.repository";
import { parseFile } from "../utils/parse.util";
import { parseLabReport } from "../llm";
import { createReportDetailsRepository } from "../repositories/reportdetails.repository";

const uploadLabReportService = async (userId: string, file: Express.Multer.File, requestBody: {reportType: string}) => {
    const labReportData = {
        filePath: file.path,
        fileType: file.mimetype,
        userId: new Types.ObjectId(userId),
        uploadedDate: new Date(),
        reportType: requestBody.reportType,
    };
    const labReport = await createLabReport(labReportData);
    console.log("Lab report created successfully:", labReport);
    // now parse the file for any additional processing if needed
    const parsedText = await parseFile(file.path);
    console.log("Parsed text from lab report:", parsedText);
    const extractedDataFromLLM = await parseLabReport(parsedText);
    console.log("Extracted data from LLM:", extractedDataFromLLM);
    const reportDetailsData = {
        reportId: labReport._id,
        createdAt: new Date(),
        tests: extractedDataFromLLM.tests,
        rawText: parsedText,
    }
    // const reportDetails = await createReportDetailsRepository(reportDetailsData);
    return labReport;
}

export { uploadLabReportService };