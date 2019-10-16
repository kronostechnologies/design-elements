import React, { ChangeEvent, ReactElement } from 'react';

import Calendar from './calendar/calendar';
import { getDateISO, isDate } from './calendar/calendar-helper';
import * as Styled from './styles';

interface DatePickerProps {
    disabled?: boolean;
    max?: string;
    min?: string;
    position?: string;
    required?: boolean;
    valid?: boolean;
    value?: Date;
    validationErrorMessage?: string;
    onDateChanged?(date: Date | null, valid?: boolean): void;
}

class Datepicker extends React.Component
  <DatePickerProps, {}> {
    state = {
        date: null,
        calendarOpen: false,
        validity: this.props.valid !== undefined ? this.props.valid : true,
    };

    dateCheck = (date: Date) => {
        let dateCurrent: string | number | undefined | Date = getDateISO(new Date(date));
        const maxDate = this.props.max ? new Date(this.props.max) : new Date();
        const minDate = this.props.min ? new Date(this.props.min) : new Date();

        if (dateCurrent === undefined) dateCurrent = new Date();
        maxDate.setDate(maxDate.getDate() + 1);
        minDate.setDate(minDate.getDate() + 1);

        const max = this.props.max ? getDateISO(new Date(maxDate)) : false;
        const min = this.props.min ? getDateISO(new Date(minDate)) : false;

        if (max && !min) {
            return (dateCurrent <= max);
        } else if (!max && min) {
            return (dateCurrent >= min);
        } else if (max && min) {
            return (dateCurrent >= min && dateCurrent <= max);
        } else {
            return (true);
        }
    }

    toggleCalendar = () => this.setState({ calendarOpen: !this.state.calendarOpen });

    handleChange = (evt: ChangeEvent) => evt.preventDefault();

    handleDateChange = (date: Date) => {
        const { onDateChanged } = this.props;
        const { date: currentDate } = this.state;
        const newDate = getDateISO(date);
        this.setState({ validity: this.dateCheck(date) });

        currentDate !== newDate &&
          this.setState({ date: newDate, calendarOpen: false }, () => {
              typeof onDateChanged === 'function' && onDateChanged(this.state.date, this.state.validity);
          });
    };

    componentDidMount(): void {
        const { value: date } = this.props;
        const newDate = date && new Date(date);
        newDate && newDate.setDate(newDate.getDate() + 1);

        isDate(newDate) && this.setState({ date: getDateISO(newDate) });
    }

    componentDidUpdate(
        prevProps: Readonly<{
            value?: Date;
            onDateChanged?(date: null, valid?: boolean): void;
        }>): void {
        let dateISO;
        let prevDateISO;
        if (this.props.value) {
            const { value: date } = this.props;
            dateISO = getDateISO(new Date(date));
        }
        if (prevProps.value) {
            const { value: prevDate } = prevProps;
            prevDateISO = getDateISO(new Date(prevDate));
        }
        dateISO !== prevDateISO && this.setState({ date: dateISO });
    }

    render(): ReactElement {
        const { date, calendarOpen } = this.state;
        const disabledValue = this.props.disabled ? this.props.disabled : false;

        return (
          <Styled.DatePickerContainer
            disabled={disabledValue}
            data-valid={this.state.validity}
          >
            <Styled.DatePickerFormGroup disabled={disabledValue}>
              <Styled.DatePickerLabel disabled={disabledValue}>
                <Styled.Calendar disabled={disabledValue} />
              </Styled.DatePickerLabel>
              <Styled.DatePickerInput
                type="text"
                // @ts-ignore
                value={date ? date : ''}
                onChange={this.handleChange}
                // @ts-ignore
                onBlur={this.handleDateChange}
                pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                placeholder="AAAA-MM-JJ"
                disabled={disabledValue}
                focus={this.state.calendarOpen}
                required={this.props.required !== undefined ? this.props.required : false}
                valid={this.state.validity}
              />
              <Styled.ErrorMessage className="error-message" style={this.state.validity ? { display: 'none' } : {}}>
                {this.props.validationErrorMessage || 'Invalid date'}
              </Styled.ErrorMessage>
            </Styled.DatePickerFormGroup>

            <Styled.DatePickerDropdown
              isOpen={calendarOpen}
              toggle={this.toggleCalendar}
            >
              <Styled.DatePickerDropdownToggle
                color="transparent"
                disabled={disabledValue}
              />
              <Styled.DatePickerDropdownMenu
                position={this.props.position ? this.props.position : 'bottomRight'}
                open={calendarOpen}
              >
                {calendarOpen && (
                  <Calendar
                    // @ts-ignore
                    date={date && new Date(date)}
                    onDateChanged={this.handleDateChange}
                    position={this.props.position ? this.props.position : 'bottomRight'}
                    max={this.props.max ? new Date(this.props.max).getFullYear() : new Date().getFullYear()}
                    min={this.props.min ? new Date(this.props.min).getFullYear() : 1900}
                  />
                )}
              </Styled.DatePickerDropdownMenu>
            </Styled.DatePickerDropdown>
          </Styled.DatePickerContainer>
        );
    }
}

export default Datepicker;
