import { ProgressIndicator } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Data/Progress Indicator',
    component: ProgressIndicator,
};

export const Normal: Story = () => (
    <>
        <ProgressIndicator
            descriptionLabel="You"
            resultLabel="50k - 100k $"
            percent={60}
            color="#0080A5"
        />
        <ProgressIndicator
            descriptionLabel="Equisoft"
            resultLabel="150k - 250k $"
            percent={100}
            color="#012639"
        />
    </>
);
