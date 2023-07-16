// backend/src/routes/actionRoutes.ts

import express from 'express';
import {  getActions} from '../controllers/actionsControllers';

const router = express.Router();
router.get('/actions',getActions)

export default router;
