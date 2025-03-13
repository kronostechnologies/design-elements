import { FocusEvent } from 'react';
import { Datepicker } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const Container = styled.div`
    height: 400px;
`;

const datepickerMeta: Meta<typeof Datepicker> = {
    title: 'Components/Date picker',
    component: Datepicker,
    decorators: [decorateWith(Container)],
    parameters: rawCodeParameters,
};

export default datepickerMeta;

type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
    args: {
        label: 'Date',
        hint: 'Hint',
    },
};

export const WithOnChangeCallback: Story = {
    args: {
        label: 'Date',
        onChange: (date: Date) => console.info(`[onChange] Date: ${date}`),
    },
};

export const WithOnBlurCallback: Story = {
    args: {
        label: 'Date',
        onBlur: (event: FocusEvent<HTMLInputElement>) => console.info(`[onBlur] Value: ${event.target.value}`),
    },
};

export const WithOnFocusCallback: Story = {
    args: {
        label: 'Date',
        onFocus: (event: FocusEvent<HTMLInputElement>) => console.info(`[onFocus] Value: ${event.target.value}`),
    },
};

export const InsideShadowDom: Story = { ...Default };
InsideShadowDom.decorators = [ShadowDomDecorator];

export const WithToggletip: Story = {
    ...Default,
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};
