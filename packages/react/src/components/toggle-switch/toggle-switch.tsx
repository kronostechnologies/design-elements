import { focus } from '@design-elements/utils/css-state';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Theme } from '../theme-wrapper/theme-wrapper';
import {useDeviceContext} from "@design-elements/components/device-context-provider/device-context-provider";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const StyledLabel = styled.label`
    ${(props: {theme: Theme, disabled?: boolean, isMobile: boolean}) => {
        return `
            ${props.disabled ? '' : 'cursor: pointer;'}
            display: block;
            font-size: ${props.isMobile ? 1 : 0.875}rem;
            line-height: ${props.isMobile ? 2 : 1.5}rem;
            padding-left: ${props.isMobile ? 'var(--spacing-7x)' : 'var(--spacing-6x)'};
            position: relative;
            user-select: none;


            button {
                ${props.disabled ? '' : 'cursor: pointer;'}
                border: 1px solid green;
                background: green;
                border-radius: ${props.isMobile ? 16 : 12}px;
                height: ${props.isMobile ? 32 : 24}px;
                width: ${props.isMobile ? 48 : 36}px;
                position: absolute;
                left: 0;

                span {
                    background: white;
                    border-radius: 100%;
                    box-sizing: border-box;
                    height: ${props.isMobile ? 22 : 16}px;
                    position: absolute;
                    right: calc(100% - ${props.isMobile ? 26 : 19}px);
                    top: 50%;
                    transform: translateY(-50%);
                    width: ${props.isMobile ? 22 : 16}px;
                }

                &[aria-checked="false"] {
                    background: ${props.theme.greys['mid-grey']};
                    border-color: ${props.theme.greys['mid-grey']};

                    span {
                        transition: right .1s ease-in-out;
                    }
                }

                &[aria-checked="true"] > span {
                    right: ${props.isMobile ? 4 : 3}px;
                    transition: right .1s ease-in-out;
                }

                &:disabled {
                    background: ${props.theme.greys.grey};
                    border-color: ${props.theme.greys.grey};

                    &[aria-checked="true"] {
                        background: #99cead;
                        border-color: #99cead;
                    }
                }

                ${focus(props)}
            }
        `;
    }}
`;

interface ToggleSwitchProps {
    label: string;
    disabled?: boolean;
    toggled?: boolean;
    onToggle?(value: boolean): void;
}

export function ToggleSwitch(props: ToggleSwitchProps): ReactElement  {
    const { label, disabled, onToggle } = props;
    const id = uuid();
    const { isMobile } = useDeviceContext();
    const [toggled, setToggled] = useStateWithCallbackLazy(!!props.toggled);

    const handleClick = () => {
        if (!disabled) {
            setToggled(!toggled, (newToggled: boolean) => {
                if (onToggle) {
                    onToggle(newToggled);
                }
            });
        }
    };

    return (
        <StyledLabel
            disabled={disabled}
            id={id}
            isMobile={isMobile}
        >{label}
            <button
                role="switch"
                aria-readonly={!!disabled}
                aria-checked={toggled}
                aria-labelledby={id}
                disabled={disabled}
                onClick={handleClick}
            >
                <span/>
            </button>
        </StyledLabel>
    );
}
