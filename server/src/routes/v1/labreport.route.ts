import { Router } from 'express';
import { upload } from '../../config/multer.config';
import { validateUser } from '../../middlewares/auth.middleware';
import { uploadLabReportController } from '../../controllers/labreport.controller';

const router = Router();

router.post('/upload', [validateUser, upload.single('lab-report')], uploadLabReportController);

export default router;