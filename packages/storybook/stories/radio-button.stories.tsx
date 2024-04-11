import { RadioButtonGroup, Button } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Radio Button',
    component: RadioButtonGroup,
};
const buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

export const Default: Story = () => (
    <RadioButtonGroup
        data-testid='radio-button-group-id'
        label="Planets"
        groupName="planets-1"
        buttons={buttons}
    />
);

export const WithConditionalField: Story = () => (
    <RadioButtonGroup
        label="Select radio button"
        groupName="content"
        buttons={[
            { label: 'With Conditional Field', value: 'with', content: { element: <p>This is some content</p> } },
            { label: 'Without Conditional Field', value: 'without' },
        ]}
    />
);
WithConditionalField.parameters = rawCodeParameters;

export const WithTooltip: Story = () => (
    <RadioButtonGroup
        data-testid='radio-button-group-id'
        label="Planets"
        tooltip={{ label: 'Tooltip text content' }}
        groupName="planets-2"
        buttons={buttons}
    />
);

export const ControlledContent: Story = () => {
    const [value, setValue] = useState('red');

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (value !== event.target.value) {
            setValue(event.target.value);
        }
    }

    return (
        <>
            <Button buttonType="primary" label="Change to Blue" onClick={() => setValue('blue')} />
            <RadioButtonGroup
                groupName="controlled-default"
                checkedValue={value}
                buttons={[
                    {
                        label: 'Blue',
                        value: 'blue',
                        content: {
                            maxHeight: 304,
                            element: (
                                <div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at erat pulvinar,
                                    pretium nisl sollicitudin, posuere libero. Fusce imperdiet sit amet arcu vel
                                    fringilla. Nullam vestibulum sem a libero efficitur, id rutrum ipsum accumsan.
                                    Praesent feugiat dui et lacus dictum, in gravida felis pulvinar. Nulla vulputate
                                    augue a nunc rhoncus gravida. Nam ac elementum lectus, et faucibus justo.
                                    Vivamus tempor tellus vitae purus viverra maximus. Ut a vulputate turpis.
                                    Nunc tincidunt non nunc a semper. Interdum et malesuada fames ac ante ipsum
                                    primis in faucibus. Vestibulum eros purus, consequat at justo sed, faucibus
                                    viverra augue. Donec cursus sed sem sit amet efficitur. Pellentesque velit
                                    neque, rhoncus at neque finibus, fringilla gravida lectus. Sed tempus erat at
                                    dolor porttitor, in condimentum augue tempor. Ut eget tristique lacus.
                                    Vivamus felis magna, dignissim a risus et, rutrum tristique ligula.
                                    Etiam congue lacus in eros suscipit consectetur. Donec massa erat, luctus et
                                    orci sit amet, ullamcorper rhoncus diam. Donec vitae lacus id sapien facilisis
                                    vehicula. Sed quis lectus vel lorem aliquet auctor in elementum magna.
                                    Nulla lacinia ligula sed mi scelerisque, non ultrices magna vehicula.
                                    Pellentesque vel nisi gravida, hendrerit ex sit amet, iaculis sem.
                                    Pellentesque ut lacinia urna. Nam leo enim, ullamcorper et libero nec, tincidunt
                                    efficitur arcu. Curabitur viverra ut mauris in imperdiet. Suspendisse euismod
                                    est gravida diam pharetra, in mattis arcu pharetra. Fusce sollicitudin suscipit
                                    mauris in tincidunt. Donec sed porta eros, sed consectetur leo. In hac habitasse
                                    platea dictumst. Nam vel laoreet eros. Donec imperdiet odio ex, nec lacinia
                                    turpis pretium at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                                    posuere cubilia curae; Integer nec odio in dolor hendrerit fermentum eget ac leo.
                                    Vivamus lacus est, posuere sed ante eget, imperdiet maximus odio. Sed quam lacus,
                                    iaculis nec maximus nec, lobortis ac nulla. Cras lobortis nibh lectus, nec
                                    convallis massa ultrices quis. Donec vitae tortor at lacus vestibulum
                                    pellentesque quis non lectus. Etiam ultricies urna in aliquet luctus.
                                </div>
                            ),
                        },
                    },
                    {
                        label: 'Red',
                        value: 'red',
                        content: {
                            maxHeight: 171,
                            element: (
                                <div>
                                    Etiam congue lacus in eros suscipit consectetur. Donec massa erat, luctus et
                                    orci sit amet, ullamcorper rhoncus diam. Donec vitae lacus id sapien facilisis
                                    vehicula. Sed quis lectus vel lorem aliquet auctor in elementum magna.
                                    Nulla lacinia ligula sed mi scelerisque, non ultrices magna vehicula.
                                    Pellentesque vel nisi gravida, hendrerit ex sit amet, iaculis sem.
                                    Pellentesque ut lacinia urna. Nam leo enim, ullamcorper et libero nec, tincidunt
                                    efficitur arcu. Curabitur viverra ut mauris in imperdiet. Suspendisse euismod
                                    est gravida diam pharetra, in mattis arcu pharetra. Fusce sollicitudin suscipit
                                    mauris in tincidunt. Donec sed porta eros, sed consectetur leo. In hac habitasse
                                    platea dictumst. Nam vel laoreet eros. Donec imperdiet odio ex, nec lacinia
                                    turpis pretium at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                                    posuere cubilia curae; Integer nec odio in dolor hendrerit fermentum eget ac leo.
                                    Vivamus lacus est, posuere sed ante eget, imperdiet maximus odio. Sed quam lacus,
                                    iaculis nec maximus nec, lobortis ac nulla. Cras lobortis nibh lectus, nec
                                    convallis massa ultrices quis. Donec vitae tortor at lacus vestibulum
                                    pellentesque quis non lectus. Etiam ultricies urna in aliquet luctus.
                                </div>
                            ),
                        },
                    },
                    { label: 'Green', value: 'green', disabled: true },
                    { label: 'Yellow', value: 'yellow', content: { maxHeight: 19, element: (<div>Coucou</div>) } },
                    { label: 'Orange', value: 'orange' },
                ]}
                onChange={handleChange}
            />
        </>
    );
};
ControlledContent.parameters = rawCodeParameters;

export const Callback: Story = () => {
    function onChange(event: ChangeEvent<HTMLInputElement>): void {
        const checkedState: string = event.target.checked ? 'checked' : 'unchecked';
        console.info(`Radio button ${event.target.value} is ${checkedState}!`);
    }

    return (
        <RadioButtonGroup
            groupName="cities"
            onChange={onChange}
            buttons={[
                { label: 'Québec', value: 'quebec' },
                { label: 'Montréal', value: 'montreal' },
            ]}
        />
    );
};
Callback.parameters = rawCodeParameters;
