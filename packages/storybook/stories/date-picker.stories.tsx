import { Datepicker } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 400px;
`;

const currentDate = new Date();
const upcomingDate = new Date();
upcomingDate.setDate(upcomingDate.getDate() + 5);

export default {
    title: 'Components/Date picker',
    component: Datepicker,
    decorators: [decorateWith(Container)],
    parameters: rawCodeParameters,
};

export const Default: Story<typeof Datepicker> = () => (
    <Datepicker label="Date" data-testid="a-data-test-id" hint="Hint" />
);

export const WithOnChangeCallback: Story = () => (
    <Datepicker label="Date" onChange={(date) => console.info(`[onChange] Date: ${date}`)} />
);

export const WithOnBlurCallback: Story = () => (
    <Datepicker label="Date" onBlur={(event) => console.info(`[onBlur] Value: ${event.target.value}`)} />
);

export const WithOnFocusCallback: Story = () => (
    <Datepicker label="Date" onFocus={(event) => console.info(`[onFocus] Value: ${event.target.value}`)} />
);
