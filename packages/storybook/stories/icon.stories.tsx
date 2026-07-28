import { Icon } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { type FC, type SVGProps } from 'react';
import { Ship } from 'lucide-react';

export default {
    title: 'Foundations/Icons/Icon',
    component: Icon,
    tags: ['autodocs'],
};

export const BasicIcon: Story = () => (
    <Icon name="alertTriangle" />
);

export const WithColor: Story = () => (
    <Icon name="alertTriangle" color="orange" />
);

export const WithSize: Story = () => (
    <Icon name="alertTriangle" size="78" />
);

// A custom SVG can be any component that renders an <svg>, including a `.svg` file
// imported via SVGR. It receives the same size/color treatment as library icons.
const CustomGlyph: FC<SVGProps<SVGSVGElement>> = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </svg>
);

export const CustomSvg: Story = () => (
    <Icon svg={CustomGlyph} size="48" />
);

export const LucideSvg: Story = () => (
    <Icon svg={Ship} size="48" />
);
