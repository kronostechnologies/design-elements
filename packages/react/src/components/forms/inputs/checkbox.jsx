import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  height: 16px;
  margin: 0;
  width: 16px;
`;

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checked: nextProps.checked });
    }

    handleChange() {
        const { onChange } = this.props;
        this.toggle();

        if (onChange) {
            onChange();
        }
    }

    toggle() {
        const { checked } = this.state;
        this.setState({ checked: !checked });
    }

    render() {
        const { checked } = this.state;
        return (
            <Input checked={checked} onChange={event => this.handleChange(event)} type="checkbox" />
        );
    }
}

export default Checkbox;
