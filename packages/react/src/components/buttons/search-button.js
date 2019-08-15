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
var abstract_button_1 = require("./abstract-button");
var StyledButton = styled_components_1.default(abstract_button_1.AbstractButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    background: rgb(255, 255, 255);\n    border-color: rgb(217, 221, 226);\n    color: rgb(99, 114, 130);\n\n    &:focus,\n    &:hover {\n        background-color: rgb(217, 221, 226);\n        border-color: rgb(217, 221, 226);\n        color: rgb(99, 114, 130);\n    }\n\n    &:disabled {\n        &,\n        &:focus,\n        &:hover {\n            background-color: rgb(242, 243, 249);\n            border-color: rgb(217, 221, 226);\n            color: rgb(156, 167, 180);\n        }\n    }\n"], ["\n    background: rgb(255, 255, 255);\n    border-color: rgb(217, 221, 226);\n    color: rgb(99, 114, 130);\n\n    &:focus,\n    &:hover {\n        background-color: rgb(217, 221, 226);\n        border-color: rgb(217, 221, 226);\n        color: rgb(99, 114, 130);\n    }\n\n    &:disabled {\n        &,\n        &:focus,\n        &:hover {\n            background-color: rgb(242, 243, 249);\n            border-color: rgb(217, 221, 226);\n            color: rgb(156, 167, 180);\n        }\n    }\n"])));
var SearchButton = function (_a) {
    var children = _a.children, className = _a.className, disabled = _a.disabled, onClick = _a.onClick;
    var handleClick = function () { onClick && onClick(); };
    return (<StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}
        </StyledButton>);
};
exports.SearchButton = SearchButton;
var templateObject_1;
