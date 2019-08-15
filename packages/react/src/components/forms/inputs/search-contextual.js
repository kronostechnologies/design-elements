"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var search_input_1 = require("./search-input");
var SearchContextual = function (_a) {
    var disabled = _a.disabled, id = _a.id, label = _a.label, onChange = _a.onChange;
    return (<search_input_1.SearchInput disabled={disabled} id={id} label={label} onChange={onChange}/>);
};
exports.SearchContextual = SearchContextual;
