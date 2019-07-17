import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'feather-icons/dist/icons/search.svg';
import XIcon from 'feather-icons/dist/icons/x.svg';

import VisuallyHidden from '../../a11y/visuallyhidden';

import style from '../styles/inputs';
import { Label } from '../label';

const Form = styled.form`
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
  border-radius: ${props => (props.global && '0.25rem 0 0 0.25rem')};
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

const SearchInput = ({ children, disabled, id, global, label, onInput, onSubmit, ...props }) => (
    <Form role="search" onSubmit={e => { e.preventDefault(); }}>
        <InnerWrapper>
            <Label forId={id}>
                <IcoSearch disabled={disabled} />
                <VisuallyHidden>{label}</VisuallyHidden>
            </Label>

            <Input
                {...props}
                autoComplete="on"
                disabled={disabled}
                global={global}
                onInput={onInput}
                onSubmit={onSubmit}
                id={id}
                type="search"
            />

            <Reset type="reset">
                <IcoReset />
                <VisuallyHidden>Reset</VisuallyHidden>
            </Reset>
        </InnerWrapper>
        {children}
    </Form>
);

export { SearchInput };
