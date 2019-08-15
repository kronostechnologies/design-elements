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
var Field = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: rgb(164, 12, 46);\n  font-size: 0.75rem;\n  font-weight: 400;\n  letter-spacing: 0.0166em;\n  line-height: 1.1666;\n  margin: 0.25rem 0 0;\n"], ["\n  color: rgb(164, 12, 46);\n  font-size: 0.75rem;\n  font-weight: 400;\n  letter-spacing: 0.0166em;\n  line-height: 1.1666;\n  margin: 0.25rem 0 0;\n"])));
var InvalidField = function (_a) {
    var controlId = _a.controlId, feedbackMsg = _a.feedbackMsg;
    return (<Field role="alert" aria-live="polite" id={controlId + "_invalid"}>
        {feedbackMsg}
    </Field>);
};
exports.InvalidField = InvalidField;
var templateObject_1;
