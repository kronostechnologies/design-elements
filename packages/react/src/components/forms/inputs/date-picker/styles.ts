import { Dropdown, DropdownMenu, DropdownToggle, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';

import CalendarIcon from '../../../../icons/calendar.svg';

export const Calendar = styled(CalendarIcon)`
	color: #57666e;
	height: 16px;
	width: 16px;
`;

export const DatePickerContainer = styled.div`
	position: relative;
`;

export const DatePickerFormGroup = styled(FormGroup)`
	background-color: #ffffff;
	border: 1px solid #57666e;
	border-radius: 5px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row-reverse;
	height: 32px;
	justify-content: space-between;
	overflow: hidden;
	position: relative;
	width: 180px;
`;

export const DatePickerLabel = styled.div`
	align-items: center;
	border-left: 1px solid #57666e;
	color: #06c;
	display: flex;
	font-size: 0.5rem;
	font-weight: 600;
	justify-content: center;
	letter-spacing: 2px;
	margin: 0;
	padding: 0 0.5rem;
	position: relative;
	text-transform: uppercase;
`;

export const DatePickerInput = styled(Input)`
	align-items: center;
	background: transparent !important;
	border: none;
	box-shadow: none;
	color: #333;
	display: flex;
	font-size: 0.875rem;
	font-weight: 500;
	letter-spacing: 1px;
	padding: 0.4rem 0 0.4rem 0.4rem;
	text-align: center;
	width: 100%
	::placeholder {
		color: #999;
		font-size: 0.875rem;
		margin: 0;
	}
`;

export const DatePickerDropdown = styled(Dropdown)`
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
`;

export const DatePickerDropdownToggle = styled(DropdownToggle)`
	background: transparent;
	cursor: pointer;
	filter: alpha(opacity=0);
	height: 100%;
	opacity: 0;
	position: relative;
	width: 100%;
`;

export const DatePickerDropdownMenu = styled(DropdownMenu)`
	border: none;
	height: 256px;
	left: -5px !important;
	margin: 0;
	outline: none;
	padding: 0;
	position: absolute;
	width: 250px;
	${props => !props.open ? 'z-index: -1000' : null}
	${props => {
    switch (props.position) {
    	case 'bottomRight':
            return 'transform: translate3d(5px, 43px, 0px) !important;';
        case 'bottomLeft':
            return 'transform: translate3d(-65px, 43px, 0px) !important;';
        case 'topRight':
            return 'transform: translate3d(5px, -267px, 0px) !important;' + 'top: -10px;';
        case 'topLeft':
            return 'transform:translate3d(-65px, -267px, 0px) !important;' + 'top: -10px;';
        default:
            return 'transform: translate3d(5px, 43px, 0px) !important;';
    }
}};
`;
