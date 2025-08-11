import { LabReportModel } from "../models"
import { LabReport } from "../types/model.type";

const createLabReport = async (labReportData: LabReport): Promise<LabReport> => {
    const labReport = await LabReportModel.create(labReportData);
    return labReport;
}

export {createLabReport};