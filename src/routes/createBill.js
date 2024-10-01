import express from 'express';
import { pdfTemplateController } from '../controllers/createPdfController.js';

const billRouter = express.Router();

billRouter.post('/create-pdf', pdfTemplateController);

export default billRouter;
