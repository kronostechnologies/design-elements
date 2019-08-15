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
var plus_svg_1 = __importDefault(require("feather-icons/dist/icons/plus.svg"));
var button_1 = require("./button");
var PlusIcon = styled_components_1.default(plus_svg_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 1rem;\n  margin-right: 0.5rem;\n  width: 1rem;\n"], ["\n  height: 1rem;\n  margin-right: 0.5rem;\n  width: 1rem;\n"])));
var AddButton = function (_a) {
    var children = _a.children, disabled = _a.disabled, onClick = _a.onClick, buttonType = _a.buttonType;
    var handleClick = function () { onClick && onClick(); };
    return (<button_1.Button disabled={disabled} onClick={handleClick} buttonType={buttonType}>
        <PlusIcon />
            {children}
        </button_1.Button>);
};
exports.AddButton = AddButton;
var templateObject_1;
