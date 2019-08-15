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
var visuallyhidden_1 = require("./styles/visuallyhidden");
var Hidden = styled_components_1.default.span(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), visuallyhidden_1.styles);
var VisuallyHidden = function (_a) {
    var children = _a.children;
    return (<Hidden>
        {children}
    </Hidden>);
};
exports.VisuallyHidden = VisuallyHidden;
var templateObject_1;
