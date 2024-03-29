import { Checkbox } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
};

export const Normal: Story = () => (
    <>
        <Checkbox data-testid="some-checkbox-data-testid" name="checkbox1" value="no label" />
        <Checkbox label="Normal" name="checkbox2" value="normal" />
        <Checkbox label="Disabled" name="checkbox3" value="disabled" disabled />
        <Checkbox label="Checked" name="checkbox4" value="checked" checked />
        <Checkbox label="Default checked" name="checkbox5" value="defaultChecked" defaultChecked />
        <Checkbox label="Indeterminate" name="checkbox6" value="indeterminate" indeterminate />
    </>
);
