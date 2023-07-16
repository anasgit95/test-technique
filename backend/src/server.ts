import './db';

import express from 'express';
import actionRoutes from './routes/actionRoutes';
import queueRoutes from './routes/queueRoutes';
import { initActions } from './initQueueAndActions';
import http from 'http';
import { QueueDocument } from './models/queue';
import { ActionDocument } from './models/actions';

const socketIO = require('socket.io');
var cors = require('cors');
var app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
const PORT = process.env.PORT || 3005;

// Initialisez les actions et ajoutez la logique de notification
initActions()
  .then(() => {
    // Créez une instance de socket.io pour gérer les WebSockets
    io.on('connection', (socket: any) => {
      console.log('Client connected');

      // Écoutez les événements du client
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // Émettez une notification lors de l'initialisation des actions
    io.emit('actionsInitialized');

    // Utilisez le middleware express.json()
    app.use(express.json());

    // Définissez les routes pour les actions et la queue
    app.use('/actions', actionRoutes);
    app.use('/queue', queueRoutes);

    // Démarrer le serveur
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing actions:', error);
  });


  export function emitUpdateQueue(queue:QueueDocument) {
    console.log("ele",queue)

    io.emit('updateQueue', queue);
  }
  export function emitUpdateActions(actions:ActionDocument[]) {
    io.emit('updateActions',actions);
  }

  export default app ;