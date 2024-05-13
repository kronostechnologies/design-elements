"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8278],{"./stories/toggle-button-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonGroup:()=>ButtonGroup,DefaultChecked:()=>DefaultChecked,Disabled:()=>Disabled,WithCallback:()=>WithCallback,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const buttonGroup=[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"},{label:"Option 4",value:"option4"}],defaultCheckedGroup=[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2",defaultPressed:!0},{label:"Option 3",value:"option3"},{label:"Option 4",value:"option4"}],disabledGroup=[{label:"Option 1",value:"option1",disabled:!0},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3",disabled:!0},{label:"Option 4",value:"option4"}],__WEBPACK_DEFAULT_EXPORT__={title:"Components/Toggle Button Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleButtonGroup},ButtonGroup=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleButtonGroup,{groupName:"Story1",buttonGroup});ButtonGroup.displayName="ButtonGroup";const DefaultChecked=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleButtonGroup,{groupName:"Story2",buttonGroup:defaultCheckedGroup});DefaultChecked.displayName="DefaultChecked";const Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleButtonGroup,{groupName:"Story3",buttonGroup:disabledGroup});Disabled.displayName="Disabled";const WithCallback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleButtonGroup,{groupName:"Test5",buttonGroup,onClick:event=>console.info(`Toggled button value: ${event.currentTarget.value}`)});WithCallback.displayName="WithCallback",WithCallback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A,ButtonGroup.parameters={...ButtonGroup.parameters,docs:{...ButtonGroup.parameters?.docs,source:{originalSource:'() => <ToggleButtonGroup groupName="Story1" buttonGroup={buttonGroup} />',...ButtonGroup.parameters?.docs?.source}}},DefaultChecked.parameters={...DefaultChecked.parameters,docs:{...DefaultChecked.parameters?.docs,source:{originalSource:'() => <ToggleButtonGroup groupName="Story2" buttonGroup={defaultCheckedGroup} />',...DefaultChecked.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'() => <ToggleButtonGroup groupName="Story3" buttonGroup={disabledGroup} />',...Disabled.parameters?.docs?.source}}},WithCallback.parameters={...WithCallback.parameters,docs:{...WithCallback.parameters?.docs,source:{originalSource:'() => <ToggleButtonGroup groupName="Test5" buttonGroup={buttonGroup} onClick={(event: MouseEvent<HTMLButtonElement>) => console.info(`Toggled button value: ${event.currentTarget.value}`)} />',...WithCallback.parameters?.docs?.source}}};const __namedExportsOrder=["ButtonGroup","DefaultChecked","Disabled","WithCallback"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);