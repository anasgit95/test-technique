// backend/src/models/action.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface ActionDocument extends Document {
 _id: string;
  type: string; 
   executionCredits: number;
  maxExecutionCredits: number;
  lastCreditCalculation: Date;

}

const actionSchema = new Schema<ActionDocument>({
  type: { type: String, required: true },
  executionCredits: { type: Number, required: true },
  maxExecutionCredits: { type: Number, required: true },
  lastCreditCalculation: { type: Date, default: Date.now },

});

export const ActionModel = mongoose.model<ActionDocument>('Action', actionSchema);
