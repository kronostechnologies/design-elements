import React from 'react';

import { Datepicker } from '@equisoft/design-elements-react';

export default {
    title: 'Datepicker',
    component: Datepicker,
};

const storiesStyle = {
    display: 'flex',
    height: '290px',
    justifyContent: 'space-between',
};

export const normal = () => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            height: '400px',
            justifyContent: 'space-between',
            width: '100%',
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Datepicker label="Date"/>
            <Datepicker label="Date" position="bottomLeft"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Datepicker label="Date" position="topRight"/>
            <Datepicker label="Date" position="topLeft"/>
        </div>
    </div>
);

export const disabled = () => (
    <Datepicker label="Date" disabled/>
);
export const withValue = () => (
    <div style={storiesStyle}>
        <Datepicker label="Date" value={new Date('2002-07-14')} />
    </div>
);
export const errorMessage = () => (
    <div style={storiesStyle}>
        <Datepicker label="Date" valid={false} validationErrorMessage="Invalid date format" />
    </div>
);
export const withCallback = () => (
    <div style={storiesStyle}>
        <Datepicker
            label="Date"
            onDateChanged={(date: Date, valid: boolean) => {
                console.log('Date: ' + date + ' Validity: ' + valid);
            }}
        />
    </div>
);
export const required = () => (
    <form style={{ display: 'flex' }}>
        <div style={storiesStyle}>
            <Datepicker label="Date" required max="2016-02-02" min="2002-02-02" />
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
);
