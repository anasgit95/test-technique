// backend/src/routes/actionRoutes.ts

import express from 'express';
import { addAction,getQueue} from '../controllers/queueControllers';

const router = express.Router();

router.post('/add', addAction);
router.get('/queue', getQueue);
 export default router;
