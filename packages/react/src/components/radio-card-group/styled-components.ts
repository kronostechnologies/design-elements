import styled from 'styled-components';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

interface InputContainerProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

interface DescriptionProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

interface CardProps {
    disabled?: boolean;
    isMobile: boolean;
    isChecked?: boolean;
    theme: Theme;
}

export const RadioInput = styled.span<CardProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.greys['dark-grey'])};
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    margin-right: var(--spacing-2x);
    vertical-align: middle;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
`;

function getContentColor({ disabled, isChecked, theme }: InputContainerProps): string {
    if (disabled) {
        return theme.greys['mid-grey'];
    } if (isChecked) {
        return theme.main['primary-2'];
    }
    return theme.greys['dark-grey'];
}

function getLabelBackgroundColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.greys['light-grey'];
    } if (isChecked) {
        return theme.main['primary-1.4'];
    }
    return theme.greys.white;
}

function getLabelBorderColor({ disabled, isChecked, theme }: CardProps): string {
    if (disabled) {
        return theme.greys.grey;
    } if (isChecked) {
        return theme.main['primary-2'];
    }
    return theme.greys['dark-grey'];
}

export const Fieldset = styled.fieldset`
  border: none;
`;

export const Legend = styled.legend<{ isMobile: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span<CardProps>`
  align-items: center;
  color: ${getContentColor};
  display: flex;
  flex-direction: row;
  font-weight: var(--font-semi-bold);
  letter-spacing: initial;
  line-height: 1.5rem;
  margin-bottom: var(--spacing-1x);
`;

export const Description = styled.span<DescriptionProps>`
    color: ${getContentColor};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    padding-left: var(--spacing-4x);
`;

export const Card = styled.div<CardProps>`
  background-color: ${getLabelBackgroundColor};
  border: 1px solid ${getLabelBorderColor};
  border-radius: var(--border-radius-2x);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: var(--spacing-2x) var(--spacing-3x);
  width: 100%;

  &:focus-within {
    ${({ theme }) => focus({ theme }, false, '&')}
  }

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.greys.grey};
    border-color: ${({ theme }) => theme.greys['dark-grey']};
    cursor: pointer;

    /* stylelint-disable-next-line declaration-block-semicolon-newline-after,rule-empty-line-before */
    ${Description},
    ${Title} {
      color: ${({ theme }) => theme.greys.black};
    }
  }

  &:not(:last-child) {
    margin-bottom: var(--spacing-1x);
  }
`;

export const HiddenInput = styled.input<{ isMobile: boolean }>`
  height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0.125rem;
  width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};

  &:checked + ${Label} > ${Title} > ${RadioInput} {
    border: 2px solid ${({ theme }) => theme.main['primary-1.1']};

    &::after {
      background-color: ${({ theme }) => theme.main['primary-1.1']};
      border-radius: 50%;
      content: '';
      height: var(--size-half);
      margin: 6px;
      position: absolute;
      transform: translate(-50%, -50%);
      width: var(--size-half);
    }
  }
`;
