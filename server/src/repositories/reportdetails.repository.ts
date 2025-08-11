import { ReportDetailsSchema } from "../models";
import { ReportDetails } from "../types/model.type";

const createReportDetailsRepository = async (reportDetails: ReportDetails) => {
    const data = await ReportDetailsSchema.create(reportDetails);
    return data;
}

export {createReportDetailsRepository}