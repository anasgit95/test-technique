import React, { useEffect, useState } from 'react';
import './App.css';
import Queue from './component/queue/queue';
import Action from "./component/action/actions";
 import { IAction, IQueue } from './utils/interfaces';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import io from 'socket.io-client';
import { baseURL,api } from './utils/api';
  //test commit 
const App: React.FC = () => {
  const [queue, setQueue] = useState<IQueue>();
  const [actions, setActions] = useState<IAction[]>([]);

  useEffect(() => {
    fetchQueue();
    fetchActions();
  }, []);
  useEffect(() => {
    const socket = io(baseURL); // Remplacez l'URL par celle de votre serveur WebSocket

    socket.on('updateQueue', (queue) => {
       setQueue(queue)
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const socket = io(baseURL); // Remplacez l'URL par celle de votre serveur WebSocket

    socket.on('updateActions', (actions) => {
 
      setActions(actions)
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const fetchQueue = () => {
    api
      .get('queue/queue')
      .then((response) => {
        setQueue(response.data.queue);
      })
      .catch((error) => {
        console.error('Error fetching queue:', error);
      });
  };
  const fetchActions = () => {
    api
      .get('actions/actions')
      .then((response) => {
        setActions(response.data.actions);
      })
      .catch((error) => {
        console.error('Error fetching queue:', error);
      });
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", alignContent: "center", justifyContent: "center", marginTop: 20 }}>
        {actions.map(action =>
        <div key={action._id}> 
          <Action {...action} />
          </div>
        )}
      </div>
      <Queue fetchQueue={fetchQueue}>
      {queue?.actions.length===0?
      <h1  >Drag and drop ici </h1>
       :queue?.actions.map((action,index) =>
                <div key={index}>   
          <Action    {...action} />
          </div>
        )}
      </Queue>
    </DndProvider>
  );
};

export default App;