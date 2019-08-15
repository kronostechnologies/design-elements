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
var field_container_1 = require("../field-container");
var inputs_js_1 = require("../styles/inputs.js");
var StyledSelect = styled_components_1.default.select(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-position: right 0.75rem center;\n  background-repeat: no-repeat;\n  background-size: 0.75rem;\n  position: relative;\n"], ["\n  ", "\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-position: right 0.75rem center;\n  background-repeat: no-repeat;\n  background-size: 0.75rem;\n  position: relative;\n"])), inputs_js_1.styles);
var Select = function (_a) {
    var children = _a.children, id = _a.id, label = _a.label, options = _a.options, required = _a.required, valid = _a.valid, validMsg = _a.validMsg, props = __rest(_a, ["children", "id", "label", "options", "required", "valid", "validMsg"]);
    var _b = react_1.useState(true), validity = _b[0], setValidity = _b[1];
    var selectOptions = options.map(function (option, i) {
        var key = option.value + "-" + i;
        return <option key={key} value={option.value}>{option.label}</option>;
    });
    var handleCheckValidity = function (event) {
        setValidity(event.target.checkValidity());
    };
    return (<field_container_1.FieldContainer fieldId={id} label={label} valid={validity} validMsg={validMsg || 'You must select an option'}>
            <StyledSelect {...props} id={id} onBlur={function (event) { handleCheckValidity(event); }} onChange={function (event) { handleCheckValidity(event); }} required={required}>
                {selectOptions}
            </StyledSelect>
        </field_container_1.FieldContainer>);
};
exports.Select = Select;
var templateObject_1;
