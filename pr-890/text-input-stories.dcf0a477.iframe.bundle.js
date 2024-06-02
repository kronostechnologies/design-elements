"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[6745],{"./stories/text-input.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,EventCallbacks:()=>EventCallbacks,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx");const TextInputMeta={title:"Components/Text Input",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextInput,args:{type:"text"},argTypes:{onBlur:{control:{disable:!0}},onChange:{control:{disable:!0}},onFocus:{control:{disable:!0}},onKeyDown:{control:{disable:!0}},onKeyUp:{control:{disable:!0}},onMouseUp:{control:{disable:!0}},value:{control:{type:"text"}}}},__WEBPACK_DEFAULT_EXPORT__=TextInputMeta,Default={...TextInputMeta,args:{label:"First Name",validationErrorMessage:"Error message",hint:"Hint"}},EventCallbacks={...TextInputMeta,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A,args:{required:!0,label:"See console for callbacks",onBlur:event=>{console.info(`Custom function called on blur. Current value: ${event.currentTarget.value}`)},onChange:event=>{console.info(`Custom function called on change. Current value: ${event.currentTarget.value}`)},onFocus:event=>{console.info(`Custom function called on focus. Current value: ${event.currentTarget.value}`)}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  ...TextInputMeta,\n  args: {\n    label: 'First Name',\n    validationErrorMessage: 'Error message',\n    hint: 'Hint'\n  }\n}",...Default.parameters?.docs?.source}}},EventCallbacks.parameters={...EventCallbacks.parameters,docs:{...EventCallbacks.parameters?.docs,source:{originalSource:"{\n  ...TextInputMeta,\n  parameters: rawCodeParameters,\n  args: {\n    required: true,\n    label: 'See console for callbacks',\n    onBlur: event => {\n      console.info(`Custom function called on blur. Current value: ${event.currentTarget.value}`);\n    },\n    onChange: event => {\n      console.info(`Custom function called on change. Current value: ${event.currentTarget.value}`);\n    },\n    onFocus: event => {\n      console.info(`Custom function called on focus. Current value: ${event.currentTarget.value}`);\n    }\n  }\n}",...EventCallbacks.parameters?.docs?.source}}};const __namedExportsOrder=["Default","EventCallbacks"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);