import React, { Component } from 'react';
import styled from 'styled-components';
import SearchIcon from 'feather-icons/dist/icons/search.svg';
import XIcon from 'feather-icons/dist/icons/x.svg';

import VisuallyHidden from '../../a11y/visuallyhidden';
import SearchButton from '../../buttons/search-button';

import style from '../styles/inputs';
import Label from '../label';

const SearchWrapper = styled.div`
  display: flex;

  label {
    bottom: 0.5rem;
    color: rgb(99, 114, 130);
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
`;

const IcoSearch = styled(SearchIcon)`
  color: ${props => (props.disabled ? 'rgb(156, 167, 180)' : 'rgb(99, 114, 130)')};
  height: 1rem;
  width: 1rem;
`;

const IcoReset = styled(XIcon)`
  color: black;
  height: 0.75rem;
  width: 0.75rem;
`;

const Input = styled.input`
  ${style} /* Must be the first rule */
  border-radius: ${props => (props.hasButton && '0.25rem 0 0 0.25rem')};
  line-height: 1;
  padding: 0.5rem 1.75rem 0.5rem 2rem;

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
  border: 0;
  bottom: 0.5rem;
  cursor: pointer;
  display: none;
  height: 0.75rem;
  margin: auto;
  padding: 0;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 0.75rem;

  input:valid + & {
    display: inline-block;
  }
`;

const SearchSubmit = styled(SearchButton)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  position: relative;
`;

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    handleChange(event) {
        const { onChange } = this.props;
        const newValue = event.target.value;

        this.setState({ value: newValue });
        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    }

    handleKeyDown(event) {
        const { onSearch } = this.props;
        const { value } = this.state;

        if (typeof onSearch === 'function' && event.keyCode === 13) {
            onSearch(value);
        }
    }

    handleReset() {
        this.setState({ value: '' });
    }

    handleSearchButtonClick() {
        const { onSearch } = this.props;
        const { value } = this.state;

        onSearch(value);
    }

    render() {
        const { disabled, hasButton, id, label } = this.props;
        const { value } = this.state;

        return (
            <SearchWrapper>
                <InnerWrapper>
                    <Label forId={id}>
                        <IcoSearch disabled={disabled} />
                        <VisuallyHidden>{label}</VisuallyHidden>
                    </Label>

                    <Input
                        autoComplete="on"
                        disabled={disabled}
                        onChange={event => this.handleChange(event)}
                        onKeyDown={event => this.handleKeyDown(event)}
                        hasButton={hasButton}
                        id={id}
                        type="search"
                        value={value}
                    />

                    <Reset onClick={this.handleReset}>
                        <IcoReset />
                        <VisuallyHidden>Reset</VisuallyHidden>
                    </Reset>
                </InnerWrapper>
                {
                    hasButton &&
                    (
                        <SearchSubmit
                            disabled={disabled}
                            type="submit"
                            onClick={this.handleSearchButtonClick}
                        >
                            {label}
                        </SearchSubmit>
                    )
                }
            </SearchWrapper>
        );
    }
}

export default SearchInput;
