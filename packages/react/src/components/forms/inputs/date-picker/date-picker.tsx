import React, { ChangeEvent, ReactElement } from 'react';

import Calendar from './calendar/calendar';
import { getDateISO, isDate } from './calendar/calendar-helper';
import * as Styled from './styles';

class Datepicker extends React.Component
  <{ value?: Date, position: string, onDateChanged?(date: Date | null, calendarOpen?: false): void}> {
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

    render(): ReactElement {
        const { date, calendarOpen } = this.state;

        return (
          <Styled.DatePickerContainer>
            <Styled.DatePickerFormGroup>
              <Styled.DatePickerLabel>
                <Styled.Calendar />
              </Styled.DatePickerLabel>
              <Styled.DatePickerInput
                type="text"
                // @ts-ignore
                value={date ? date.split('-').join(' / ') : ''}
                onChange={this.handleChange}
                readOnly="readonly"
                placeholder="AAAA-MM-JJ"
                style={this.state.calendarOpen ? { border: '1px solid #0080a5' } : null}
              />
            </Styled.DatePickerFormGroup>

            <Styled.DatePickerDropdown
              isOpen={calendarOpen}
              toggle={this.toggleCalendar}
            >
              <Styled.DatePickerDropdownToggle color="transparent" />
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
