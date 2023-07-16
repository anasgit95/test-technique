// backend/src/controllers/actionController.ts

import { Request, Response } from 'express';
import { QueueModel } from '../models/queue';
import { ActionModel } from '../models/actions';


 
export const addAction = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    // Rechercher l'action par ID dans la base de données
    const action = await ActionModel.findById(id);

    if (!action) {
        res.status(510).json({message:'Action not found' });
      throw new Error('Action not found');

    }
    
     // Ajouter la référence à l'action à la file d'attente
    const queue = await QueueModel.findOneAndUpdate(
      {},
      { $push: { actions: action } },
      { new: true }
    ).populate('actions')
      res.status(200).json({queue });

  } catch (error) {
    console.error('Error adding action to queue:', error);
    throw error;
  }
};

export const getQueue =async (req: Request, res: Response) => {
  const queue =await QueueModel.findOne().populate("actions");
  res.status(200).json({ queue });
};
