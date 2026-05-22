import { css, type SimpleInterpolation } from 'styled-components';
import { equisoftColors } from '../../themes';
import type { ButtonType } from '../buttons';

export const buttonTypesToDarkenEquisoftLogo: ButtonType[] = [
    'secondary',
    'tertiary',
    'destructive-secondary',
    'destructive-tertiary',
];

export function darkenOnComponentHover(container: SimpleInterpolation): readonly SimpleInterpolation[] {
    return css`
        ${container}:hover && {
            > g {
                fill: ${equisoftColors['logo-fill-hover']};
            }
        }
    `;
}
