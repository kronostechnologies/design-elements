import React from 'react';

import { Datepicker } from '@equisoft/design-elements-react';

export default {
    title: 'Datepicker',
    component: Datepicker,
};

export const normal = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            height: '90vh',
            width: '100%',
        }}
    >
        <Datepicker position="bottomRight" value={new Date('2002-07-14')} />
        <Datepicker position="bottomLeft" disabled/>
        <Datepicker position="topRight" valid={false} validationErrorMessage="Format de date non valide" />
        <Datepicker position="topLeft" />
        <form>
            <Datepicker position="topLeft" required />
            <button type="submit">Submit</button>
        </form>
    </div>
);
