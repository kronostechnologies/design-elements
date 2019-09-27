import styled from 'styled-components';
import { FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

export const DatePickerContainer = styled.div`
	position: relative;
`;

export const DatePickerFormGroup = styled(FormGroup)`
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
	position: relative;
	width: 200px;
	height: 32px;
	box-sizing: border-box;
	border: 2px solid #57666e;
	border-radius: 5px;
	overflow: hidden;
	background-color: #ffffff;
`;

export const DatePickerLabel = styled(Label)`
	margin: 0;
	padding: 0 1rem;
	font-weight: 600;
	font-size: 0.5rem;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: #06c;
	border-left: 2px solid #57666e;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DatePickerInput = styled(Input)`
	padding: 0.4rem 0 0.4rem 1rem;
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
		font-size: 0.9rem;
	}
`;

export const DatePickerDropdown = styled(Dropdown)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`

export const DatePickerDropdownToggle = styled(DropdownToggle)`
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;
	opacity: 0;
	filter: alpha(opacity=0);
`;

export const DatePickerDropdownMenu = styled(DropdownMenu)`
	position: absolute;
	left: -5px !important;
	width: 400px;
	border: none;
	padding: 0;
	margin: 0;
	outline: none;
`;
