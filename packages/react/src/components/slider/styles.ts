import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import styled from 'styled-components';
import { ValueTooltipContainer } from './value-tooltip';

export const Labels = styled.div`
    color: ${({ theme }) => theme.component['slider-track-empty-label-text-color']};
    display: flex;
    font-size: 0.75rem;
    justify-content: space-between;
    margin-top: 2px;
`;

export const SliderContainer = styled.div`
    padding: 0 12px;
`;

export const StyledSlider = styled(BaseSlider)`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 8px;
    padding: 8px 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    width: 100%;

    & .${sliderClasses.rail} {
        background-color: ${({ theme }) => theme.component['slider-track-empty-background-color']};
        border-radius: 99px;
        display: block;
        height: 8px;
        margin-left: -12px;
        padding: 0 12px;
        position: absolute;
        width: 100%;
    }

    & .${sliderClasses.track} {
        background-color: ${({ theme }) => theme.component['slider-track-filled-background-color']};
        border-radius: 99px;
        display: block;
        height: 8px;
        margin-left: -12px;
        padding: 0 12px;
        position: absolute;
    }

    & .${sliderClasses.thumb} {
        border-radius: 50%;
        display: flex;
        height: 32px;
        justify-content: center;
        margin-left: -16px;
        position: absolute;
        width: 32px;

        &::before {
            background-color: ${({ theme }) => theme.component['slider-thumb-background-color']};
            border: 2px solid ${({ theme }) => theme.component['slider-thumb-border-color']};
            border-radius: 50%;
            box-sizing: border-box;
            content: '';
            display: block;
            height: 24px;
            left: 50%;
            outline: 0;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transform-origin: center;
            transition-duration: 120ms;
            transition-property: box-shadow, width, height;
            width: 24px;
        }
        
        &.${sliderClasses.active},
        &:hover {
            &::before {
                height: 32px;
                width: 32px;
            }
        }

        &.${sliderClasses.focusVisible} {
            &::before {
                box-shadow: inset 0 0 0 2px ${({ theme }) => theme.component['focus-inside-border-color']};
            }
        }
        
        &.${sliderClasses.active} {
            &::before {
                box-shadow: inset 0 0 0 2px ${({ theme }) => theme.component['slider-thumb-border-color']};
            }
        }

        &.${sliderClasses.focusVisible},
        &:hover {
            ${ValueTooltipContainer} {
                transform: scale(1);
            }
        }
    }

    & .${sliderClasses.mark} {
        background-color: ${({ theme }) => theme.component['slider-track-empty-mark-background-color']};
        border-radius: 99%;
        height: 2px;
        position: absolute;
        transform: translateX(-50%);
        width: 2px;
    }

    & .${sliderClasses.markActive} {
        background-color: ${({ theme }) => theme.component['slider-track-filled-mark-background-color']};
    }

    &.${sliderClasses.disabled} {
        cursor: default;
        pointer-events: none;
        
        .${sliderClasses.rail} {
            background-color: ${({ theme }) => theme.component['slider-track-empty-disabled-background-color']};
        }

        .${sliderClasses.track} {
            background-color: ${({ theme }) => theme.component['slider-track-filled-disabled-background-color']};
        }

        .${sliderClasses.thumb} {
            &::before {
                border-color: ${({ theme }) => theme.component['slider-thumb-disabled-border-color']};
            }
        }

        .${sliderClasses.mark} {
            background-color: ${({ theme }) => theme.component['slider-track-empty-mark-disabled-background-color']};
        }

        & .${sliderClasses.markActive} {
            background-color: ${({ theme }) => theme.component['slider-track-filled-mark-disabled-background-color']};
        }
    }
`;
