import { CardLink } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Components/Navigation/Card Link',
    component: CardLink,
    decorators: [RouterDecorator],
};

export const Normal: Story = () => (
    <CardLink label="Label" href="/" />
);
