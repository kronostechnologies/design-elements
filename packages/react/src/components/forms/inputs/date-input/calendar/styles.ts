import styled from 'styled-components';

// export const Arrow = styled.button`
// 	appearance: none;
// 	user-select: none;
// 	outline: none !important;
// 	display: inline-block;
// 	position: relative;
// 	cursor: pointer;
// 	padding: 0;
// 	border: none;
// 	border-top: 1.6em solid transparent;
// 	border-bottom: 1.6em solid transparent;
// 	transition: all .25s ease-out;
// `;

// export const ArrowLeft = styled(Arrow)`
// 	border-right: 2.4em solid #ccc;
// 	left: 1.5rem;
// 	:hover {
// 		border-right-color: #06c;
// 	}
// `;

// export const ArrowRight = styled(Arrow)`
// 	border-left: 2.4em solid #ccc;
// 	right: 1.5rem;
// 	:hover {
// 		border-left-color: #06c;
// 	}
// `;

export const Arrow = styled.button`
	user-select: none;
	outline: none !important;
	display: inline-block;
	position: relative;
	cursor: pointer;
	padding: 0;
	border: none;
	transition: all .25s ease-out;
	background: white;
	&:after {
		content: ">";
		color: #57666e;
		font-size: 1.6rem;
	}
	:hover {
		opacity: 0.8;
	}
`;

export const ArrowLeft = styled(Arrow)`
	left: 1.5rem;
	transform: rotate(180deg);
`;

export const ArrowRight = styled(Arrow)`
	right: 1.5rem;
`;

export const CalendarContainer = styled.div`
	font-size: 5px;
	border-radius: 5px;
	border: 1px solid #d9dde2;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 100%;
	box-sizing: border-box;
	background: white;
	padding: 1rem;
`;

export const CalendarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template: repeat(7, auto) / repeat(7, auto);
`;

export const CalendarMonth = styled.div`
	font-weight: 500;
	text-align: center;
	padding: 0.5em 0.25em;
	word-spacing: 5px;
	user-select: none;
`;

export const CalendarCell = styled.div`
	text-align: center;
	align-self: center;
	letter-spacing: 0.1rem;
	margin: 0.2em 1em;
	padding: 0.2rem 0;
	user-select: none;
	// @ts-ignore
  	grid-column: ${props => (props.index % 7) + 1} / span 1;
`;

export const CalendarDay = styled(CalendarCell)`
	font-weight: 600;
	font-size: 2.25em;
	color: #000000;
`;

export const CalendarDate = styled(CalendarCell)`
	// @ts-ignore
	font-weight: ${props => props.inMonth ? 500 : 300};
	font-size: 2.8em;
	border-radius: 200px;
	cursor: pointer;
	// @ts-ignore
	color: ${props => props.inMonth ? `#000000` : `#ddd`};
	// @ts-ignore
  	grid-row: ${props => Math.floor(props.index / 7) + 2} / span 1;
	transition: all .4s ease-out;
	:hover {
		background: #f1f2f2;
	}
`;

export const HighlightedCalendarDate = styled(CalendarDate)`
	color: #fff !important;
	background: #0080a5 !important;
`;

export const TodayCalendarDate = styled(HighlightedCalendarDate)`
	color: #000000 !important;
	background: white !important;
`;

export const CurrentDate = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const CurrentDateContainer = styled.div`
	border: 1px solid #57666e;
	border-radius: 6px;
	font-size: 4em;
	box-sizing: border-box;
	padding 0.2em 0.4em;
	margin: 0 5px;
	position: relative;
	p {
		margin: 0;
		&:after {
			content: "⌄";
			color: #57666e;
			margin-left: 10px;
			font-weight: lighter;
			font-size: 1em;
		}
	}
`;

export const MonthList = styled.ul`
	position: absolute;
	left: -5px;
	box-sizing: border-box;
	list-style: none;
	margin: 0;
	padding: 0;
	background-color: white;
	margin: 0 5px;
	border: 1px solid #57666e;
	border-radius: 6px;
	width: 100%;
	text-align: left;
	li {
		padding 0.2em 0.4em;
		border-radius: 6px;
		&:hover{
			background: #d9dde2;
			cursor: pointer;
		}
	}
`;
