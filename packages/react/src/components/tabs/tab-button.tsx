import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    ${(props: {isSelected: boolean}) => {
        return `
            width: 82px;
            height: 48px;
            ${props.isSelected ? 'border-bottom: 4px solid rgb(0, 128, 165);' : ''}
            &:focus span {
                width: 38px;
                color: rgb(87, 102, 110);
                font-family: OpenSans-Regular;
                font-weight: normal;
            }
            &:focus {
                width: 70px;
                border: 2px solid rgb(153, 204, 219);
                border-radius: 0px;
            }
            &:hover span {
                width: 40px;
                color: rgb(0, 0, 0);
                font-family: OpenSans-Regular;
                font-weight: normal;
            }
            &:hover {
                border-bottom: 0px solid rgb(0, 0, 0);
            }
        `;
    }}
`;

const StyledButtonText = styled.span`
    ${(props: {isSelected: boolean}) => {
        return `
            ${props.isSelected ? 'width: 42px;' : 'width: 50px;'}
            height: 24px;
            ${props.isSelected ? 'color: rgb(0, 128, 165);' : 'color: rgb(87, 102, 110);'}
            font-size: 14px;
            ${props.isSelected ? 'font-family: OpenSans-SemiBold;' : 'font-family: OpenSans-Regular;'}
            ${props.isSelected ? 'font-weight: 600;' : 'font-weight: normal;'}
            text-align: center;
            letter-spacing: 0px;
            line-height: 24px;
        `;
    }}
`;

interface ButtonSelection {
    id: string;
}

interface TabButtonProps {
    id: string;
    textValue: string;
    controlledPanelId: string;
    isSelected: boolean;
    selectionCallback(buttonSelection: ButtonSelection): void;
}

export function TabButton(
    { id, textValue, controlledPanelId, isSelected , selectionCallback }: TabButtonProps,
): ReactElement {
    return (
        <StyledButton
            id={id}
            role="tab"
            aria-selected={isSelected}
            aria-controls={controlledPanelId}
            tabIndex={isSelected ? undefined : -1}
            onClick={() => selectionCallback({ id: id })}
            isSelected={isSelected}
        >
            <StyledButtonText isSelected={isSelected} >{textValue}</StyledButtonText>
        </StyledButton>
    );
}
