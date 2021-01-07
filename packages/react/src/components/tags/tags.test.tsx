import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { Tags, Tag } from './tags';

const tags: Tag[] = [
    { label: 'tag1' },
    { label: 'tag2' },
    { label: 'tag3' },
];

const tagsWithIcons: Tag[] = [
    { label: 'tag1', iconName: 'mail' },
    { label: 'tag2', iconName: 'home' },
    { label: 'tag3', iconName: 'calendar' },
];

describe('Tags', () => {
    test('previous item\'s delete-button should be focused when an item is deleted', () => {
        const wrapper = mountWithTheme(
            <Tags options={tags} onDelete={jest.fn()} />,
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'tag3-delete-button').simulate('click');

        expect(document.activeElement).toBe(getByTestId(wrapper, 'tag2-delete-button').getDOMNode());
    });

    test('matches snapshot (size small)', () => {
        const tree = renderWithProviders(<Tags options={tags} size="small" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (size medium)', () => {
        const tree = renderWithProviders(<Tags options={tags} size="medium" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (with icons)', () => {
        const tree = renderWithProviders(<Tags options={tagsWithIcons} />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (deletable)', () => {
        const tree = renderWithProviders(<Tags options={tags} onDelete={jest.fn()} />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile, small)', () => {
        const tree = renderWithProviders(<Tags options={tags} size='small' />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (mobile, medium)', () => {
        const tree = renderWithProviders(<Tags options={tags} size="medium" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
