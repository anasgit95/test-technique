// backend/src/models/queue.ts

import mongoose, { Document, Schema, Types } from 'mongoose';
import { ActionDocument } from './actions';

export interface QueueDocument extends Document {
  actions: Types.Array<ActionDocument['_id']>; 
}

const queueSchema = new Schema<QueueDocument>({
  actions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Action',
    },
  ],
});

export const QueueModel = mongoose.model<QueueDocument>('Queue', queueSchema);
