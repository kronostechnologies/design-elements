"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[9407],{"./stories/progress-tracker.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Beginning:()=>Beginning,End:()=>End,Middle:()=>Middle,WithLabels:()=>WithLabels,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Data/Progress Tracker",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Progress};function createEmptySteps(count){const steps=[];for(let i=1;i<=count;i++)steps.push({});return steps}function createSteps(count){const steps=[];for(let i=1;i<=count;i++)steps.push({label:`Step ${i}`});return steps}const Beginning=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Progress,{steps:createEmptySteps(3),value:1});Beginning.displayName="Beginning";const Middle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Progress,{steps:createEmptySteps(3),value:2});Middle.displayName="Middle";const End=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Progress,{steps:createEmptySteps(3),value:3});End.displayName="End";const WithLabels=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Progress,{steps:createSteps(10),value:2});WithLabels.displayName="WithLabels",Beginning.parameters={...Beginning.parameters,docs:{...Beginning.parameters?.docs,source:{originalSource:"() => <Progress steps={createEmptySteps(3)} value={1} />",...Beginning.parameters?.docs?.source}}},Middle.parameters={...Middle.parameters,docs:{...Middle.parameters?.docs,source:{originalSource:"() => <Progress steps={createEmptySteps(3)} value={2} />",...Middle.parameters?.docs?.source}}},End.parameters={...End.parameters,docs:{...End.parameters?.docs,source:{originalSource:"() => <Progress steps={createEmptySteps(3)} value={3} />",...End.parameters?.docs?.source}}},WithLabels.parameters={...WithLabels.parameters,docs:{...WithLabels.parameters?.docs,source:{originalSource:"() => <Progress steps={createSteps(10)} value={2} />",...WithLabels.parameters?.docs?.source}}};const __namedExportsOrder=["Beginning","Middle","End","WithLabels"]}}]);