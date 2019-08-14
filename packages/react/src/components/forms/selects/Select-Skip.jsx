import React, { Component } from 'react';
import Select from './Select';
import ChooseRadio from '../../choosers/controls/choose-radio';

export default class SelectSkip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(value) {
        if (value === '') {
            this.setState({ checked: true });
        } else {
            this.setState({ checked: false });
        }
    }

    handleRadioChange(event, selectElemId) {
        const select = document.getElementById(selectElemId);

        if (select.selectedIndex !== 0) {
            select.selectedIndex = 0;

            return this.setState({ checked: true });
        }

        return this.setState({ checked: false });
    }

    render() {
        const { children, id, label, options, valid, validMsg, ...props } = this.props;
        const { checked } = this.state;

        return (
            <>
                <Select
                    {...props}
                    id={id}
                    label={label}
                    onChange={value => this.handleSelectChange(value)}
                    options={options}
                />

                <ChooseRadio
                    checked={checked}
                    groupName="provinces"
                    id={`${id}_skip`}
                    onChange={value => this.handleRadioChange(value, id)}
                    value="skip"
                >
                    {children}
                </ChooseRadio>
            </>
        );
    }
}
