import React, { Component, KeyboardEvent, ReactElement } from 'react';

import { CalendarArrowPosition } from '../date-picker';
import {
  CALENDAR_MONTHS,
  fullCalendar,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  isSameDay,
  isSameMonth,
  WEEK_DAYS,
} from './calendar-helper';
import * as Styled from './styles';

interface CalendarProps {
    date: Date;
    max: number;
    min: number;
    arrowPosition: CalendarArrowPosition;
    onDateChanged(date: Date | null): void;
}

interface CalendarState {
    today: Date;
    monthDropDownIsOpen: boolean;
    yearDropDownIsOpen: boolean;
    current: Date | null;
    month: number;
    months: { key: string; value: string; }[];
    year: number;
}

class Calendar extends Component<CalendarProps, CalendarState> {
    state: CalendarState = {
        ...this.resolveStateFromProp(),
        today: new Date(),
        monthDropDownIsOpen: false,
        yearDropDownIsOpen: false,
    };

    dayTimeout: NodeJS.Timer | undefined;
    pressureTimeout: NodeJS.Timeout | undefined;
    pressureTimer: NodeJS.Timeout | undefined;

    resolveStateFromDate(date: Date)
    : { current: Date | null, month: number, months: { key: string; value: string; }[], year: number } {
        const savedDate = date;
        const months = [];
        for (const [key, value] of Object.entries(CALENDAR_MONTHS)) {
            months.push({ key: key, value: value });
        }

        return {
            months: months,
            current: date,
            month: savedDate ? +savedDate.getMonth() + 1 : new Date().getMonth() + 1,
            year: savedDate ? savedDate.getFullYear() : this.props.max,
        };
    }

    resolveStateFromProp()
    : { current: Date | null, month: number, months: { key: string; value: string; }[], year: number } {
        return this.resolveStateFromDate(this.props.date);
    }

    getCalendarDates = () => {
        const { month, year } = this.state;

        return fullCalendar(month, year);
    };

    goToDate = (date: Date) => (evt: KeyboardEvent<HTMLElement>) => {
        evt && evt.preventDefault();
        const { current } = this.state;
        const { onDateChanged } = this.props;

        if (!(current && isSameDay(date, current))) {
            this.setState(this.resolveStateFromDate(date), () => {
                onDateChanged(date);
            });
        }
    };

    goToPreviousMonth = () => {
        const { month, year } = this.state;
        this.setState(getPreviousMonth(month, year));
    };

    goToNextMonth = () => {
        const { month, year } = this.state;
        this.setState(getNextMonth(month, year));
    };

    goToPreviousYear = () => {
        const { year } = this.state;
        this.setState({ year: year - 1 });
    };

    goToNextYear = () => {
        const { year } = this.state;
        this.setState({ year: year + 1 });
    };

    handlePressure = (fn: () => void) => {
        fn();
        this.pressureTimeout = setTimeout(() => {
            this.pressureTimer = setInterval(fn, 100);
        }, 500);
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
        const fn = evt.shiftKey ? this.goToPreviousYear : this.goToPreviousMonth;
        this.handlePressure(fn);
    };

    handleNext = (evt: KeyboardEvent<Element>) => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? this.goToNextYear : this.goToNextMonth;
        this.handlePressure(fn);
    };

    changeMonth = (month: number): void => {
        this.setState({ month });
    }

    changeYear = (year: number): void => {
        this.setState({ year });
    }

    renderMonthAndYear = () => {
        const { month, months, year } = this.state;
        const monthName = Object.values(CALENDAR_MONTHS)[month - 1];
        const monthsList = months.map((mth, i) => (
          <li onClick={() => this.changeMonth(i + 1)} value={i + 1} key={mth.value}>{mth.value}</li>
        ));
        const yearList = [];
        for (let i = this.props.max; i >= this.props.min; i--) {
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
                    <p>{monthName}</p>
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
                    {yearList.map((yearItem) => (
                      <li key={yearItem} onClick={() => this.changeYear(yearItem)}>{yearItem}</li>
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

        const onClick = this.goToDate(renderedDate);

        const props = { index, inMonth, onClick, title: renderedDate.toDateString() };

        const DateComponent = isCurrent
          ? Styled.HighlightedCalendarDate
          : isToday
            ? Styled.TodayCalendarDate
            : Styled.CalendarDate;

        return (
          <DateComponent key={getDateISO(renderedDate)} {...props}>
            <p>{renderedDate.getDate()}</p>
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
              <>
                {Object.values(WEEK_DAYS).map((day, index) => {
                    const daylabel = day.toUpperCase();
                    return (
                      <Styled.CalendarDay key={daylabel} index={index}>
                        {daylabel}
                      </Styled.CalendarDay>
                    );
                })}
              </>

              <>
                {this.getCalendarDates().map(this.renderCalendarDate)}
              </>
            </Styled.CalendarGrid>
            <Styled.CalendarArrow position={this.props.arrowPosition} />
          </Styled.CalendarContainer>
        );
    }
}

export default Calendar;
