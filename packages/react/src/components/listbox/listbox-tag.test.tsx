import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { ListOption } from '../nav-list/nav-list-item';
import { ListboxTag } from './listbox-tag';

describe('ListboxTag', () => {
    const option: ListOption = {
        value: 'test',
        label: 'Test Label',
        id: '1',
        focusIndex: 0,
        ref: React.createRef(),
        href: '/someLink',
    };
    const handleTagRemove = jest.fn();
    const nullHandleTagRemove = (): void => {};
    const textboxRef = { current: document.createElement('div') };

    it('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <ListboxTag
                handleTagRemove={handleTagRemove}
                option={option}
                textboxRef={textboxRef}
            />,
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders the tag with correct label', () => {
        renderWithProviders(
            <ListboxTag
                handleTagRemove={handleTagRemove}
                option={option}
                textboxRef={textboxRef}
            />,
        );
        expect(screen.getByTestId('listboxtag-test')).toBeInTheDocument();
    });

    it('does not allow tag removal when readOnly is true', () => {
        renderWithProviders(
            <ListboxTag
                handleTagRemove={nullHandleTagRemove}
                option={option}
                readOnly
                textboxRef={textboxRef}
            />,
        );

        expect(screen.queryByTestId('Test Label-remove-button')).toBeNull();
    });
});
