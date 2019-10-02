import React from 'react';

import Calendar from '../calendar/calendar';
import { getDateISO, isDate } from '../calendar/calendar-helper';
import * as Styled from './styles';

class Datepicker extends React.Component {
    state = { date: null, calendarOpen: false };

    toggleCalendar = () =>
      this.setState({ calendarOpen: !this.state.calendarOpen });

    // @ts-ignore
    handleChange = evt => evt.preventDefault();
    // @ts-ignore
    handleDateChange = date => {
        // @ts-ignore
        const { onDateChanged } = this.props;
        const { date: currentDate } = this.state;
        const newDate = date ? getDateISO(date) : null;

        currentDate !== newDate &&
          this.setState({ date: newDate, calendarOpen: false }, () => {
              typeof onDateChanged === 'function' && onDateChanged(this.state.date);
          });
    };

    componentDidMount() {
        // @ts-ignore
        const { value: date } = this.props;
        const newDate = date && new Date(date);

        isDate(newDate) && this.setState({ date: getDateISO(newDate) });
    }
    // @ts-ignore
    componentDidUpdate(prevProps) {
        // @ts-ignore
        const { value: date } = this.props;
        const { value: prevDate } = prevProps;
        const dateISO = getDateISO(new Date(date));
        const prevDateISO = getDateISO(new Date(prevDate));

        dateISO !== prevDateISO && this.setState({ date: dateISO });
    }

    render() {
        // @ts-ignore
        const { label } = this.props;
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
                // @ts-ignore
                position={this.props.position}
                open={calendarOpen}
              >
                {calendarOpen && (
                  // @ts-ignore
                  <Calendar
                    // @ts-ignore
                    date={date && new Date(date)}
                    onDateChanged={this.handleDateChange}
                    // @ts-ignore
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
