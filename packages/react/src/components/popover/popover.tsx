import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { Manager, Popper, PopperChildrenProps, PopperProps, Reference, ReferenceChildrenProps } from 'react-popper';

import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import styled from 'styled-components';
import { Arrow } from './arrow';

const Wrapper = styled.div<{ distance: number }>`
    background-color: #fff;
    border-radius: 4px;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.18));
    padding: 8px;
    position: relative;

    &[data-placement*="bottom"] {
        margin-top: ${({ distance }) => distance}px;
    }

    &[data-placement*="top"] {
        margin-bottom: ${({ distance }) => distance}px;
    }

    &[data-placement*="right"] {
        margin-left: ${({ distance }) => distance}px;
    }

    &[data-placement*="left"] {
        margin-right: ${({ distance }) => distance}px;
    }
`;

interface PopoverProps {
    // The popover's content
    children: ReactNode;
    // Target on which the popover is attached
    target: ReactElement;
    /**
     * Position relative to the target
     * @default auto
     */
    position?: PopperProps['placement'];
    /**
     * Distance in px between the target and the popover
     * @default 8
     */
    distance?: number;
    /**
     * Display an arrow with the popover
     * @default true
     */
    arrow?: boolean;
}

export function Popover({
    children,
    target,
    position = 'auto',
    distance = 8,
    arrow = true,
}: PopoverProps): ReactElement {
    const targetRef = useRef<HTMLElement | null>(null);
    const popoverRef = useRef<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isLockDisabled, setIsLockDisabled] = useState(true);
    const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false);

    function togglePopover(): void {
        setIsOpen(prevState => !prevState);
    }

    function releaseFocusLock(): void {
        setIsLockDisabled(true);
        setShouldRestoreFocus(true);
        setIsOpen(false);
    }

    // Position the focus onto the popover on opening
    useEffect(() => {
        if (isOpen && popoverRef.current) {
            popoverRef.current.focus();
        }
    }, [isOpen]);

    // Restore focus on target element
    useEffect(() => {
        if (shouldRestoreFocus && targetRef.current) {
            targetRef.current.focus();
        }

        return () => {
            setShouldRestoreFocus(false);
        };
    }, [shouldRestoreFocus]);

    // Close popover with keyboard escape key
    useEffect(() => {
        function handleKeypress(e: KeyboardEvent): void {
            if (e.key === 'Escape') {
                releaseFocusLock();
            }
        }

        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    }, []);

    useEffect(
        () => {
            function listener(event: Event): void {
                const { current: targetEl } = targetRef;
                const { current: popoverEl } = popoverRef;

                // Do nothing on popoverRef's element click or descendent elements, or clicking targetRef's element
                if (!popoverEl || popoverEl.contains(event.target as Node) ||
                    !targetEl || targetEl.contains(event.target as Node)) {
                    return;
                }

                releaseFocusLock();
            }

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [targetRef, popoverRef, releaseFocusLock],
    );

    function renderTarget(referenceProps: ReferenceChildrenProps): ReactElement {
        const targetClassName = target.props.className || '';

        const targetProps = {
            ...target.props,
            ref: referenceProps.ref,
            onClick: togglePopover,
            className: isOpen ? `${targetClassName} active` : targetClassName,
        };

        return React.cloneElement(target, targetProps);
    }

    return (
        <Manager>
            <Reference innerRef={ref => targetRef.current = ref}>{renderTarget}</Reference>
            {isOpen &&
                ReactDOM.createPortal(
                    <Popper placement={position} innerRef={ref => popoverRef.current = ref}>
                        {({ ref, style, placement, arrowProps }: PopperChildrenProps) => (
                            <Wrapper
                                ref={ref}
                                style={style}
                                data-placement={placement}
                                tabIndex={0}
                                distance={distance}
                            >
                                <FocusLock disabled={isLockDisabled}>
                                    {children}
                                    <div onFocus={releaseFocusLock} tabIndex={0} />
                                </FocusLock>
                                {arrow &&
                                    <Arrow ref={arrowProps.ref} style={arrowProps.style} data-placement={placement} />
                                }
                            </Wrapper>
                        )}
                    </Popper>,
                    document.body,
                )}
        </Manager>
    );
}
