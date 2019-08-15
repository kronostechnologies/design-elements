"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var enso_svg_1 = __importDefault(require("../icons/enso.svg"));
var EnsoSpinner = styled_components_1.default(enso_svg_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  animation: roll 1s infinite;\n  animation-timing-function: linear;\n  fill: #e2732d;\n  height: 80px;\n  width: 83px;\n\n  @keyframes roll {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n  }\n"], ["\n  animation: roll 1s infinite;\n  animation-timing-function: linear;\n  fill: #e2732d;\n  height: 80px;\n  width: 83px;\n\n  @keyframes roll {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n  }\n"])));
exports.EnsoSpinner = EnsoSpinner;
var templateObject_1;
