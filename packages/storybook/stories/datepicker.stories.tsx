import { Button, Datepicker, DatepickerHandles } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { FormEvent, useRef } from 'react';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';
import { decorateWith } from './utils/decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const Container = styled.div`
    height: 400px;
`;

const currentDate = new Date();
const upcomingDate = new Date();
upcomingDate.setDate(upcomingDate.getDate() + 5);

export default {
    title: 'Controls/Datepicker',
    component: Datepicker,
    decorators: [decorateWith(Container)],
    parameters: rawCodeParameters,
};

export const Normal: Story = () => (
    <Datepicker label="Date" hint="Hint" />
);

export const WithTooltip: Story = () => (
    <Datepicker label="Date" tooltip={{ label: 'Tooltip text content' }} hint="Hint" />
);

export const InsideShadowDom: Story = () => (
    <Datepicker label="Date" hint="Hint" />
);
InsideShadowDom.decorators = [ShadowDomDecorator];

export const WithTodayButton: Story = () => (
    <Datepicker label="Date" hasTodayButton />
);

export const Disabled: Story = () => (
    <Datepicker label="Date" disabled />
);

export const CustomDateFormat: Story = () => (
    <Datepicker label="Date" dateFormat="dd/MM" />
);

export const CustomPlaceholder: Story = () => (
    <Datepicker label="Date" placeholder="Hello World" />
);

export const Invalid: Story = () => (
    <Datepicker label="Date" valid={false} />
);

export const MaxDate: Story = () => (
    <Datepicker label="Date" maxDate={upcomingDate} />
);

export const MinDate: Story = () => (
    <Datepicker label="Date" minDate={currentDate} />
);

export const ReadOnly: Story = () => (
    <Datepicker label="Date" value="2002-02-02" readOnly />
);

export const Required: Story = () => (
    <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <Datepicker label="Date" required />
        <button type="submit">Submit</button>
    </form>
);

export const StartOpen: Story = () => (
    <Datepicker label="Date" startOpen />
);

export const StartDate: Story = () => (
    <Datepicker label="Date" startDate={new Date('1995-05-05')} />
);

export const CustomLocale: Story = () => (
    <Datepicker label="Date" locale="fr-CA" />
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

export const WithDatepickerResetHandle: Story = () => {
    const datepickerRef = useRef<DatepickerHandles>(null);

    function handleClick(): void {
        datepickerRef.current?.reset();
    }

    return (
        <>
            <Datepicker ref={datepickerRef} />
            <Button buttonType="primary" label="reset" onClick={handleClick} />
        </>
    );
};

export const WithDatepickerSetDateHandle: Story = () => {
    const datepickerRef = useRef<DatepickerHandles>(null);

    function handleClick(): void {
        datepickerRef.current?.setDate(new Date());
    }

    return (
        <>
            <Datepicker ref={datepickerRef} />
            <Button buttonType="primary" label="Set to today" onClick={handleClick} />
        </>
    );
};
