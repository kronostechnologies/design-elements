import { type FC, type SVGProps } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Icon } from './icon';

const CustomSvg: FC<SVGProps<SVGSVGElement>> = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg data-testid="custom-svg" {...props}>
        <path d="M0 0h24v24H0z" />
    </svg>
);

describe('Icon', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Icon name="home" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders a custom svg component passed through the svg prop', () => {
        const { getByTestId } = renderWithProviders(<Icon svg={CustomSvg} size="32" color="red" />);

        const svg = getByTestId('custom-svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
        expect(svg).toHaveAttribute('color', 'red');
    });
});
