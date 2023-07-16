// backend/src/initActions.ts

import {  ActionModel } from './models/actions';
import { QueueModel } from './models/queue';
import { emitUpdateActions,emitUpdateQueue } from './server';
import { generateExecutionCredits } from './utils/generateCredits';
import cron from 'node-cron';

const maxExecutionCreditsEmail:number = 100; 
const maxExecutionCreditsRapport:number = 90; 
const maxExecutionCreditsSms:number = 80; 

export async function initActions() {
  const predefinedActions = [
    { type: 'Envoyer un e-mail', executionCredits:generateExecutionCredits(maxExecutionCreditsEmail),lastCreditCalculation : Date.now(),maxExecutionCredits:maxExecutionCreditsEmail},
    { type: 'Générer un rapport', executionCredits:generateExecutionCredits(maxExecutionCreditsRapport),lastCreditCalculation : Date.now(),maxExecutionCredits:maxExecutionCreditsRapport },
    { type: 'Envoyer un sms', executionCredits:generateExecutionCredits(maxExecutionCreditsSms),lastCreditCalculation : Date.now(),maxExecutionCredits:maxExecutionCreditsSms },

    // Ajoutez d'autres actions prédéfinies ici
  ];

  try {
    // Suppression de toutes les anciennes actions
    await ActionModel.deleteMany({});
    await QueueModel.deleteMany({});

    const queue = new QueueModel();
    await queue.save();
    // Ajout des nouvelles actions prédéfinies
    for (const actionData of predefinedActions) {
      const action = new ActionModel(actionData);
      await action.save();
    }

    console.log('Actions initialized successfully');
  } catch (error) {
    console.error('Error initializing actions:', error);
  }
}


// Planifier la tâche toutes les 24 heures
cron.schedule('0 0 * * *', async () => {
  const actions = await ActionModel.find({}).exec();
   for (const action of actions) {
      action.lastCreditCalculation = new Date();
      action.executionCredits = generateExecutionCredits(action.maxExecutionCredits)
       await action.save();

  }
  emitUpdateActions(actions);

}); 

// Planifier la tâche toutes les 2 minutes
cron.schedule('*/30 * * * * *', async () => {
  const queue = await QueueModel.findOne({}).populate('actions').exec();
  if (queue && queue.actions.length > 0) {
    const firstActionId = queue.actions.shift();
    const firstAction = await ActionModel.findById(firstActionId).exec();
    if(firstAction &&  firstAction.executionCredits>0 )
    {
      firstAction.executionCredits--;
      await firstAction.save()
    }

    await queue.save();
    const actions = await ActionModel.find({}).exec();
    emitUpdateActions(actions);
    emitUpdateQueue(queue);
 
  }
   // ...
});