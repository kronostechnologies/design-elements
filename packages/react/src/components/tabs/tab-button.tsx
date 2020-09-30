import { Icon, IconName } from '@design-elements/components/icon/icon';
import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';
import { useTheme } from '@design-elements/hooks/use-theme';
import React, { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    ${(props: {theme: Theme, isSelected: boolean}) => {
        return `
            min-width: 82px;
            height: 48px;
            ${props.isSelected ? `border-bottom: 4px solid ${props.theme.main['primary-1.1']};` : ''}
            &:focus {
                box-shadow: 0 0 0 3px ${props.theme.main['primary-1.1']} 66, 0 0 0 1px ${props.theme.main['primary-1.1']}
            }
            &:hover span {
                color: ${props.theme.main['primary-2']};
            }
            &:hover svg {
                color: ${props.theme.main['primary-2']};
            }
        `;
    }}
`;

const StyledButtonDiv = styled.div`
    align-items: center;
    display: flex;
    height: 24px;
    justify-content: center;
    line-height: 24px;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
`;

const StyledButtonText = styled.span`
    ${(props: {theme: Theme, isSelected: boolean}) => {
        return `
            ${props.isSelected ? `color: ${props.theme.main['primary-1.1']};` : `color: ${props.theme.greys['dark-grey']};`}
            font-size: 14px;
            ${props.isSelected ? 'font-family: OpenSans-SemiBold;' : 'font-family: OpenSans-Regular;'}
            ${props.isSelected ? 'font-weight: 600;' : 'font-weight: normal;'}
        `;
    }}
`;

const LeftIcon = styled(Icon)`
    padding-right: 5px;
`;

const RightIcon = styled(Icon)`
    padding-left: 5px;
`;

export interface ButtonSelection {
    id: string;
    isPanelSelection: boolean;
}

interface TabButtonProps {
    id: string;
    textValue: string;
    leftIconName?: IconName;
    rightIconName?: IconName;
    controlledPanelId: string;
    isSelected: boolean;
    isFocused: boolean;
    selectionCallback(buttonSelection: ButtonSelection): void;
}

export function TabButton(
    {
        id,
        textValue,
        leftIconName ,
        rightIconName ,
        controlledPanelId,
        isSelected ,
        isFocused,
        selectionCallback,
    }: TabButtonProps,
): ReactElement {
    const theme = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (isFocused) {
            buttonRef?.current?.focus();
        } else {
            buttonRef?.current?.blur();
        }
    }, [isFocused]);

    return (
        <StyledButton
            id={id}
            ref={buttonRef}
            role="tab"
            aria-selected={isSelected}
            aria-controls={controlledPanelId}
            tabIndex={isSelected ? undefined : -1}
            onClick={() => selectionCallback({ id: id, isPanelSelection: true })}
            theme={theme}
            isSelected={isSelected}
        >
            <StyledButtonDiv>
                {leftIconName != null &&
                    <LeftIcon
                        name={leftIconName}
                        size="16"
                        color={isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey']}
                    />
                }
                <StyledButtonText isSelected={isSelected} >{textValue}</StyledButtonText>
                {rightIconName != null &&
                    <RightIcon
                        name={rightIconName}
                        size="16"
                        color={isSelected ? theme.main['primary-1.1'] : theme.greys['dark-grey']}
                    />
                }
            </StyledButtonDiv>
        </StyledButton>
    );
}

TabButton.defaultProps = {
    leftIconName: null,
    rightIconName: null,
};
