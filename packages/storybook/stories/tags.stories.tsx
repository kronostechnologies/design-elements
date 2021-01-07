import { Tag, Tags } from '@equisoft/design-elements-react';
import React, { ReactElement, useState } from 'react';

export default {
    title: 'Tags',
    component: Tags,
};

export const normal = (): ReactElement => {
    const options: Tag[] = [
        { label: 'Tag 1' },
        { label: 'Tag 2' },
        { label: 'Tag 3' },
    ];

    return (
        <>
            <Tags options={options} size="small" />
            <br />
            <Tags options={options} size="medium" />
        </>
    );
};

export const small = (): ReactElement => (
    <Tags options={[{ label: 'Tag' }]} size="small" />
);

export const medium = (): ReactElement => (
    <Tags options={[{ label: 'Tag' }]} size="medium" />
);

export const withIcons = (): ReactElement => {
    const options: Tag[] = [
        { label: 'Tag 1', iconName: 'calendar' },
        { label: 'Tag 2', iconName: 'home' },
        { label: 'Tag 3', iconName: 'info' },
    ];

    return <Tags options={options} />;
};

export const Deletable = (): ReactElement => {
    const initialOptions = [
        { label: 'Tag 1', id: 'tag1' },
        { label: 'Tag 2', id: 'tag2' },
        { label: 'Tag 3', id: 'tag3' },
    ];
    const [options, setOptions] = useState(initialOptions);

    function handleDelete(option: Tag): void {
        const filteredOptionsArray = [...options].filter(({ id }) => id !== option.id);
        setOptions(filteredOptionsArray);
    }

    return (
        <Tags options={options} onDelete={handleDelete} />
    );
};
