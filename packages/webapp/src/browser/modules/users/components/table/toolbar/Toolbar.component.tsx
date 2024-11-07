import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { CreateUser } from './CreateUser.component';

const ToolBarContainer = styled.div`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    justify-content: flex-end;
    padding: 8px 8px;
`;

export const ToolBar: FunctionComponent = () => (
    <ToolBarContainer>
        <CreateUser />
    </ToolBarContainer>
);
