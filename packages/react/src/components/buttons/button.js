"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var primary_1 = require("./styles/primary");
var secondary_1 = require("./styles/secondary");
var tertiary_1 = require("./styles/tertiary");
var abstract_button_1 = require("./abstract-button");
var StyledButton = styled_components_1.default(abstract_button_1.AbstractButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n"], ["\n    ",
    "\n"])), function (props) {
    if (props.buttonType === 'secondary') {
        return secondary_1.secondaryStyles;
    }
    else if (props.buttonType === 'tertiary') {
        return tertiary_1.tertiaryStyles;
    }
    return primary_1.primaryStyles;
});
exports.Button = function (_a) {
    var children = _a.children, disabled = _a.disabled, onClick = _a.onClick, buttonType = _a.buttonType;
    var handleClick = function () { onClick && onClick(); };
    return (<StyledButton disabled={disabled} onClick={handleClick} buttonType={buttonType}>
            {children}
        </StyledButton>);
};
var templateObject_1;
