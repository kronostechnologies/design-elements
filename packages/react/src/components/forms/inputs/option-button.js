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
var Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  z-index: -1;\n\n  + label {\n    align-items: center;\n    background-color: #fff;\n    border: 1px solid #d9dde2;\n    border-radius: 8px;\n    color: #637282;\n    display: flex;\n    font-size: 24px;\n    justify-content: center;\n    min-height: 40px;\n  }\n\n  &:checked + label {\n    background-color: #006296;\n    border-color: #006296;\n    color: #fff;\n  }\n"], ["\n  position: absolute;\n  z-index: -1;\n\n  + label {\n    align-items: center;\n    background-color: #fff;\n    border: 1px solid #d9dde2;\n    border-radius: 8px;\n    color: #637282;\n    display: flex;\n    font-size: 24px;\n    justify-content: center;\n    min-height: 40px;\n  }\n\n  &:checked + label {\n    background-color: #006296;\n    border-color: #006296;\n    color: #fff;\n  }\n"])));
var OptionButton = function (_a) {
    var checked = _a.checked, label = _a.label, name = _a.name, value = _a.value;
    return (<div>
        <Input checked={checked} id="id" name={name} type="radio" value={value}/>
        <label htmlFor="id">{label}</label>
    </div>);
};
exports.OptionButton = OptionButton;
var templateObject_1;
