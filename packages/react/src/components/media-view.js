"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var MediaView = /** @class */ (function (_super) {
    __extends(MediaView, _super);
    function MediaView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            screenWidth: (window.innerWidth || document.documentElement.clientWidth),
        };
        _this.handleScreeResize = _this.handleScreeResize.bind(_this);
        return _this;
    }
    MediaView.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.handleScreeResize);
    };
    MediaView.prototype.componentWillUnmount = function () {
        window.addEventListener('resize', this.handleScreeResize);
    };
    MediaView.prototype.handleScreeResize = function () {
        this.setState({ screenWidth: (window.innerWidth || document.documentElement.clientWidth) });
    };
    MediaView.prototype.render = function () {
        var _a = this.props, children = _a.children, maxWidth = _a.maxWidth, minWidth = _a.minWidth;
        var screenWidth = this.state.screenWidth;
        var isMinDisplay = false;
        var isMaxDisplay = false;
        if (minWidth !== undefined) {
            isMinDisplay = (screenWidth >= minWidth);
        }
        if (maxWidth !== undefined) {
            isMaxDisplay = (screenWidth < maxWidth);
        }
        if (isMinDisplay || isMaxDisplay) {
            return <>{children}</>;
        }
        return null;
    };
    return MediaView;
}(react_1.Component));
exports.MediaView = MediaView;
