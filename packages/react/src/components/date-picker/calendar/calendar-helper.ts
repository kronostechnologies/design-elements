const THIS_YEAR = +(new Date().getFullYear());
const THIS_MONTH = +(new Date().getMonth()) + 1;

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

export const isValidDate = (date: Date | undefined) => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());
    return isDate && isValidDate;
};

export const getDateISO = (date = new Date()): string | number | undefined => {
    if (!isValidDate(date)) return undefined;

    return [
        date.getFullYear(),
        zeroPad(+date.getMonth() + 1, 2),
        zeroPad(+date.getDate(), 2),
    ].join('-');
};

function isLeapYear(year: number): boolean {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const months30 = [4, 6, 9, 11];
    const leapYear = isLeapYear(year);

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

export const isSameMonth = (date: Date, baseDate = new Date()) => {
    if (!(isValidDate(date) && isValidDate(baseDate))) return false;

    const baseDateMonth = +(baseDate.getMonth()) + 1;
    const baseDateYear = baseDate.getFullYear();

    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+baseDateMonth === +dateMonth) && (+baseDateYear === +dateYear);
};

export const isSameDay = (date: Date, baseDate = new Date()) => {
    if (!(isValidDate(date) && isValidDate(baseDate))) return false;

    const baseDateDate = baseDate.getDate() + 1;
    const baseDateMonth = +(baseDate.getMonth()) + 1;
    const baseDateYear = baseDate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+baseDateDate === +dateDate) && (+baseDateMonth === +dateMonth) && (+baseDateYear === +dateYear);
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

export const fullCalendar = (month = THIS_MONTH, year = THIS_YEAR) => {
    const monthDays = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay - 1;
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);

    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((_, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return [ prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2) ];
    });

    const thisMonthDates = [...new Array(monthDays)].map((_, index) => {
        const day = index + 1;
        return [year, zeroPad(month, 2), zeroPad(day, 2)];
    });

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((_, index) => {
        const day = index + 1;
        return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
    });

    return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ];
};
