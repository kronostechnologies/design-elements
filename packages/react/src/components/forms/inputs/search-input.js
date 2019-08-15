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
var search_svg_1 = __importDefault(require("feather-icons/dist/icons/search.svg"));
var x_svg_1 = __importDefault(require("feather-icons/dist/icons/x.svg"));
var styled_components_1 = __importDefault(require("styled-components"));
var visuallyhidden_1 = require("../../a11y/visuallyhidden");
var search_button_1 = require("../../buttons/search-button");
var label_1 = require("../label");
var inputs_1 = require("../styles/inputs");
var SearchWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n\n  label {\n    bottom: 0.5rem;\n    color: rgb(99, 114, 130);\n    display: inline-block;\n    height: 1rem;\n    left: 0.5rem;\n    margin: auto;\n    position: absolute;\n    top: 0.5rem;\n    width: 1rem;\n  }\n"], ["\n  display: flex;\n\n  label {\n    bottom: 0.5rem;\n    color: rgb(99, 114, 130);\n    display: inline-block;\n    height: 1rem;\n    left: 0.5rem;\n    margin: auto;\n    position: absolute;\n    top: 0.5rem;\n    width: 1rem;\n  }\n"])));
var InnerWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1 1 auto;\n  position: relative;\n"], ["\n  flex: 1 1 auto;\n  position: relative;\n"])));
var IcoSearch = styled_components_1.default(search_svg_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  height: 1rem;\n  width: 1rem;\n"], ["\n  color: ", ";\n  height: 1rem;\n  width: 1rem;\n"])), function (props) { return (props.disabled ? 'rgb(156, 167, 180)' : 'rgb(99, 114, 130)'); });
var IcoReset = styled_components_1.default(x_svg_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: black;\n  height: 0.75rem;\n  width: 0.75rem;\n"], ["\n  color: black;\n  height: 0.75rem;\n  width: 0.75rem;\n"])));
var Input = styled_components_1.default.input(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  ", " /* Must be the first rule */\n  border-radius: ", ";\n  line-height: 1;\n  padding: 0.5rem 1.75rem 0.5rem 2rem;\n\n  label + & {\n    margin-top: 0;\n  }\n\n  &::-webkit-search-decoration,\n  &::-webkit-search-cancel-button,\n  &::-webkit-search-results-button,\n  &::-webkit-search-results-decoration {\n    display: none;\n  }\n"], ["\n  ", " /* Must be the first rule */\n  border-radius: ", ";\n  line-height: 1;\n  padding: 0.5rem 1.75rem 0.5rem 2rem;\n\n  label + & {\n    margin-top: 0;\n  }\n\n  &::-webkit-search-decoration,\n  &::-webkit-search-cancel-button,\n  &::-webkit-search-results-button,\n  &::-webkit-search-results-decoration {\n    display: none;\n  }\n"])), inputs_1.styles, function (props) { return (props.hasButton && '0.25rem 0 0 0.25rem'); });
var Reset = styled_components_1.default.button(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  appearance: none;\n  background: transparent;\n  border: 0;\n  bottom: 0.5rem;\n  cursor: pointer;\n  display: none;\n  height: 0.75rem;\n  margin: auto;\n  padding: 0;\n  position: absolute;\n  right: 0.5rem;\n  top: 0.5rem;\n  width: 0.75rem;\n\n  input:valid + & {\n    display: inline-block;\n  }\n"], ["\n  appearance: none;\n  background: transparent;\n  border: 0;\n  bottom: 0.5rem;\n  cursor: pointer;\n  display: none;\n  height: 0.75rem;\n  margin: auto;\n  padding: 0;\n  position: absolute;\n  right: 0.5rem;\n  top: 0.5rem;\n  width: 0.75rem;\n\n  input:valid + & {\n    display: inline-block;\n  }\n"])));
var SearchSubmit = styled_components_1.default(search_button_1.SearchButton)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  border-left: 0;\n  border-radius: 0 0.25rem 0.25rem 0;\n  position: relative;\n"], ["\n  border-left: 0;\n  border-radius: 0 0.25rem 0.25rem 0;\n  position: relative;\n"])));
var SearchInput = function (_a) {
    var disabled = _a.disabled, hasButton = _a.hasButton, id = _a.id, label = _a.label, onChange = _a.onChange, onSearch = _a.onSearch;
    var _b = react_1.useState({ value: '' }), value = _b[0].value, setValue = _b[1];
    var handleChange = function (event) {
        var newValue = event.target.value;
        setValue({ value: newValue });
        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    };
    var handleKeyDown = function (event) {
        if (typeof onSearch === 'function' && event.keyCode === 13) {
            onSearch(value);
        }
    };
    var handleReset = function () {
        setValue({ value: '' });
    };
    var handleSearchButtonClick = function () {
        if (typeof onSearch === 'function') {
            onSearch(value);
        }
    };
    return (<SearchWrapper>
            <InnerWrapper>
                <label_1.Label forId={id}>
                    <IcoSearch disabled={disabled}/>
                    <visuallyhidden_1.VisuallyHidden>{label}</visuallyhidden_1.VisuallyHidden>
                </label_1.Label>

                <Input autoComplete="on" disabled={disabled} onChange={function (event) { handleChange(event); }} onKeyDown={function (event) { handleKeyDown(event); }} hasButton={hasButton} id={id} type="search" value={value}/>

                <Reset onClick={handleReset}>
                    <IcoReset />
                    <visuallyhidden_1.VisuallyHidden>Reset</visuallyhidden_1.VisuallyHidden>
                </Reset>
            </InnerWrapper>
            {hasButton &&
        (<SearchSubmit disabled={disabled} className="primary" onClick={handleSearchButtonClick}>
                {label}
            </SearchSubmit>)}
        </SearchWrapper>);
};
exports.SearchInput = SearchInput;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
