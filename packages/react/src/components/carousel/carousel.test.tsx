import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Carousel } from './carousel';
import { useCarousel, UseCarouselResponse } from './use-carousel';

jest.mock('../../utils/uuid');
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
        jest.mocked(useCarousel).mockReturnValue(useCarouselResponse);
    });

    it('should match snapshot', () => {
        const { container } = renderWithProviders(<Carousel>{slides}</Carousel>);

        expect(container.firstChild).toMatchSnapshot();
    });

    describe('Padding slides', () => {
        it('should add padding slides so looping does not jump', () => {
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const renderedSlides = screen.getByTestId('carousel-slides');

            expect(renderedSlides.children).toHaveLength(numberOfSlides + 2);
        });

        it('should add last slide as padding at the beginning', () => {
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const paddingSlide = screen.getByTestId('carousel-slide--1');

            expect(paddingSlide).toHaveTextContent('Slide 5');
        });

        it('should add first slide as padding at the end', () => {
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const paddingSlide = screen.getByTestId('carousel-slide-5');

            expect(paddingSlide).toHaveTextContent('Slide 1');
        });
    });

    describe('Navigation', () => {
        it('should go forward when next is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Carousel>{slides}</Carousel>);

            await user.click(screen.getByTestId('carousel-next'));

            expect(useCarouselResponse.handlers.onNext).toHaveBeenCalledTimes(1);
        });

        it('should not go forward when next is clicked and last slide is active', async () => {
            const user = userEvent.setup();
            useCarouselResponse.active = numberOfSlides - 1;
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const nextButton = screen.getByTestId('carousel-next');

            await expect(user.click(nextButton)).toReject();
            expect(nextButton).toHaveAttribute('aria-disabled', 'true');
            expect(nextButton).not.toBeVisible();
            expect(useCarouselResponse.handlers.onNext).not.toHaveBeenCalled();
        });

        it('should go backward when previous is clicked', async () => {
            const user = userEvent.setup();
            useCarouselResponse.active = 3;
            renderWithProviders(<Carousel>{slides}</Carousel>);

            await user.click(screen.getByTestId('carousel-previous'));

            expect(useCarouselResponse.handlers.onPrevious).toHaveBeenCalledTimes(1);
        });

        it('should not go backward when previous is clicked and first slide is active', async () => {
            const user = userEvent.setup();
            useCarouselResponse.active = 0;
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const previousButton = screen.getByTestId('carousel-previous');

            await expect(user.click(previousButton)).toReject();
            expect(previousButton).toHaveAttribute('aria-disabled', 'true');
            expect(previousButton).not.toBeVisible();
            expect(useCarouselResponse.handlers.onPrevious).not.toHaveBeenCalled();
        });

        describe('Loop', () => {
            it('should go backward when previous is clicked and first slide is active', async () => {
                const user = userEvent.setup();
                useCarouselResponse.active = 0;
                renderWithProviders(<Carousel loop>{slides}</Carousel>);

                await user.click(screen.getByTestId('carousel-previous'));

                expect(useCarouselResponse.handlers.onPrevious).toHaveBeenCalled();
            });

            it('should go forward when next is clicked and last slide is active', async () => {
                const user = userEvent.setup();
                useCarouselResponse.active = numberOfSlides - 1;
                renderWithProviders(<Carousel loop>{slides}</Carousel>);

                await user.click(screen.getByTestId('carousel-next'));

                expect(useCarouselResponse.handlers.onNext).toHaveBeenCalled();
            });
        });
    });

    describe('Navigation with Dots', () => {
        it('should display one dot per slide', () => {
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const dots = screen.getAllByTestId(/^carousel-dot-/);

            expect(dots).toHaveLength(5);
        });

        it('should go to slide when dot is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Carousel>{slides}</Carousel>);

            await user.click(screen.getByTestId('carousel-dot-2'));

            expect(useCarouselResponse.setActive).toHaveBeenCalledWith(2);
        });

        it('should not set dot as active when other slide is active', () => {
            useCarouselResponse.active = 0;
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const dot = screen.getByTestId('carousel-dot-3');

            expect(dot).toHaveAttribute('aria-current', 'false');
        });

        it('should set dot as active when slide is active', () => {
            useCarouselResponse.active = 3;
            renderWithProviders(<Carousel>{slides}</Carousel>);

            const dot = screen.getByTestId('carousel-dot-3');

            expect(dot).toHaveAttribute('aria-current', 'true');
        });
    });
});
