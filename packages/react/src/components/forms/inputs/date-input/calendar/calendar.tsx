import React, { Component, Fragment } from 'react';
import * as Styled from './styles';
import calendar, {
  CALENDAR_MONTHS,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  isDate,
  isSameDay,
  isSameMonth,
  WEEK_DAYS,
} from './calendar-helper';

class Calendar extends Component {
    state = { ...this.resolveStateFromProp(), today: new Date(), monthDropDownIsOpen: false };
    // @ts-ignore
    resolveStateFromDate(date) {
        const isDateObject = isDate(date);
        const _date = isDateObject ? date : new Date();

        return {
            current: isDateObject ? date : null,
            month: +_date.getMonth() + 1,
            year: _date.getFullYear(),
        };
    }

    resolveStateFromProp() {
        // @ts-ignore
        return this.resolveStateFromDate(this.props.date);
    }

    getCalendarDates = () => {
        const { current, month, year } = this.state;
        const calendarMonth = month || +current.getMonth() + 1;
        const calendarYear = year || current.getFullYear();

        return calendar(calendarMonth, calendarYear);
    };
    // @ts-ignore
    gotoDate = date => evt => {
        evt && evt.preventDefault();
        const { current } = this.state;
        // @ts-ignore
        const { onDateChanged } = this.props;

        !(current && isSameDay(date, current)) &&
          this.setState(this.resolveStateFromDate(date), () => {
              typeof onDateChanged === 'function' && onDateChanged(date);
          });
    };

    gotoPreviousMonth = () => {
        const { month, year } = this.state;
        this.setState(getPreviousMonth(month, year));
    };

    gotoNextMonth = () => {
        const { month, year } = this.state;
        this.setState(getNextMonth(month, year));
    };

    gotoPreviousYear = () => {
        const { year } = this.state;
        this.setState({ year: year - 1 });
    };

    gotoNextYear = () => {
        const { year } = this.state;
        this.setState({ year: year + 1 });
    };
    // @ts-ignore
    handlePressure = fn => {
        if (typeof fn === 'function') {
            fn();
            // @ts-ignore
            this.pressureTimeout = setTimeout(() => {
                // @ts-ignore
                this.pressureTimer = setInterval(fn, 100);
            }, 500);
        }
    };

    clearPressureTimer = () => {
        // @ts-ignore
        this.pressureTimer && clearInterval(this.pressureTimer);
        // @ts-ignore
        this.pressureTimeout && clearTimeout(this.pressureTimeout);
    };

    clearDayTimeout = () => {
        // @ts-ignore
        this.dayTimeout && clearTimeout(this.dayTimeout);
    };
    // @ts-ignore
    handlePrevious = evt => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;
        this.handlePressure(fn);
    };
    // @ts-ignore
    handleNext = evt => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth;
        this.handlePressure(fn);
    };
    // @ts-ignore
    changeMonth = (month: number): any => {
        // this.setState({ month: month });
        // this.renderMonthAndYear();
        this.setState({ month: month });
    }

    handleChange = (evt: any) => {
        evt.preventDefault();
        const fn = this.changeMonth(evt.target.value);
        this.handlePressure(fn);
    }

    renderMonthAndYear = () => {
        const { month, year } = this.state;
        const monthname = Object.values(CALENDAR_MONTHS)[
          Math.max(0, Math.min(month - 1, 11))
        ];
        let months = [];
        for (let [key, value] of Object.entries(CALENDAR_MONTHS)) {
            months.push({ key: key, value: value });
        }
        const monthsList = months.map((mth, i) => (
          <li onClick={this.handleChange} value={i + 1} key={mth.key + mth.value}>{mth.value}</li>
        ));

        return (
          <Styled.CalendarHeader>
            <Styled.ArrowLeft
              onMouseDown={this.handlePrevious}
              onMouseUp={this.clearPressureTimer}
              title="Previous Month"
            />
            <Styled.CalendarMonth>
              <Styled.CurrentDate>
                <Styled.CurrentDateContainer
                  onClick={() => {
                      this.setState({ monthDropDownIsOpen: !this.state.monthDropDownIsOpen });
                  }}
                >
                  <p>{monthname}</p>
                  <Styled.MonthList style={this.state.monthDropDownIsOpen ? { display: 'block' } : { display: 'none' }}>
                    {monthsList}
                  </Styled.MonthList>
                </Styled.CurrentDateContainer>
                <Styled.CurrentDateContainer>
                  <p>{year}</p>
                </Styled.CurrentDateContainer>
              </Styled.CurrentDate>
            </Styled.CalendarMonth>
            <Styled.ArrowRight
              onMouseDown={this.handleNext}
              onMouseUp={this.clearPressureTimer}
              title='Next Month'
            />
          </Styled.CalendarHeader>
        );
    };
    // @ts-ignore
    renderDayLabel = (day, index) => {
        // @ts-ignore
        const daylabel = WEEK_DAYS[day].toUpperCase();
        return (
          // @ts-ignore
          <Styled.CalendarDay key={daylabel} index={index}>
            {daylabel}
          </Styled.CalendarDay>
        );
    };
    // @ts-ignore
    renderCalendarDate = (date, index) => {
        const { current, month, year, today } = this.state;
        const _date = new Date(date.join('-'));

        const isToday = isSameDay(_date, today);
        const isCurrent = current && isSameDay(_date, current);
        const inMonth =
          month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

        const onClick = this.gotoDate(_date);

        const props = { index, inMonth, onClick, title: _date.toDateString() };

        const DateComponent = isCurrent
          ? Styled.HighlightedCalendarDate
          : isToday
            ? Styled.TodayCalendarDate
            : Styled.CalendarDate;

        return (
          // @ts-ignore
          <DateComponent key={getDateISO(_date)} {...props}>
            {_date.getDate()}
          </DateComponent>
        );
    };

    componentDidMount() {
        const now = new Date();
        // @ts-ignore
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
        // @ts-ignore
        const ms = tomorrow - now;
        // @ts-ignore
        this.dayTimeout = setTimeout(() => {
            this.setState({ today: new Date() }, this.clearDayTimeout);
        }, ms);
    }
    // @ts-ignore
    componentDidUpdate(prevProps) {
        // @ts-ignore
        const { date, onDateChanged } = this.props;
        const { date: prevDate } = prevProps;
        const dateMatch = date == prevDate || isSameDay(date, prevDate);

        !dateMatch &&
          this.setState(this.resolveStateFromDate(date), () => {
              typeof onDateChanged === 'function' && onDateChanged(date);
          });
    }

    componentWillUnmount() {
        this.clearPressureTimer();
        this.clearDayTimeout();
    }

    render() {
        return (
          <Styled.CalendarContainer>
            {this.renderMonthAndYear()}

            <Styled.CalendarGrid>
              <Fragment>{Object.keys(WEEK_DAYS).map(this.renderDayLabel)}</Fragment>

              <Fragment>
                {this.getCalendarDates().map(this.renderCalendarDate)}
              </Fragment>
            </Styled.CalendarGrid>
          </Styled.CalendarContainer>
        );
    }
}

export default Calendar;
