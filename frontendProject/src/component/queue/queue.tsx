import React, { ReactNode } from 'react';
import styled from 'styled-components'
import { useDrop } from 'react-dnd';
import  { api } from '../../utils/api';
import { IAction } from '../../utils/interfaces';

const WrapperQueue = styled.div`
padding: 20px;
 text-align: center;
 margin:10px;
border: 2px solid black;
display:flex;
overflow-x:scroll
   
}
`;
interface QueueProps {
    children: ReactNode;
    fetchQueue: () => void,
}

const Queue: React.FC<QueueProps> = ({ children, fetchQueue }) => {
    const [ ,dropRef] = useDrop({
        accept: 'actions',
        drop: (item: IAction) => api
            .post('queue/add', {
                id: item._id,
            })
            .then((response) => {
                fetchQueue()
            })
            .catch((error) => {
                console.log('Error fetching queue:', error);
            }),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <WrapperQueue ref={dropRef}>
            {children}
        </WrapperQueue>
    );
};

export default Queue;
