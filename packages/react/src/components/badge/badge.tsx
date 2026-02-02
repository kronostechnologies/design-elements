import { FunctionComponent, PropsWithChildren } from 'react';
import styled, { css, keyframes, SimpleInterpolation, CSSObject } from 'styled-components';

const BadgeRoot = styled.span`
    display: inline-flex;
    flex-shrink: 0;
    position: relative;
`;

type BadgePosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toCssLength(value: number, unit = 'px'): string {
    return value === 0 ? '0' : `${value}${unit}`;
}

function getPositionRules(position: BadgePosition, offsetX = 0, offsetY = 0): CSSObject {
    const positionRules: {[name: string]: CSSObject} = {
        topRight: {
            right: toCssLength(-offsetX),
            top: toCssLength(offsetY),
            transform: 'translate(50%, -50%)',
        },
        bottomRight: {
            bottom: toCssLength(-offsetY),
            right: toCssLength(-offsetX),
            transform: 'translate(50%, 50%)',
        },
        topLeft: {
            left: toCssLength(offsetX),
            top: toCssLength(offsetY),
            transform: 'translate(-50%, -50%)',
        },
        bottomLeft: {
            bottom: toCssLength(-offsetY),
            left: toCssLength(offsetX),
            transform: 'translate(-50%, 50%)',
        },
    };

    const [vertical, horizontal] = position.split('-', 2);
    const positionName = `${vertical}${capitalize(horizontal)}`;

    return positionRules[positionName];
}

function getAnimationRules(position: BadgePosition): SimpleInterpolation {
    const baseTransform = getPositionRules(position).transform || '';

    const bounceKeyframes = keyframes`
        10% { transform: ${baseTransform} translateY(-4px); }
        20% { transform: ${baseTransform}; }
    `;

    return css`
        animation: ${bounceKeyframes} 2s ease-in infinite;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    `;
}

export const BadgeCircle = styled.span<{
    $animate?: boolean;
    $position: BadgePosition;
    $offsetX: number;
    $offsetY: number;
}>`
    align-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.component['badge-background-color']};
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: ${(props) => props.theme.component['badge-text-color']};
    display: flex;
    font-size: 0.75rem;
    font-weight: 400;
    height: 1rem;
    justify-content: center;
    line-height: 1;
    min-width: 1rem;
    padding: 0 0.25rem;
    position: absolute;
    text-align: center;
    ${({ $position, $offsetX, $offsetY }) => getPositionRules($position, $offsetX, $offsetY)}
    ${({ $animate, $position }) => $animate && getAnimationRules($position)}
`;

export const BadgeDot = styled(BadgeCircle)`
    height: 0.5rem;
    min-width: 0.5rem;
    padding: 0;
`;

interface BadgeProps {
    animate?: boolean;
    className?: string;
    /** The largest value to display, beyond which a + sign is shown */
    maxValue?: number;
    /** Horizontal offset from the base position (in px) */
    offsetX?: number;
    /** Vertical offset from the base position (in px) */
    offsetY?: number;
    position?: BadgePosition;
    /** When false, the badge is displayed as a small dot */
    showValue?: boolean;
    /** Set to true to show the badge even when its value is 0 */
    showZero?: boolean;
    value: number;
}

export const Badge: FunctionComponent<PropsWithChildren<BadgeProps>> = ({
    children,
    className,
    animate = false,
    maxValue = 99,
    position = 'top-right',
    offsetX = 0,
    offsetY = 0,
    showValue = true,
    showZero = false,
    value,
}) => {
    const BadgeShape = showValue ? BadgeCircle : BadgeDot;
    const text = Math.min(value, maxValue).toString() + (value > maxValue ? '+' : '');
    const visible = value !== 0 || showZero;

    return (
        <BadgeRoot>
            {children}
            {visible && (
                <BadgeShape
                    className={className}
                    $animate={animate}
                    $position={position}
                    $offsetX={offsetX}
                    $offsetY={offsetY}
                >
                    {showValue ? text : ''}
                </BadgeShape>
            )}
        </BadgeRoot>
    );
};

Badge.displayName = 'Badge';
