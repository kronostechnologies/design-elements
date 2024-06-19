"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8409],{"./stories/textarea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledValue:()=>ControlledValue,DefaultValue:()=>DefaultValue,Disabled:()=>Disabled,EventCallbacks:()=>EventCallbacks,MaxLength:()=>MaxLength,Normal:()=>Normal,Required:()=>Required,WithTooltip:()=>WithTooltip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Text Area",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea},Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{"data-testid":"some-data-test-id",label:"Text area label",hint:"Hint"});Normal.displayName="Normal";const WithTooltip=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",tooltip:{label:"Tooltip text content"},hint:"Hint"});WithTooltip.displayName="WithTooltip";const ControlledValue=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",value:"This is the value"});ControlledValue.displayName="ControlledValue";const EventCallbacks=()=>{function handleEvent(event){console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",onChange:handleEvent,onBlur:handleEvent,onFocus:handleEvent})};EventCallbacks.displayName="EventCallbacks",EventCallbacks.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.O;const Required=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",required:!0});Required.displayName="Required";const DefaultValue=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",defaultValue:"Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio."});DefaultValue.displayName="DefaultValue";const Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"A label for the disabled text area",disabled:!0});Disabled.displayName="Disabled";const MaxLength=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Text area label",required:!0,maxLength:25});MaxLength.displayName="MaxLength",Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => <TextArea data-testid="some-data-test-id" label="Text area label" hint="Hint" />',...Normal.parameters?.docs?.source}}},WithTooltip.parameters={...WithTooltip.parameters,docs:{...WithTooltip.parameters?.docs,source:{originalSource:'() => <TextArea label="Text area label" tooltip={{\n  label: \'Tooltip text content\'\n}} hint="Hint" />',...WithTooltip.parameters?.docs?.source}}},ControlledValue.parameters={...ControlledValue.parameters,docs:{...ControlledValue.parameters?.docs,source:{originalSource:'() => <TextArea label="Text area label" value="This is the value" />',...ControlledValue.parameters?.docs?.source}}},EventCallbacks.parameters={...EventCallbacks.parameters,docs:{...EventCallbacks.parameters?.docs,source:{originalSource:'() => {\n  function handleEvent(event: SyntheticEvent<HTMLTextAreaElement>): void {\n    console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`);\n  }\n  return <TextArea label="Text area label" onChange={handleEvent} onBlur={handleEvent} onFocus={handleEvent} />;\n}',...EventCallbacks.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:'() => <TextArea label="Text area label" required />',...Required.parameters?.docs?.source}}},DefaultValue.parameters={...DefaultValue.parameters,docs:{...DefaultValue.parameters?.docs,source:{originalSource:'() => <TextArea label="Text area label" defaultValue="Nullam eu ante vel est convallis dignissim. Fusce suscipit, wisi nec facilisis facilisis,\n         est dui fermentum leo, quis tempor ligula erat quis odio." />',...DefaultValue.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'() => <TextArea label="A label for the disabled text area" disabled />',...Disabled.parameters?.docs?.source}}},MaxLength.parameters={...MaxLength.parameters,docs:{...MaxLength.parameters?.docs,source:{originalSource:'() => <TextArea label="Text area label" required maxLength={25} />',...MaxLength.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithTooltip","ControlledValue","EventCallbacks","Required","DefaultValue","Disabled","MaxLength"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);