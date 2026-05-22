import { css, type SimpleInterpolation } from 'styled-components';
import { equisoftColors } from '../../themes';

export function darkenOnComponentHover(container: SimpleInterpolation): readonly SimpleInterpolation[] {
    return css`
        ${container}:hover && {
            > g {
                fill: ${equisoftColors['logo-fill-hover']};
            }
        }
    `;
}
