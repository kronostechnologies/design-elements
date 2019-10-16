export const THIS_YEAR = +(new Date().getFullYear());
export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_DAYS = {
    Sunday: 'DI',
    Monday: 'LU',
    Tuesday: 'MA',
    Wednesday: 'ME',
    Thursday: 'JE',
    Friday: 'VE',
    Saturday: 'SA',
};

export const CALENDAR_MONTHS = {
    January: 'Jan',
    February: 'Fev',
    March: 'Mar',
    April: 'Avr',
    May: 'Mai',
    June: 'Juin',
    July: 'Juil',
    August: 'Aou',
    September: 'Sep',
    October: 'Oct',
    November: 'Nov',
    December: 'Dec',
};

export const CALENDAR_WEEKS = 6;

export const zeroPad = (value: number, length: number) => `${value}`.padStart(length, '0');

export const isDate = (date: Date | undefined) => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());
    return isDate && isValidDate;
};

export const getDateISO = (date = new Date()): string | number | undefined => {
    if (!isDate(date)) return undefined;

    return [
        date.getFullYear(),
        zeroPad(+date.getMonth() + 1, 2),
        zeroPad(+date.getDate(), 2),
    ].join('-');
};

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = year % 4 === 0;

    return month === 2
		? leapYear
			? 29
			: 28
		: months30.includes(month)
			? 30
			: 31;
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
};

export const isSameMonth = (date: Date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;

    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = basedate.getFullYear();

    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
};

export const isSameDay = (date: Date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;

    const basedateDate = basedate.getDate() + 1;
    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
};

export const getPreviousMonth = (month: number, year: number) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month: number, year: number) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
};

export default (month = THIS_MONTH, year = THIS_YEAR) => {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);

    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
    // @ts-ignore
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2) ];
    });
	// @ts-ignore
    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
        const day = index + 1;
        return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });
	// @ts-ignore
    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];
};
