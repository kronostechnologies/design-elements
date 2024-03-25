import { ChooserButtonGroup } from '@equisoft/design-elements-react';
import { ChooserButtonOption } from '@equisoft/design-elements-react/dist/components/chooser-button-group/chooser-button-group'; // eslint-disable-line max-len
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const maritalStatus: ChooserButtonOption[] = [
    { value: 'single', label: 'Single, living alone or with a roommate' },
    { value: 'married', label: 'Married or living with a spouse' },
];

const ageRange: ChooserButtonOption[] = [
    { value: '0,24', label: 'Less than 24 years old' },
    { value: '25,34', label: '25 to 34 years old' },
    { value: '35,49', label: '35 to 49 years old' },
    { value: '50,64', label: '50 to 64 years old' },
    { value: '65+', label: '65+ years old' },
];

const skipOption: ChooserButtonOption = {
    value: 'skip',
    label: 'Would rather not say',
};

export default {
    title: 'Components/Chooser Button Group',
    component: ChooserButtonGroup,
};

export const Normal: Story = () => (
    <ChooserButtonGroup
        data-testid='chooser-button-group'
        groupName="maritalStatus"
        inColumns={false}
        options={maritalStatus}
    />
);

export const WithASkipButton: Story = () => (
    <ChooserButtonGroup
        groupName="maritalStatusSkip"
        inColumns={false}
        options={maritalStatus}
        skipOption={skipOption}
    />
);
export const WithValue: Story = () => {
    const [selectedOption, setSelectedOption] = useState(ageRange[2]);

    return (
        <ChooserButtonGroup
            groupName="ageRange"
            options={ageRange}
            value={selectedOption.value}
            onChange={(option) => setSelectedOption(option)}
        />
    );
};
export const InColumns: Story = () => (
    <ChooserButtonGroup
        groupName="ageRangeColumn"
        inColumns
        options={ageRange}
    />
);
export const WithCallback: Story = () => (
    <ChooserButtonGroup
        groupName="ageRangeCallback"
        inColumns
        onChange={(option) => console.info(option)}
        options={ageRange}
    />
);
WithCallback.parameters = rawCodeParameters;
