import { AriaAttributes, FunctionComponent, PropsWithChildren, ReactElement, ReactNode } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';
import { IconButton } from '../buttons';
import { useCarousel } from './use-carousel';

const Main = styled.section`
    align-items: center;
    display: flex;
    word-break: break-word;
`;

const Content = styled.div`
    height: 100%;
    margin: 0;
    overflow: hidden;
    padding: 0;
    width: 100%;
`;

interface SlideProps {
    index: number;
}

const Slide: StyledComponent<'div', DefaultTheme, SlideProps> = styled.div.attrs<SlideProps>({
    role: 'group',
    'aria-roledescription': 'slide',
})`
    flex-grow: 1;
    height: 100%;
    width: 100%;
`;

const Slides = styled.div.attrs({ 'aria-live': 'polite' })`
    align-items: center;
    display: flex;
`;

const Dots = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 4px;
`;

interface DotProps {
    active?: boolean;
}

const Dot = styled.button<DotProps>`
    background-color: ${({ active, theme }) => (active ? theme.component['carousel-dot-selected-background-color'] : theme.component['carousel-dot-unselected-background-color'])};
    border: 1px solid  ${({ theme }) => theme.component['carousel-dot-border-color']};
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    height: 12px;
    margin-bottom: 4px;
    width: 12px;

    ${focus};

    & + & {
        margin-left: var(--spacing-1x);
    }
`;

interface NavigationButtonProps {
    disabled?: boolean;
}

const NavigationButton = styled(IconButton)<NavigationButtonProps>`
    visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};

    ${focus};
`;

export interface CarouselProps extends Pick<AriaAttributes, 'aria-label'> {
    autoTransitionDelay?: number;
    /**
     * Anything React can render. Each root element will be rendered as a slide.
     */
    children: ReactNode;
    className?: string;
    header?: ReactNode;
    id?: string;
    initialSlide?: number;
    loop?: boolean;
    transitionTime?: number;
    withArrows?: boolean;
}

function getChildrenAsArray(children: ReactNode): ReactNode[] {
    if (!children) {
        return [];
    }
    if (Array.isArray(children)) {
        return children;
    }
    return [children];
}

export const Carousel: FunctionComponent<PropsWithChildren<CarouselProps>> = ({
    autoTransitionDelay,
    className,
    id,
    initialSlide = 0,
    children,
    header = null,
    loop = false,
    transitionTime = 400,
    withArrows = true,
    ...props
}) => {
    const carouselId = useId(id);

    const childrenAsArray = getChildrenAsArray(children);
    const slidesCount = childrenAsArray.length;
    const {
        active, setActive, handlers, style,
    } = useCarousel({
        autoTransitionDelay,
        initial: initialSlide,
        length: slidesCount,
        loop,
        transitionTime,
    });

    function renderDots(): ReactElement {
        return (
            <Dots data-testid="carousel-dots">
                {childrenAsArray.map((_, i) => {
                    const isActive = i === active;

                    return (
                        <Dot
                            data-testid={`carousel-dot-${i}`}
                            key={i /* eslint-disable-line react/no-array-index-key */}
                            active={isActive}
                            aria-controls={carouselId}
                            aria-current={isActive}
                            onClick={() => setActive(i)}
                        />
                    );
                })}
            </Dots>
        );
    }

    function renderSlides(): ReactElement {
        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Slides id={carouselId} data-testid="carousel-slides" {...handlers.mouse} style={style} aria-live="polite">
                <Slide
                    index={-1}
                    data-testid="carousel-slide--1"
                    aria-hidden
                >
                    {childrenAsArray[slidesCount - 1]}
                </Slide>

                {childrenAsArray.map((child, i) => (
                    <Slide
                        index={i}
                        data-testid={`carousel-slide-${i}`}
                        aria-hidden={i !== active}
                        key={i /* eslint-disable-line react/no-array-index-key */}
                        aria-label={`${i + 1} of ${slidesCount}`}
                    >
                        {child}
                    </Slide>
                ))}

                <Slide index={slidesCount} data-testid={`carousel-slide-${slidesCount}`} aria-hidden>
                    {childrenAsArray[0]}
                </Slide>
            </Slides>
        );
    }

    const disablePrevious = !loop && active === 0;
    const disableNext = !loop && active === slidesCount - 1;
    return (
        <Main className={className} aria-label={props['aria-label']} aria-roledescription="carousel">
            {withArrows && (
                <NavigationButton
                    buttonType="tertiary"
                    onClick={!disablePrevious ? handlers.onPrevious : undefined}
                    disabled={disablePrevious}
                    data-testid="carousel-previous"
                    aria-label="previous"
                    aria-controls={carouselId}
                    type="button"
                    iconName="arrowLeft"
                />
            )}

            <Content>
                {header}

                {renderSlides()}

                {renderDots()}
            </Content>

            {withArrows && (
                <NavigationButton
                    buttonType="tertiary"
                    onClick={!disableNext ? handlers.onNext : undefined}
                    disabled={disableNext}
                    data-testid="carousel-next"
                    aria-label="next"
                    aria-controls={carouselId}
                    type="button"
                    iconName="arrowRight"
                />
            )}
        </Main>
    );
};
