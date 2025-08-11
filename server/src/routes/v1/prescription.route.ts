import { Router } from 'express';
import { upload } from '../../config/multer.config';
import { uploadPrescriptionController } from '../../controllers/prescription.controller';
import { validateUser } from '../../middlewares/auth.middleware';

const router = Router();

 router.post('/upload', [validateUser, upload.single('prescription')], uploadPrescriptionController);

export default router;