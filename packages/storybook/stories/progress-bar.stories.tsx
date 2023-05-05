import { ProgressBar } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Data/Progress Bar',
    component: ProgressBar,
};

export const Normal: Story = () => (
    <>
        <ProgressBar
            descriptionLabel="You"
            resultLabel="50k - 100k $"
            percent={60}
            color="#0080A5"
        />
        <ProgressBar
            descriptionLabel="Equisoft"
            resultLabel="150k - 250k $"
            percent={100}
            color="#012639"
        />
    </>
);
