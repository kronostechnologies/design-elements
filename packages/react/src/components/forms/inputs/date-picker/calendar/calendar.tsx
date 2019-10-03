import React, { Component, Fragment, KeyboardEvent, ReactElement } from 'react';
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
import * as Styled from './styles';

class Calendar extends Component<{ date: Date, position: string, onDateChanged(date: Date | null): void}> {
    state = {
        ...this.resolveStateFromProp(),
        today: new Date(),
        monthDropDownIsOpen: false,
        yearDropDownIsOpen: false,
    };
    pressureTimeout: NodeJS.Timeout | undefined;
    pressureTimer: NodeJS.Timeout | undefined;
    dayTimeout: NodeJS.Timer | undefined;

    resolveStateFromDate(date: Date): { current: Date | null, month: number, year: number } {
        const isDateObject = isDate(date);
        const savedDate = isDateObject ? date : new Date();

        return {
            current: isDateObject ? date : null,
            month: +savedDate.getMonth() + 1,
            year: savedDate.getFullYear(),
        };
    }

    resolveStateFromProp(): { current: Date | null, month: number, year: number } {
        return this.resolveStateFromDate(this.props.date);
    }

    getCalendarDates = () => {
        const { month, year } = this.state;
        const calendarMonth = month;
        const calendarYear = year;

        return calendar(calendarMonth, calendarYear);
    };
    gotoDate = (date: Date) => (evt: KeyboardEvent<HTMLElement>) => {
        evt && evt.preventDefault();
        const { current } = this.state;
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

    handlePressure = (fn: () => void) => {
        if (typeof fn === 'function') {
            fn();
            this.pressureTimeout = setTimeout(() => {
                this.pressureTimer = setInterval(fn, 100);
            }, 500);
        }
    };

    clearPressureTimer = () => {
        this.pressureTimer && clearInterval(this.pressureTimer);
        this.pressureTimeout && clearTimeout(this.pressureTimeout);
    };

    clearDayTimeout = () => {
        this.dayTimeout && clearTimeout(this.dayTimeout);
    };

    handlePrevious = (evt: KeyboardEvent<Element>) => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;
        this.handlePressure(fn);
    };

    handleNext = (evt: KeyboardEvent<Element>) => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth;
        this.handlePressure(fn);
    };

    changeMonth = (month: number): void => {
        this.setState({ month: month });
    }

    changeYear = (year: number): void => {
        this.setState({ year: year });
    }

    handleChange = (evt: any) => {
        evt.preventDefault();
        const fn = () => this.changeMonth(evt.target.value);
        this.handlePressure(fn);
    }

    renderMonthAndYear = () => {
        const { month, year } = this.state;
        const monthname = Object.values(CALENDAR_MONTHS)[
          Math.max(0, Math.min(month - 1, 11))
        ];
        const months = [];
        for (const [key, value] of Object.entries(CALENDAR_MONTHS)) {
            months.push({ key: key, value: value });
        }
        const monthsList = months.map((mth, i) => (
          <li onClick={() => this.changeMonth(i + 1)} value={i + 1} key={mth.key + mth.value}>{mth.value}</li>
        ));
        const yearList = [];
        for (let i = 1900; i <= this.state.today.getFullYear(); i++) {
            yearList.push(i);
        }
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
                  <Styled.MonthAndYear>
                    <p>{monthname}</p>
                    <Styled.ArrowDown/>
                  </Styled.MonthAndYear>
                  <Styled.DateList style={this.state.monthDropDownIsOpen ? { display: 'block' } : { display: 'none' }}>
                    {monthsList}
                  </Styled.DateList>
                </Styled.CurrentDateContainer>
                <Styled.CurrentDateContainer
                  onClick={() => {
                      this.setState({ yearDropDownIsOpen: !this.state.yearDropDownIsOpen });
                  }}
                >
                  <Styled.MonthAndYear>
                    <p>{year}</p>
                    <Styled.ArrowDown/>
                  </Styled.MonthAndYear>
                  <Styled.DateList style={this.state.yearDropDownIsOpen ? { display: 'block' } : { display: 'none' }}>
                    {yearList.map((yearItem, i) => (
                      <li key={yearItem + '' + i} onClick={() => this.changeYear(yearItem)}>{yearItem}</li>
                    ))}
                  </Styled.DateList>
                </Styled.CurrentDateContainer>
              </Styled.CurrentDate>
            </Styled.CalendarMonth>
            <Styled.ArrowRight
              onMouseDown={this.handleNext}
              onMouseUp={this.clearPressureTimer}
              title="Next Month"
            />
          </Styled.CalendarHeader>
        );
    };

    renderCalendarDate = (date: (string | number)[], index: number) => {
        const { current, month, year, today } = this.state;
        const renderedDate = new Date(date.join('-'));

        const isToday = isSameDay(renderedDate, today);
        const isCurrent = current && isSameDay(renderedDate, current);
        const inMonth =
          month && year && isSameMonth(renderedDate, new Date([year, month, 1].join('-')));

        const onClick = this.gotoDate(renderedDate);

        const props = { index, inMonth, onClick, title: renderedDate.toDateString() };

        const DateComponent = isCurrent
          ? Styled.HighlightedCalendarDate
          : isToday
            ? Styled.TodayCalendarDate
            : Styled.CalendarDate;

        return (
          <DateComponent key={getDateISO(renderedDate)} {...props}>
            {renderedDate.getDate()}
          </DateComponent>
        );
    };

    componentDidMount(): void {
        const now = new Date().setHours(0, 0, 0, 0);
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;

        const ms = tomorrow - now;
        this.dayTimeout = setTimeout(() => {
            this.setState({ today: new Date() }, this.clearDayTimeout);
        }, ms);
    }

    componentDidUpdate(prevProps: Readonly<{ date: Date; onDateChanged(date: Date): void; }>): void {
        const { date, onDateChanged } = this.props;
        const { date: prevDate } = prevProps;
        const dateMatch = date === prevDate || isSameDay(date, prevDate);

        !dateMatch &&
          this.setState(this.resolveStateFromDate(date), () => {
              typeof onDateChanged === 'function' && onDateChanged(date);
          });
    }

    componentWillUnmount(): void {
        this.clearPressureTimer();
        this.clearDayTimeout();
    }

    render(): ReactElement {
        return (
          <Styled.CalendarContainer
            onClick={() => {
                this.state.yearDropDownIsOpen && this.setState({ yearDropDownIsOpen: false });
                this.state.monthDropDownIsOpen && this.setState({ monthDropDownIsOpen: false });
            }}
          >
            {this.renderMonthAndYear()}

            <Styled.CalendarGrid>
              <Fragment>
                {Object.values(WEEK_DAYS).map((day, index) => {
                    const daylabel = day.toUpperCase();
                    return (
                      <Styled.CalendarDay key={daylabel} index={index}>
                        {daylabel}
                      </Styled.CalendarDay>
                    );
                })}
              </Fragment>

              <Fragment>
                {this.getCalendarDates().map(this.renderCalendarDate)}
              </Fragment>
            </Styled.CalendarGrid>
            <Styled.CalendarArrow position={this.props.position} />
          </Styled.CalendarContainer>
        );
    }
}

export default Calendar;
