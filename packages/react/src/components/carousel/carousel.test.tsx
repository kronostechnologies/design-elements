import { ReactNode } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Carousel } from './carousel';
import { useCarousel, UseCarouselResponse } from './use-carousel';

jest.mock('../../utils/uuid');
jest.mock('./use-carousel');

describe('Carousel', () => {
    let slides: ReactNode[];
    let useCarouselResponse: UseCarouselResponse;

    beforeEach(() => {
        slides = [
            <div key={1}>Slide 1</div>,
            <div key={2}>Slide 2</div>,
            <div key={3}>Slide 3</div>,
            <div key={4}>Slide 4</div>,
            <div key={5}>Slide 5</div>,
        ];

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
});
