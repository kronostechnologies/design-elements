"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var inputs_1 = require("../styles/inputs");
var field_container_1 = require("../field-container");
var StyledTextArea = styled_components_1.default.textarea(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  min-height: 6.5rem;\n  min-width: 100%;\n  outline: none;\n  overflow: auto;\n  resize: vertical;\n"], ["\n  ", "\n  min-height: 6.5rem;\n  min-width: 100%;\n  outline: none;\n  overflow: auto;\n  resize: vertical;\n"])), inputs_1.styles);
var TextArea = function (_a) {
    var defaultValue = _a.defaultValue, disabled = _a.disabled, id = _a.id, label = _a.label, onBlur = _a.onBlur, onChange = _a.onChange, onFocus = _a.onFocus, required = _a.required, validMsg = _a.validMsg;
    var _b = react_1.useState({ value: defaultValue || '' }), value = _b[0].value, setValue = _b[1];
    var _c = react_1.useState({ validity: true }), validity = _c[0].validity, setValidity = _c[1];
    var handleBlur = function (event) {
        var newValue = event.target.value;
        setValue({ value: newValue });
        setValidity({ validity: event.target.checkValidity() });
        if (typeof onBlur === 'function') {
            onBlur(newValue);
        }
    };
    var handleChange = function (event) {
        var newValue = event.target.value;
        setValue({ value: newValue });
        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    };
    var handleFocus = function () {
        if (typeof onFocus === 'function') {
            onFocus(value);
        }
    };
    return (<field_container_1.FieldContainer fieldId={id} label={label} valid={validity} validMsg={validMsg || 'This text area input is invalid'}>
            <StyledTextArea disabled={disabled} id={id} onBlur={function (event) { handleBlur(event); }} onChange={function (event) { handleChange(event); }} onFocus={handleFocus} required={required} value={value}/>
        </field_container_1.FieldContainer>);
};
exports.TextArea = TextArea;
var templateObject_1;
