import express from 'express';
import { config } from './config/config';
import { connectToDatabase } from './config/mongoose.config';
import userRouteV1 from './routes/v1/user.route';
import prescriptionRouteV1 from './routes/v1/prescription.route';
import labReportRouteV1 from './routes/v1/labreport.route';

const app = express();

connectToDatabase();

app.use(express.json());

// routes
app.use('/api/v1/users', userRouteV1);
app.use('/api/v1/prescriptions', prescriptionRouteV1);
app.use('/api/v1/labreports', labReportRouteV1);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})