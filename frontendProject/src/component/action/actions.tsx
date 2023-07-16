// src/components/Action.tsx

import React from 'react';
import { IAction } from '../../utils/interfaces';
import styled from 'styled-components'
import { useDrag } from 'react-dnd'

const WrapperAction = styled.div`
padding: 20px;
width: 200px;
text-align: center;
border: 2px solid transparent;
border-radius: 25px;
margin: 5px;
background: #aadee6;
position:relative;
cursor:pointer;
}
`;
const ActionTitle = styled.span`
font-weight: bold;
font-family: cursive;
}
`;
const ExecutionCreditsWrapper = styled.div`
background: #b05fc0;
    border-radius: 10px;
    top: -14px;
    padding: 5px;
    color: white;
    right: 20px;
    position: absolute;
    font-weight: bold;}
`;
const Action: React.FC<IAction> = ({ type, executionCredits, _id }) => {
  const [, dragRef] = useDrag({
    type: 'actions',
    item: { type, executionCredits, _id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <WrapperAction ref={dragRef}>
      <ActionTitle>
        {type}
      </ActionTitle>
      <ExecutionCreditsWrapper>
        {executionCredits}
      </ExecutionCreditsWrapper>
    </WrapperAction>
  );
};

export default Action;
