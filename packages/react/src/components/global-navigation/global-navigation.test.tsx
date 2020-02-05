import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { GlobalNavigation } from './global-navigation';

describe('GlobalNavigation', () => {
    const onInfoIconClick = jest.fn();

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <GlobalNavigation
                    items={[{
                        icon: 'home',
                        title: 'home',
                        onClick: jest.fn(),
                    },
                    {
                        icon: 'open',
                        title: 'portfolio',
                        onClick: jest.fn(),
                    }]}
                    footerNavPopoverContent={<div>Legal mentions</div>}
                    onInfoIconClick={onInfoIconClick}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot', () => {
        const callbackOne = jest.fn();
        const callbackSecond = jest.fn();

        const wrapper = mount(
            ThemeWrapped(
                <GlobalNavigation
                    items={[
                        {
                            icon: 'home',
                            title: 'home',
                            onClick: callbackOne,
                        },
                        {
                            icon: 'open',
                            title: 'portfolio',
                            onClick: callbackSecond,
                        },
                    ]}
                    footerNavPopoverContent={<div>Legal mentions</div>}
                    onInfoIconClick={onInfoIconClick}
                />,
            ),
        );

        wrapper.find('[title="home"]').at(0).simulate('click');
        expect(callbackOne).toHaveBeenCalledTimes(1);

        wrapper.find('[title="portfolio"]').at(0).simulate('click');
        expect(callbackSecond).toHaveBeenCalledTimes(1);
    });
});
