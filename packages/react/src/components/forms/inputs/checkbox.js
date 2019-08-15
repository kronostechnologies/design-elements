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
var Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 16px;\n  margin: 0;\n  width: 16px;\n"], ["\n  height: 16px;\n  margin: 0;\n  width: 16px;\n"])));
var Checkbox = function (_a) {
    var defaultChecked = _a.defaultChecked, onChange = _a.onChange;
    var ref = react_1.default.createRef();
    var handleChange = function () {
        if (typeof onChange === 'function') {
            if (ref.current === null)
                return;
            onChange(ref.current.checked);
        }
    };
    return (<Input defaultChecked={defaultChecked} ref={ref} onChange={handleChange} type="checkbox"/>);
};
exports.Checkbox = Checkbox;
var templateObject_1;
