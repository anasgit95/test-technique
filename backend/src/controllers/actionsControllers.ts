// backend/src/controllers/actionController.ts

import { Request, Response } from 'express';
 import { ActionModel } from '../models/actions';


export const getActions = async (req: Request, res: Response) => {
     const actions =  await ActionModel.find();
    res.status(200).json({actions });

   };
 