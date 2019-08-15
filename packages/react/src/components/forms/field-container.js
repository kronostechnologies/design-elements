"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var invalid_field_1 = require("../feedbacks/invalid-field");
var label_1 = require("./label");
var StyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0 0 1.5rem;\n\n  input,\n  select,\n  textarea {\n    border-color: ", ";\n  }\n\n  &:focus {\n    border-color: ", ";\n  }\n"], ["\n  margin: 0 0 1.5rem;\n\n  input,\n  select,\n  textarea {\n    border-color: ", ";\n  }\n\n  &:focus {\n    border-color: ", ";\n  }\n"])), function (props) { return (props.valid ? 'rgb(217, 221, 226)' : 'rgb(164, 12, 46)'); }, function (props) { return (props.valid ? 'rgb(0, 128, 165)' : 'rgb(164, 12, 46)'); });
var FieldContainer = function (_a) {
    var children = _a.children, fieldId = _a.fieldId, label = _a.label, valid = _a.valid, validMsg = _a.validMsg, props = __rest(_a, ["children", "fieldId", "label", "valid", "validMsg"]);
    return (<StyledDiv {...props} valid={valid}>
        {label && (<label_1.Label forId={fieldId}>
                {label}
            </label_1.Label>)}

        {children}

        {!valid &&
        <invalid_field_1.InvalidField controlId={fieldId} feedbackMsg={validMsg}/>}
    </StyledDiv>);
};
exports.FieldContainer = FieldContainer;
var templateObject_1;
