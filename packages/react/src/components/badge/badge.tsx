import { FunctionComponent } from 'react';
import styled, { css, keyframes, SimpleInterpolation, CSSObject } from 'styled-components';

const BadgeRoot = styled.span`
    display: inline-flex;
    flex-shrink: 0;
    position: relative;
`;

type BadgePosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

const positionStyles: {[name: string]: CSSObject} = {
    topRight: {
        right: 0,
        top: 0,
        transform: 'translate(50%, -50%)',
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        transform: 'translate(50%, 50%)',
    },
    topLeft: {
        left: 0,
        top: 0,
        transform: 'translate(-50%, -50%)',
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        transform: 'translate(-50%, 50%)',
    },
};

function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPositionRules(position: BadgePosition): CSSObject {
    const [vertical, horizontal] = position.split('-', 2);
    const positionName = `${vertical}${capitalize(horizontal)}`;

    return positionStyles[positionName];
}

function getAnimationRules(position: BadgePosition): SimpleInterpolation {
    const baseTransform = getPositionRules(position).transform || '';

    const bounceKeyframes = keyframes`
        10% { transform: ${baseTransform} translateY(-5px); }
        20% { transform: ${baseTransform}; }
        27% { transform: ${baseTransform} translateY(-3px); }
        34% { transform: ${baseTransform}; }`;

    return css`
        animation: ${bounceKeyframes} 2s ease-in infinite;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }`;
}

export const BadgeCircle = styled.span<{
    $animate?: boolean;
    $position: BadgePosition;
}>`
    align-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.notifications['alert-2.1']};
    border-radius: 0.5rem;
    box-sizing: border-box;
    color: ${(props) => props.theme.greys.white};
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
    ${({ $position }) => getPositionRules($position)}
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
    position?: BadgePosition;
    /** When false, the badge is displayed as a small dot */
    showValue?: boolean;
    /** Set to true to show the badge even when its value is 0 */
    showZero?: boolean;
    value: number;
}

export const Badge: FunctionComponent<BadgeProps> = ({
    children,
    className,
    animate = false,
    maxValue = 99,
    position = 'top-right',
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
                <BadgeShape className={className} $animate={animate} $position={position}>
                    {showValue ? text : ''}
                </BadgeShape>
            )}
        </BadgeRoot>
    );
};
