import { useTranslation } from '@design-elements/i18n/i18n';
import { Theme } from '@design-elements/themes/theme';
import { focus } from '@design-elements/utils/css-state';
import SearchIcon from 'feather-icons/dist/icons/search.svg';
import XIcon from 'feather-icons/dist/icons/x.svg';
import React, { ChangeEvent, KeyboardEvent, useCallback, useMemo, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { SearchButton } from '../buttons/search-button';
import { Label } from '../label/label';
import { inputsStyle } from '../text-input/styles/inputs';
import { VisuallyHidden } from '../visually-hidden/visuallyhidden';

const SearchWrapper = styled.div`
    display: flex;

    label {
        bottom: 0.5rem;
        color: ${(props) => props.theme.greys['dark-grey']};
        display: inline-block;
        height: 1rem;
        left: 0.5rem;
        margin: auto;
        position: absolute;
        top: 0.5rem;
        width: 1rem;
    }
`;

const InnerWrapper = styled.div`
    flex: 1 1 auto;
    position: relative;
    z-index: 1;
`;

const IcoSearch = styled(SearchIcon)`
    color: ${(props: { theme: Theme, disabled?: boolean }) => (props.disabled
        ? props.theme.greys['mid-grey']
        : props.theme.greys['dark-grey'])};
    height: 1rem;
    width: 1rem;
`;

const IcoReset = styled(XIcon)`
    color: ${(props) => props.theme.greys['dark-grey']};
    height: 1.25rem;
    margin: -1px;
    width: 1.25rem;
`;

const Input = styled.input<{ theme: Theme, hasButton?: boolean }>`
    ${({ theme, hasButton }) => `
        ${inputsStyle(theme)} /* Must be the first rule */
        border-radius: ${hasButton && 'var(--border-radius) 0 0 var(--border-radius)'};
        padding: var(--spacing-half) 1.75rem var(--spacing-half) var(--spacing-4x);

        label + & {
          margin-top: 0;
        }

        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          display: none;
        }
`}
`;

const Reset = styled.button`
    appearance: none;
    background: transparent;
    border: 1px solid transparent;
    bottom: 0.5rem;
    cursor: pointer;
    display: none;
    height: 1.25rem;
    margin: auto;
    ${focus}
    padding: 0;
    position: absolute;
    right: 0.25rem;
    top: 0.5rem;
    width: 1.25rem;

    input:valid + & {
        display: inline-block;
    }
`;

const SearchSubmit = styled(SearchButton)`
    border-left: 0;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    position: relative;

    &:focus {
        z-index: 2;
    }
`;

export interface SearchInputProps {
    disabled?: boolean;
    hasButton?: boolean;
    label?: string;
    initialValue?: string;
    placeholder?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onSearch?(value: string): void;
}

export const SearchInput: VoidFunctionComponent<SearchInputProps> = ({
    initialValue, onChange, onSearch, ...props
}: SearchInputProps) => {
    const { t } = useTranslation('search-input');
    const [{ value }, setValue] = useState({ value: initialValue || '' });
    const id = useMemo(uuid, []);

    const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        const newValue = event.currentTarget.value;
        setValue({ value: newValue });

        if (onChange) {
            onChange(event);
        }
    }, [onChange]);

    const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (onSearch && event.key === 'Enter') {
            onSearch(value);
        }
    }, [onSearch, value]);

    const handleReset: () => void = useCallback(() => {
        setValue({ value: '' });
    }, []);

    const handleSearchButtonClick: () => void = useCallback(() => {
        if (onSearch) {
            onSearch(value);
        }
    }, [onSearch, value]);

    const {
        disabled, hasButton, label, placeholder,
    } = props;

    return (
        <SearchWrapper>
            <InnerWrapper>
                <Label forId={id}>
                    <IcoSearch disabled={disabled} />
                    <VisuallyHidden>{label || t('label')}</VisuallyHidden>
                </Label>

                <Input
                    autoComplete="on"
                    disabled={disabled}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    hasButton={hasButton}
                    id={id}
                    placeholder={placeholder}
                    type="search"
                    value={value}
                />

                <Reset data-testid="resetButton" onClick={handleReset}>
                    <IcoReset />
                    <VisuallyHidden>Reset</VisuallyHidden>
                </Reset>
            </InnerWrapper>
            {
                hasButton && (
                    <SearchSubmit
                        disabled={disabled}
                        className="primary"
                        label={label || t('label')}
                        onClick={handleSearchButtonClick}
                    />
                )
            }
        </SearchWrapper>
    );
};
