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
var media_view_1 = require("../media-view");
var breakpoints_1 = require("../tokens/breakpoints");
var logo_equisoft_ico_svg_1 = __importDefault(require("../../logos/logo-equisoft-ico.svg"));
var logo_equisoft_reversed_svg_1 = __importDefault(require("../../logos/logo-equisoft-reversed.svg"));
var tabletMin = (breakpoints_1.breakpoints.tablet / 16) + "rem";
var Header = styled_components_1.default.header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  align-items: center;\n  background: rgba(1, 38, 57, 1);\n  box-sizing: border-box;\n  color: rgba(255, 255, 255);\n  display: flex;\n  justify-content: space-between;\n  min-height: 2.75rem;\n  padding: 0.75rem 1rem;\n\n  @media screen and (min-width: ", ") {\n    min-height: 5rem;\n    padding: 1.25rem 1.5rem;\n  }\n"], ["\n  align-items: center;\n  background: rgba(1, 38, 57, 1);\n  box-sizing: border-box;\n  color: rgba(255, 255, 255);\n  display: flex;\n  justify-content: space-between;\n  min-height: 2.75rem;\n  padding: 0.75rem 1rem;\n\n  @media screen and (min-width: ", ") {\n    min-height: 5rem;\n    padding: 1.25rem 1.5rem;\n  }\n"])), tabletMin);
var Brand = styled_components_1.default.a(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex: 1 1 50vw;\n\n  @media screen and (min-width: ", ") {\n    background: transparent;\n    flex: 0 1 auto;\n    justify-content: space-between;\n  }\n\n  &,\n  &:active,\n  &:visited {\n    color: inherit;\n    text-decoration: none;\n  }\n"], ["\n  align-items: center;\n  display: flex;\n  flex: 1 1 50vw;\n\n  @media screen and (min-width: ", ") {\n    background: transparent;\n    flex: 0 1 auto;\n    justify-content: space-between;\n  }\n\n  &,\n  &:active,\n  &:visited {\n    color: inherit;\n    text-decoration: none;\n  }\n"])), tabletMin);
var Logo = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex: 1 1 50%;\n  font-size: 1.5rem;\n  font-weight: 700;\n"], ["\n  align-items: center;\n  display: flex;\n  flex: 1 1 50%;\n  font-size: 1.5rem;\n  font-weight: 700;\n"])));
var Equisoft = styled_components_1.default(logo_equisoft_reversed_svg_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 40px;\n  width: 161px;\n"], ["\n  height: 40px;\n  width: 161px;\n"])));
var Project = styled_components_1.default.em(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: block;\n  flex: 1 1 50%;\n  font-size: 1.25rem;\n  font-style: normal;\n  line-height: 1.5rem;\n  padding: 0 1.5rem;\n\n  @media screen and (min-width: ", ") {\n    border-left: 1px solid rgb(255, 255, 255);\n    font-size: 1rem;\n    line-height: 2.5rem;\n    margin: 0 0 0 1.5rem;\n    padding: 0 0 0 1.5rem;\n  }\n"], ["\n  display: block;\n  flex: 1 1 50%;\n  font-size: 1.25rem;\n  font-style: normal;\n  line-height: 1.5rem;\n  padding: 0 1.5rem;\n\n  @media screen and (min-width: ", ") {\n    border-left: 1px solid rgb(255, 255, 255);\n    font-size: 1rem;\n    line-height: 2.5rem;\n    margin: 0 0 0 1.5rem;\n    padding: 0 0 0 1.5rem;\n  }\n"])), tabletMin);
function Headband(props) {
    var children = props.children, appName = props.appName;
    return (<Header {...props} role="banner">
            <Brand href="/" aria-label="Home" rel="index">
                <media_view_1.MediaView maxWidth={breakpoints_1.breakpoints.tablet}>
                    <Logo>
                        <logo_equisoft_ico_svg_1.default />
                    </Logo>
                </media_view_1.MediaView>

                <media_view_1.MediaView minWidth={breakpoints_1.breakpoints.tablet}>
                    <Logo>
                        <Equisoft />
                    </Logo>
                </media_view_1.MediaView>

                <Project>{appName}</Project>
            </Brand>

            <div>
                {children}
            </div>
        </Header>);
}
exports.Headband = Headband;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
