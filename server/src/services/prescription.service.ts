import { createPrescription } from "../repositories/prescription.repository";
import { Prescription } from "../types/model.type";
import { Types } from "mongoose";

const createPrescriptionService = async (prescriptionData: Prescription): Promise<Boolean> => {
    const result = await createPrescription(prescriptionData);
    console.log('Prescription created successfully:', result);
    return result;
}

export { createPrescriptionService };