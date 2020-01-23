import { findByTestId, getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { shallow } from 'enzyme';
import React, { ReactNode } from 'react';
import { mocked } from 'ts-jest/utils';
import { renderWithTheme } from '../../test-utils/theme-wrapped';
import { Carousel } from './carousel';
import { useCarousel, UseCarouselResponse } from './use-carousel';

jest.mock('./use-carousel');

describe('Carousel', () => {
    let slides: ReactNode[];
    let numberOfSlides: number;
    let useCarouselResponse: UseCarouselResponse;

    beforeEach(() => {
        slides = [
            <div key={1}>Slide 1</div>,
            <div key={2}>Slide 2</div>,
            <div key={3}>Slide 3</div>,
            <div key={4}>Slide 4</div>,
            <div key={5}>Slide 5</div>,
        ];
        numberOfSlides = slides.length;

        useCarouselResponse = {
            active: 0,
            handlers: {
                mouse: { ref: jest.fn(), onMouseDown: jest.fn() },
                onNext: jest.fn(),
                onPrevious: jest.fn(),
            },
            setActive: jest.fn(),
            style: {},
        };
        mocked(useCarousel).mockReturnValue(useCarouselResponse);
    });

    it('should match snapshot', () => {
        const wrapper = renderWithTheme(<Carousel>{slides}</Carousel>);

        expect(wrapper).toMatchSnapshot();
    });

    describe('Padding slides', () => {
        it('should add padding slides so looping does not jump', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const renderedSlides = getByTestId(wrapper, 'carousel-slides', '$');

            expect(renderedSlides.children().length).toBe(numberOfSlides + 2);
        });

        it('should add last slide as padding at the beginning', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const paddingSlide = getByTestId(wrapper, 'carousel-slide--1');

            expect(paddingSlide.text()).toBe('Slide 5');
        });

        it('should add first slide as padding at the end', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const paddingSlide = getByTestId(wrapper, 'carousel-slide-5');

            expect(paddingSlide.text()).toBe('Slide 1');
        });
    });

    describe('Navigation', () => {
        it('should go forward when next is clicked', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            getByTestId(wrapper, 'carousel-next').simulate('click');

            expect(useCarouselResponse.handlers.onNext).toHaveBeenCalledTimes(1);
        });

        it('should not go forward when next is clicked and last slide is active', () => {
            useCarouselResponse.active = numberOfSlides - 1;
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const nextWrapper = getByTestId(wrapper, 'carousel-next').simulate('click');

            expect(nextWrapper.props().disabled).toBe(true);
            expect(useCarouselResponse.handlers.onNext).not.toHaveBeenCalled();
        });

        it('should go backward when previous is clicked', () => {
            useCarouselResponse.active = 3;
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            getByTestId(wrapper, 'carousel-previous').simulate('click');

            expect(useCarouselResponse.handlers.onPrevious).toHaveBeenCalledTimes(1);
        });

        it('should not go backward when previous is clicked and first slide is active', () => {
            useCarouselResponse.active = 0;
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const previousWrapper = getByTestId(wrapper, 'carousel-previous').simulate('click');

            expect(previousWrapper.props().disabled).toBe(true);
            expect(useCarouselResponse.handlers.onPrevious).not.toHaveBeenCalled();
        });

        describe('Loop', () => {
            it('should go backward when previous is clicked and first slide is active', () => {
                useCarouselResponse.active = 0;
                const wrapper = shallow(<Carousel loop={true}>{slides}</Carousel>);

                getByTestId(wrapper, 'carousel-previous').simulate('click');

                expect(useCarouselResponse.handlers.onPrevious).toHaveBeenCalled();
            });

            it('should go forward when next is clicked and last slide is active', () => {
                useCarouselResponse.active = numberOfSlides - 1;
                const wrapper = shallow(<Carousel loop={true}>{slides}</Carousel>);

                getByTestId(wrapper, 'carousel-next').simulate('click');

                expect(useCarouselResponse.handlers.onNext).toHaveBeenCalled();
            });
        });
    });

    describe('Navigation with Dots', () => {
        it('should display one dot per slide', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const dots = findByTestId(wrapper, 'carousel-dot-', '^');

            expect(dots.length).toBe(5);
        });

        it('should go to slide when dot is clicked', () => {
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            getByTestId(wrapper, 'carousel-dot-2').simulate('click');

            expect(useCarouselResponse.setActive).toHaveBeenCalledWith(2);
        });

        it('should set dot as active when slide is active', () => {
            useCarouselResponse.active = 3;
            const wrapper = shallow(<Carousel>{slides}</Carousel>);

            const dot = getByTestId(wrapper, 'carousel-dot-3');

            expect(dot.props().active).toBe(true);
        });
    });
});
