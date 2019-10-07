import React, { ChangeEvent, ReactElement } from 'react';

import Calendar from './calendar/calendar';
import { getDateISO, isDate } from './calendar/calendar-helper';
import * as Styled from './styles';

interface DatePickerProps {
    disabled?: boolean;
    position: string;
    required?: boolean;
    valid?: boolean;
    value?: Date;
    validationErrorMessage?: string;
    onDateChanged?(date: Date | null, calendarOpen?: false): void;
}

class Datepicker extends React.Component
  <DatePickerProps, {}> {
    state = { date: null, calendarOpen: false };

    toggleCalendar = () =>
      this.setState({ calendarOpen: !this.state.calendarOpen });

    handleChange = (evt: ChangeEvent) => evt.preventDefault();

    handleDateChange = (date: Date) => {
        const { onDateChanged } = this.props;
        const { date: currentDate } = this.state;
        const newDate = date ? getDateISO(date) : null;

        currentDate !== newDate &&
          this.setState({ date: newDate, calendarOpen: false }, () => {
              typeof onDateChanged === 'function' && onDateChanged(this.state.date);
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
            onDateChanged?(date: null, calendarOpen?: false | undefined): void;
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

    testPreventDefault(e: any) {
        const form = e.target.form;
        form.preventDefault();
    }

    render(): ReactElement {
        const { date, calendarOpen } = this.state;
        const disabledValue = this.props.disabled ? this.props.disabled : false;
        const validValue = this.props.valid !== undefined ? this.props.valid : true;

        return (
          // @ts-ignore
          <Styled.DatePickerContainer disabled={disabledValue} onSubmit={this.testPreventDefault}>
            <Styled.DatePickerFormGroup disabled={disabledValue}>
              <Styled.DatePickerLabel disabled={disabledValue}>
                <Styled.Calendar disabled={disabledValue} />
              </Styled.DatePickerLabel>
              <Styled.DatePickerInput
                type="text"
                // @ts-ignore
                value={date ? date : undefined}
                onChange={this.handleChange}
                pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
                placeholder="AAAA-MM-JJ"
                disabled={disabledValue}
                focus={this.state.calendarOpen}
                required={this.props.required !== undefined ? this.props.required : false}
                valid={validValue}
              />
              <Styled.ErrorMessage className="error-message" style={validValue ? { display: 'none' } : {}}>
                {this.props.validationErrorMessage || 'Invalid date format'}
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
                position={this.props.position}
                open={calendarOpen}
              >
                {calendarOpen && (
                  <Calendar
                    // @ts-ignore
                    date={date && new Date(date)}
                    onDateChanged={this.handleDateChange}
                    position={this.props.position}
                  />
                )}
              </Styled.DatePickerDropdownMenu>
            </Styled.DatePickerDropdown>
          </Styled.DatePickerContainer>
        );
    }
}

export default Datepicker;
