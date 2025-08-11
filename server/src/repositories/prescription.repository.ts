import { PrescriptionModel } from "../models";
import { Prescription } from "../types/model.type";

const createPrescription = async (prescriptionData: Prescription): Promise<Boolean> => {
    const prescription = await PrescriptionModel.create(prescriptionData);
    return true;
}

export { createPrescription };