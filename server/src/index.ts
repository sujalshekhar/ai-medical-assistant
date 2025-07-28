import express from 'express';
import { config } from './config/config';

const app = express();

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})