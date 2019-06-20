import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'feather-icons/dist/feather-sprite.svg';
import XIcon from 'feather-icons/dist/icons/x.svg';

import SVG from '../../svg';
import VisuallyHidden from '../../a11y/visuallyhidden';

import style from '../styles/inputs';
import Label from '../label';

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
  position: relative;
`;

const IcoSearch = styled(SVG)`
  color: #e2732d;
  height: 1rem;
  width: 1rem;
`;

const IcoReset = styled(SVG)`
  color: black;
  height: 0.75rem;
  width: 0.75rem;
`;

const Input = styled.input`
  ${style}
  border-radius: ${props => (props.global && '0.25rem 0 0 0.25rem')};
  line-height: 1;
  padding: 0.5rem 1.75rem 0.5rem 2rem;

  label + & {
    margin-top: 0;
  }
`;

const Reset = styled.button`
  appearance: none;
  background: rgb(99, 114, 130);
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

export default ({ children, disabled, id, global, label, ...props }) => (
    <Form action="" id="searchForm" role="search">
        <InnerWrapper>
            <Label forId={id}>
                <IcoSearch svg={SearchIcon} />
                <VisuallyHidden>{label}</VisuallyHidden>
            </Label>

            <Input
                {...props}
                autoComplete="on"
                disabled={disabled}
                global={global}
                id={id}
                required
                type="search"
            />

            <Reset type="reset">
                <IcoReset svg={XIcon} />
                <VisuallyHidden>Reset</VisuallyHidden>
            </Reset>
        </InnerWrapper>
        {children}
    </Form>
);
