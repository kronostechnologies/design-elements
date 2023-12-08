import SearchIcon from 'feather-icons/dist/icons/search.svg';
import XIcon from 'feather-icons/dist/icons/x.svg';
import { ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useMemo, useRef, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
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

function iconColor(props: { theme: Theme, disabled?: boolean }): string {
    if (props.disabled) {
        return props.theme.greys['mid-grey'];
    }

    return props.theme.greys['dark-grey'];
}

const IcoSearch = styled(SearchIcon)`
    color: ${iconColor};
    height: 1rem;
    width: 1rem;
`;

const IcoReset = styled(XIcon)`
    color: ${(props) => props.theme.greys['dark-grey']};
    height: 1.25rem;
    margin: -1px;
    width: 1.25rem;
`;

interface InputProps {
    theme: Theme;
    hasButton: boolean;
    hasIcon: boolean;
    hasReset: boolean;
}

const Input = styled.input<InputProps>`
    /* Must be the first rule */
    ${({ theme }) => inputsStyle(theme)}

    border-radius: ${({ hasButton }) => (hasButton ? 'var(--border-radius) 0 0 var(--border-radius)' : '')};
    border-right: ${({ hasButton }) => (hasButton ? '0' : '')};
    height: 2rem;
    padding-bottom: var(--spacing-half);
    padding-left: ${({ hasIcon }) => (hasIcon ? '1.75rem' : 'var(--spacing-1x)')};
    padding-right: ${({ hasReset }) => (hasReset ? '1.75rem' : 'var(--spacing-1x)')};
    padding-top: var(--spacing-half); /* stylelint-disable-line declaration-block-no-redundant-longhand-properties */

    label + & {
        margin-top: 0;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }
`;

const Reset = styled.button`
    appearance: none;
    background: transparent;
    border: 1px solid transparent;
    bottom: 0.5rem;
    display: none;
    height: 1.25rem;
    margin: auto;

    ${focus};

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
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    position: relative;

    &:focus {
        z-index: 2;
    }
`;

export interface CommonSearchProps {
    id?: string;
    disabled?: boolean;
    label?: string;
    className?: string;
    defaultValue?: string;
    value?: string;
    placeholder?: string;

    onChange?(value: string, event: ChangeEvent<HTMLInputElement>): void;

    onReset?(): void;

    onInputFocus?(event: FocusEvent<HTMLInputElement>): void;

    onSearch?(value: string): void;
}

export interface SearchInputProps extends CommonSearchProps {
    hasButton?: boolean;
    hasIcon?: boolean;
}

export const SearchInput: VoidFunctionComponent<SearchInputProps> = ({
    defaultValue,
    id: providedId,
    onChange,
    onReset,
    onSearch,
    value,
    onInputFocus,
    ...props
}: SearchInputProps) => {
    const { t } = useTranslation('search-input');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        const newValue = event.currentTarget.value;

        onChange?.(newValue, event);
    }, [onChange]);

    const searchCurrentValue: () => void = useCallback(() => {
        onSearch?.(value || inputRef.current?.value || '');
    }, [onSearch, value]);

    const handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (event.key === 'Enter') {
            searchCurrentValue();
        }
    }, [searchCurrentValue]);

    const handleReset: () => void = useCallback(() => {
        onReset?.();
    }, [onReset]);

    const handleSearchButtonClick: () => void = useCallback(() => {
        searchCurrentValue();
    }, [searchCurrentValue]);

    const {
        className, disabled, hasButton, hasIcon, label, placeholder,
    } = props;

    return (
        <SearchWrapper className={className}>
            <InnerWrapper>
                {hasIcon && (
                    <Label forId={id} data-testid="search-icon">
                        <IcoSearch disabled={disabled} />
                        <VisuallyHidden>{label || t('label')}</VisuallyHidden>
                    </Label>
                )}

                <Input
                    ref={inputRef}
                    autoComplete="on"
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={onInputFocus}
                    onKeyDown={handleKeyDown}
                    hasButton={!!hasButton}
                    hasIcon={!!hasIcon}
                    hasReset={!!onReset}
                    id={id}
                    placeholder={placeholder}
                    type="search"
                    defaultValue={defaultValue}
                    value={value}
                    data-testid="search-input"
                />

                {(onReset && value) && (
                    <Reset onClick={handleReset} data-testid="search-reset">
                        <IcoReset />
                        <VisuallyHidden>Reset</VisuallyHidden>
                    </Reset>
                )}
            </InnerWrapper>
            {hasButton && (
                <SearchSubmit
                    disabled={disabled}
                    className="primary"
                    onClick={handleSearchButtonClick}
                    data-testid="search-button"
                />
            )}
        </SearchWrapper>
    );
};
