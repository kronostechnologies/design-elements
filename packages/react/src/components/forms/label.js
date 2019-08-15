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
var StyledLabel = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: rgb(0, 0, 0);\n  font-size: 0.75rem;\n  font-weight: 400;\n  letter-spacing: 0.0166em;\n  line-height: 1.1666;\n  margin: 0;\n\n  input + & {\n    margin-left: 0.5rem;\n  }\n"], ["\n  color: rgb(0, 0, 0);\n  font-size: 0.75rem;\n  font-weight: 400;\n  letter-spacing: 0.0166em;\n  line-height: 1.1666;\n  margin: 0;\n\n  input + & {\n    margin-left: 0.5rem;\n  }\n"])));
var Label = function (_a) {
    var children = _a.children, forId = _a.forId;
    return (<StyledLabel htmlFor={forId}>
        {children}
    </StyledLabel>);
};
exports.Label = Label;
var templateObject_1;
