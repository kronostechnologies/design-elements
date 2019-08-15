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
var range_1 = __importDefault(require("lodash-es/range"));
var styled_components_1 = __importDefault(require("styled-components"));
var Div = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  max-width: 160px;\n"], ["\n  align-items: center;\n  display: flex;\n  max-width: 160px;\n"])));
var StyledProgress = styled_components_1.default.progress(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  appearance: none;\n  height: 4px;\n  margin: 6px;\n  min-width: 148px;\n\n  &[value] {\n    &::-moz-progress-bar {\n      background-color: #36477f;\n    }\n\n    &::-webkit-progress-bar {\n      background-color: #d9dde2;\n    }\n\n    &::-webkit-progress-value {\n      background-color: #36477f;\n    }\n  }\n"], ["\n  appearance: none;\n  height: 4px;\n  margin: 6px;\n  min-width: 148px;\n\n  &[value] {\n    &::-moz-progress-bar {\n      background-color: #36477f;\n    }\n\n    &::-webkit-progress-bar {\n      background-color: #d9dde2;\n    }\n\n    &::-webkit-progress-value {\n      background-color: #36477f;\n    }\n  }\n"])));
var UL = styled_components_1.default.ul(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  height: 16px;\n  justify-content: space-between;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  width: 160px;\n"], ["\n  display: flex;\n  height: 16px;\n  justify-content: space-between;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  width: 160px;\n"])));
var AbstractStep = styled_components_1.default.li(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background-color: #36477f;\n  border-radius: 50%;\n  display: inline-block;\n  width: 16px;\n"], ["\n  background-color: #36477f;\n  border-radius: 50%;\n  display: inline-block;\n  width: 16px;\n"])));
var PastStep = AbstractStep;
var CurrentStep = styled_components_1.default(AbstractStep)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  border: 4px solid #d9dde2;\n  width: 8px;\n"], ["\n  border: 4px solid #d9dde2;\n  width: 8px;\n"])));
var FutureStep = styled_components_1.default(AbstractStep)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background-color: #d9dde2;\n"], ["\n  background-color: #d9dde2;\n"])));
var getStep = function (_a) {
    var step = _a.step, max = _a.max, value = _a.value;
    var StepComponent;
    if (step < value) {
        StepComponent = PastStep;
    }
    else if (step === value) {
        StepComponent = CurrentStep;
        if (step === max) {
            StepComponent = PastStep;
        }
    }
    else {
        StepComponent = FutureStep;
    }
    return <StepComponent key={step}/>;
};
var Progress = function (_a) {
    var max = _a.max, value = _a.value;
    return (<Div>
        <StyledProgress max={max} value={value}/>
        <UL>
            {range_1.default(max + 1).map(function (step) { return getStep({ step: step, max: max, value: value }); })}
        </UL>
    </Div>);
};
exports.Progress = Progress;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
