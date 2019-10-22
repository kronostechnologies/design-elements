import styled from 'styled-components';

import CalendarIcon from 'feather-icons/dist/icons/calendar.svg';
import { Dropdown, DropdownMenu, DropdownToggle, FormGroup } from 'reactstrap';

export const Calendar = styled(CalendarIcon)`
	color: ${(props: {disabled: boolean}) => props.disabled ? '#bcc7cc' : '#57666e'};
	height: 16px;
	width: 16px;
`;

export const Label = styled.label`
	display: block;
	font-size: 0.75rem;
	margin-bottom: 8px;
	padding: 0;
`;

export const DatePickerContainer = styled.div`
	height: 60px;
	position: relative;
	width: 140px;

	&:hover .form-group > div {
				${(props: {disabled: boolean}) => props.disabled ? null : 'background-color: #d9dde2'};
			}
		}
	}
`;

export const DatePickerFormGroup = styled(FormGroup)`
	background-color: #fff;
	border-radius: 5px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row-reverse;
	height: 32px;
	justify-content: flex-end;
	overflow: unset;
	position: relative;
	width: 140px;
`;

export const DatePickerLabel = styled.div`
	align-items: center;
	background: ${(props: {disabled: boolean}) => props.disabled ? '#f1f2f2' : 'transparent'};
	border: ${props => props.disabled ? '1px solid #d9dde2' : '1px solid #57666e'};
	border-left: none;
	border-radius: 0 5px 5px 0;
	box-sizing: border-box;
	color: #06c;
	display: flex;
	font-size: 0.5rem;
	font-weight: 600;
	justify-content: center;
	letter-spacing: 2px;
	margin: 0;
	position: relative;
	text-transform: uppercase;
	width: 32px;
`;

export const DatePickerInput = styled.input`
	align-items: center;
	background: ${(props: {disabled: boolean, focus: boolean, valid: boolean}) => props.disabled ? '#f1f2f2 !important' : 'transparent !important'};
	border: ${props => {
    if (props.disabled) {
        return '1px solid #d9dde2';
    } else if (props.focus) {
        return '1px solid #0080a5';
    } else if (!props.valid) {
        return '1px solid #a40c2e !important';
    } else {
        return '1px solid #57666e';
    }}};
	border-radius: 5px 0 0 5px;
	box-shadow: none;
	box-sizing: border-box;
	color: #333;
	display: flex;
	font-family: inherit;
	font-size: 0.875rem;
	font-weight: 500;
	letter-spacing: 1px;
	padding: 8px 0 8px 8px;
	width: 108px;

	::placeholder {
		color: ${props => props.disabled ? '#9ca7b4' : '#999'};
		font-size: 0.875rem;
		font-weight: 400;
		margin: 0;
	}
`;

export const ErrorMessage = styled.p`
	color: #a40c2e;
	left: 0;
	position: absolute !important;
	top: 20px;
`;

export const DatePickerDropdown = styled(Dropdown)`
	height: 60px;
	left: 0;
	position: absolute;
	top: 0;
`;

export const DatePickerDropdownToggle = styled(DropdownToggle)`
	background: transparent;
	cursor: ${(props: {disabled: boolean}) => props.disabled ? 'cursor: none' : 'pointer'};
	filter: alpha(opacity=0);
	height: 100%;
	opacity: 0;
	position: relative;
	width: 140px;
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
	z-index: 10;
	${props => !props.open ? 'z-index: -1000' : null};
	${props => {
    switch (props.position) {
    	case 'bottomRight':
            return 'transform: translate3d(5px, 64px, 0px) !important;';
        case 'bottomLeft':
            return 'transform: translate3d(-105px, 64px, 0px) !important;';
        case 'topRight':
            return 'transform: translate3d(5px, -241px, 0px) !important;' + 'top: -10px;';
        case 'topLeft':
            return 'transform:translate3d(-105px, -241px, 0px) !important;' + 'top: -10px;';
        default:
            return 'transform: translate3d(5px, 64px, 0px) !important;';
    }}};
`;
