"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[9229],{"./stories/textarea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledValue:()=>ControlledValue,Default:()=>Default,EventCallbacks:()=>EventCallbacks,MaxLength:()=>MaxLength,WithToggletip:()=>WithToggletip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TextAreaMeta={title:"Components/Text Area",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,args:{label:"Text area label"},argTypes:{onBlur:{control:{disable:!0}},onChange:{control:{disable:!0}},onFocus:{control:{disable:!0}}}},__WEBPACK_DEFAULT_EXPORT__=TextAreaMeta,Default={args:{hint:"Hint"},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{...args,"data-testid":"some-data-test-id"})},MaxLength={args:{maxLength:25,hint:"Hint"}},ControlledValue={args:{value:"This is the value"}},EventCallbacks={parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A,render:args=>{function handleEvent(event){console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{...args,onChange:handleEvent,onBlur:handleEvent,onFocus:handleEvent})}},WithToggletip={...TextAreaMeta,args:{toggletip:{label:"Toggletip label",children:"Toggletip content"}}},__namedExportsOrder=["Default","MaxLength","ControlledValue","EventCallbacks","WithToggletip"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    hint: 'Hint'\n  },\n  render: args => <TextArea\n  // eslint-disable-next-line\n  {...args} data-testid=\"some-data-test-id\" />\n}",...Default.parameters?.docs?.source}}},MaxLength.parameters={...MaxLength.parameters,docs:{...MaxLength.parameters?.docs,source:{originalSource:"{\n  args: {\n    maxLength: 25,\n    hint: 'Hint'\n  }\n}",...MaxLength.parameters?.docs?.source}}},ControlledValue.parameters={...ControlledValue.parameters,docs:{...ControlledValue.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: 'This is the value'\n  }\n}",...ControlledValue.parameters?.docs?.source}}},EventCallbacks.parameters={...EventCallbacks.parameters,docs:{...EventCallbacks.parameters?.docs,source:{originalSource:"{\n  parameters: rawCodeParameters,\n  render: args => {\n    function handleEvent(event: SyntheticEvent<HTMLTextAreaElement>): void {\n      console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`);\n    }\n    return <TextArea\n    // eslint-disable-next-line\n    {...args} onChange={handleEvent} onBlur={handleEvent} onFocus={handleEvent} />;\n  }\n}",...EventCallbacks.parameters?.docs?.source}}},WithToggletip.parameters={...WithToggletip.parameters,docs:{...WithToggletip.parameters?.docs,source:{originalSource:"{\n  ...TextAreaMeta,\n  args: {\n    toggletip: {\n      label: 'Toggletip label',\n      children: 'Toggletip content'\n    }\n  }\n}",...WithToggletip.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);