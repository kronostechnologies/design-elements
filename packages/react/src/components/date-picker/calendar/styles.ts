import styled from 'styled-components';

import ChevronDown from 'feather-icons/dist/icons/chevron-down.svg';
import ChevronLeft from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRight from 'feather-icons/dist/icons/chevron-right.svg';

export const ArrowLeft = styled(ChevronLeft)`
	color: #57666e;
	height: 16px;
	width: 16px;

	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

export const ArrowRight = styled(ChevronRight)`
	color: #57666e;
	height: 16px;
	width: 16px;

	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

export const ArrowDown = styled(ChevronDown)`
	color: #57666e
	height: 16px;
	width: 16px;
`;

export const CalendarContainer = styled.div`
	background: #fff;
	border: 1px solid #d9dde2;
	border-radius: 5px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	font-size: 5px;
	padding: 12px 16px 18px;
	width: 100%;
`;

export const CalendarHeader = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`;

export const CalendarGrid = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-gap: 2.5px;
	grid-template: repeat(7, auto) / repeat(7, auto);
	height: 85%;
	width: 100%;
`;

export const CalendarMonth = styled.div`
	font-weight: 500;
	padding: 4px 2px;
	text-align: center;
	user-select: none;
	word-spacing: 5px;
`;

export const CalendarCell = styled.div`
	align-items: center;
	align-self: center;
	display: flex;
	grid-column: ${(props: {index: number}) => (props.index % 7) + 1} / span 1;
	height: 24px;
	justify-content: center;
	letter-spacing: 0.1rem;
	margin: 0 auto;
	text-align: center;
	user-select: none;
	width: 24px;

	p {
		display: block;
		margin: 0;
	}
`;

export const CalendarDay = styled(CalendarCell)`
	color: #000000;
	font-size: 0.875rem;
	font-weight: 600;
`;

interface CalendarDateProps {
    index: number;
    inMonth: boolean | 0;
    onClick: any;
    title: string;
}

export const CalendarDate = styled(CalendarCell)`
	border-radius: 200px;
	color: ${(props: CalendarDateProps) => props.inMonth ? `#000000` : `#ddd`};
	cursor: pointer;
	font-size: 2.8em;
	font-weight: ${props => props.inMonth ? 500 : 300};
  	grid-row: ${props => Math.floor(props.index / 7) + 2} / span 1;
	transition: all .4s ease-out;

	:hover {
		background: #f1f2f2;
	}
`;

export const HighlightedCalendarDate = styled(CalendarDate)`
	background: #0080a5 !important;
	color: #fff !important;
`;

export const TodayCalendarDate = styled(HighlightedCalendarDate)`
	background: #fff !important;
	color: #000000 !important;
`;

export const CurrentDate = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const CurrentDateContainer = styled.div`
	border: 1px solid #57666e;
	border-radius: 4px;
	box-sizing: border-box;
	cursor: pointer;
	font-size: 0.875rem;
	margin: 0 4px;
	padding 6px;
	position: relative;
`;

export const MonthAndYear = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 4.0rem;

	p {
		margin: 0 16px 0 0;
	}
`;

export const DateList = styled.div`
	background-color: #fff;
	border: 1px solid #d9dde2;
	border-radius: 6px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	height: 200px;
	left: -5px;
	list-style: none;
	margin: 0 4px;
	overflow-y: auto;
	padding: 0;
	position: absolute;
	text-align: left;
	width: 100%;

	li {
		padding 4px 6px;

		&:hover{
			background: #d9dde2;
			cursor: pointer;
		}
	}
`;

export const CalendarArrow = styled.div`
	background-color: #fff;
	border-left: 1px solid #d9dde2;
	border-top: 1px solid #d9dde2;
	height: 10px;
	position: absolute;
	width: 10px;
	${(props: { position: string }) => {
    switch (props.position) {
        case 'bottomRight':
            return 'top:-5px;' + 'right: 108px;' + 'transform: rotate(45deg);';
        case 'bottomLeft':
            return 'top:-5px;' + 'right: 11px;' + 'transform: rotate(45deg);';
        case 'topRight':
            return 'top:249px;' + 'right: 108px;' + 'transform: rotate(225deg);';
        case 'topLeft':
            return 'top:249px;' + 'right: 11px;' + 'transform: rotate(225deg);';
        default:
            return 'translate3d(5px, 43px, 0px) !important';
    }}}
`;
