import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Popover } from './popover';

describe('Popover', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Popover target={<button>target</button>}>
                <div>content</div>
            </Popover>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Toggle the popover content into the dom on target click', () => {
        const wrapper = mount(
            <Popover target={<button id="target">target</button>}>
                <div id="content">popover content</div>
            </Popover>,
        );

        const targetEl = wrapper.find('#target');

        targetEl.simulate('click');
        expect(document.getElementById('content')).not.toBeNull();

        targetEl.simulate('click');
        expect(document.getElementById('content')).toBeNull();
    });
});
