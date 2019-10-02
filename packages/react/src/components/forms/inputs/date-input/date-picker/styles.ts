import styled from 'styled-components';
import { FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import CalendarIcon from '../../../../../icons/calendar.svg';

export const Calendar = styled(CalendarIcon)`
	height: 16px;
	width: 16px;
	color: #57666e;
`;

export const DatePickerContainer = styled.div`
	position: relative;
`;

export const DatePickerFormGroup = styled(FormGroup)`
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
	position: relative;
	width: 180px;
	height: 32px;
	box-sizing: border-box;
	border: 1px solid #57666e;
	border-radius: 5px;
	overflow: hidden;
	background-color: #ffffff;
`;

export const DatePickerLabel = styled.div`
	margin: 0;
	padding: 0 0.5rem;
	font-weight: 600;
	font-size: 0.5rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: #06c;
	border-left: 1px solid #57666e;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;

export const DatePickerInput = styled(Input)`
	padding: 0.4rem 0 0.4rem 0.4rem;
	width: 100%
	font-weight: 500;
	font-size: 0.875rem;
	color: #333;
	box-shadow: none;
	border: none;
	text-align: center;
	letter-spacing: 1px;
	background: transparent !important;
	display: flex;
	align-items: center;
	::placeholder {
		color: #999;
		font-size: 0.875rem;
		margin: 0;
	}
`;

export const DatePickerDropdown = styled(Dropdown)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

export const DatePickerDropdownToggle = styled(DropdownToggle)`
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;
	opacity: 0;
	filter: alpha(opacity=0);
	cursor: pointer;
`;

export const DatePickerDropdownMenu = styled(DropdownMenu)`
	position: absolute;
	left: -5px !important;
	width: 250px;
	height: 256px;
	border: none;
	padding: 0;
	margin: 0;
	outline: none;
	${props => !props.open ? 'z-index: -1000' : null}
	// @ts-ignore
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
