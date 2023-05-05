import { Tag, TagProps, TagValue } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ReactElement, useRef, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Notification/Tag',
    component: Tag,
};

export const Normal: Story = (): ReactElement => {
    const tags: TagValue[] = [
        { label: 'Tag 1', id: '1' },
        { label: 'Tag 2', id: '2' },
        { label: 'Tag 3', id: '3' },
    ];

    return (
        <>
            <div>
                {tags.map((tag) => <Tag key={tag.id} value={tag} size="small" />)}
            </div>
            <br />
            <div>
                {tags.map((tag) => <Tag key={tag.id} value={tag} size="medium" />)}
            </div>
        </>
    );
};

export const Small: Story = (): ReactElement => (
    <Tag value={{ label: 'Tag' }} size="small" />
);

export const Medium: Story = (): ReactElement => (
    <Tag value={{ label: 'Tag' }} size="medium" />
);

export const WithIcons: Story = (): ReactElement => {
    const options: TagProps[] = [
        { value: { label: 'Tag 1', id: 'tag1' }, iconName: 'calendar' },
        { value: { label: 'Tag 2', id: 'tag2' }, iconName: 'home' },
        { value: { label: 'Tag 3', id: 'tag3' }, iconName: 'info' },
    ];

    return (
        <div>
            {options.map(({ iconName, value }) => <Tag key={value.id} iconName={iconName} value={value} />)}
        </div>
    );
};

export const Deletable: Story = (): ReactElement => {
    const initialOptions: TagValue[] = [
        { label: 'Tag 1', id: 'tag1' },
        { label: 'Tag 2', id: 'tag2' },
        { label: 'Tag 3', id: 'tag3' },
    ];
    const [options, setOptions] = useState(initialOptions);

    function handleDelete(tag: TagValue): void {
        const filteredOptionsArray = [...options].filter(({ id }) => id !== tag.id);
        setOptions(filteredOptionsArray);
    }

    return (
        <div>
            {options.map((tag) => <Tag key={tag.id} value={tag} onDelete={handleDelete} />)}
        </div>
    );
};

export const Clickable: Story = () => {
    function handleClick(tag: TagValue): void {
        console.info(`Clicked on ${tag.label}`);
    }

    return (
        <>
            <Tag key="small" iconName="copy" size="small" onClick={handleClick} value={{ label: 'Tag 1' }} />
            <Tag key="medium" iconName="mail" size="medium" onClick={handleClick} value={{ label: 'Tag 2' }} />
        </>
    );
};

export const WithRef: Story = () => {
    const ref = useRef(null);

    return (
        <Tag ref={ref} key="small" iconName="copy" size="small" value={{ label: 'Tag 1' }} />
    );
};

WithRef.parameters = rawCodeParameters;
