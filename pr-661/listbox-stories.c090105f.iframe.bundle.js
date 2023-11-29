"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[6817],{"./stories/listbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Normal:()=>Normal,WithAutofocus:()=>WithAutofocus,WithCheck:()=>WithCheck,WithDisabledOptions:()=>WithDisabledOptions,WithMultiselect:()=>WithMultiselect,WithThreeItemsVisible:()=>WithThreeItemsVisible,WithoutOptionLabel:()=>WithoutOptionLabel,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Controls/Listbox",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox},options=[{label:"Option A",value:"optionA"},{label:"Option B",value:"optionB"},{label:"Option C",value:"optionC"},{label:"Option D",value:"optionD"}],optionsWithoutLabel=[{value:"optionA"},{value:"optionB"}],Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options,onChange:option=>console.info("onChange",option)});Normal.displayName="Normal";const WithAutofocus=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options,onChange:option=>console.info("onChange",option),autofocus:!0});WithAutofocus.displayName="WithAutofocus";const WithMultiselect=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{checkIndicator:!0,defaultValue:["optionA","optionC"],multiselect:!0,options,onChange:option=>console.info("onChange",option)});WithMultiselect.displayName="WithMultiselect";const WithCheck=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{checkIndicator:!0,defaultValue:"optionC",options,onChange:option=>console.info("onChange",option)});WithCheck.displayName="WithCheck";const WithThreeItemsVisible=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options,onChange:option=>console.info("onChange",option),numberOfItemsVisible:3});WithThreeItemsVisible.displayName="WithThreeItemsVisible";const WithoutOptionLabel=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options:optionsWithoutLabel,onChange:option=>console.info("onChange",option),numberOfItemsVisible:3});WithoutOptionLabel.displayName="WithoutOptionLabel";const WithDisabledOptions=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options:[{label:"Option A",value:"optionA"},{label:"Option B",value:"optionB",disabled:!0},{label:"Option C",value:"optionC",disabled:!0},{label:"Option D",value:"optionD"}],onChange:option=>console.info("onChange",option)});WithDisabledOptions.displayName="WithDisabledOptions",Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => <Listbox options={options} onChange={option => console.info('onChange', option)} />",...Normal.parameters?.docs?.source}}},WithAutofocus.parameters={...WithAutofocus.parameters,docs:{...WithAutofocus.parameters?.docs,source:{originalSource:"() => <Listbox options={options} onChange={option => console.info('onChange', option)} autofocus />",...WithAutofocus.parameters?.docs?.source}}},WithMultiselect.parameters={...WithMultiselect.parameters,docs:{...WithMultiselect.parameters?.docs,source:{originalSource:"() => <Listbox checkIndicator defaultValue={['optionA', 'optionC']} multiselect options={options} onChange={option => console.info('onChange', option)} />",...WithMultiselect.parameters?.docs?.source}}},WithCheck.parameters={...WithCheck.parameters,docs:{...WithCheck.parameters?.docs,source:{originalSource:"() => <Listbox checkIndicator defaultValue=\"optionC\" options={options} onChange={option => console.info('onChange', option)} />",...WithCheck.parameters?.docs?.source}}},WithThreeItemsVisible.parameters={...WithThreeItemsVisible.parameters,docs:{...WithThreeItemsVisible.parameters?.docs,source:{originalSource:"() => <Listbox options={options} onChange={option => console.info('onChange', option)} numberOfItemsVisible={3} />",...WithThreeItemsVisible.parameters?.docs?.source}}},WithoutOptionLabel.parameters={...WithoutOptionLabel.parameters,docs:{...WithoutOptionLabel.parameters?.docs,source:{originalSource:"() => <Listbox options={optionsWithoutLabel} onChange={option => console.info('onChange', option)} numberOfItemsVisible={3} />",...WithoutOptionLabel.parameters?.docs?.source}}},WithDisabledOptions.parameters={...WithDisabledOptions.parameters,docs:{...WithDisabledOptions.parameters?.docs,source:{originalSource:"() => {\n  const disabledOptions = [{\n    label: 'Option A',\n    value: 'optionA'\n  }, {\n    label: 'Option B',\n    value: 'optionB',\n    disabled: true\n  }, {\n    label: 'Option C',\n    value: 'optionC',\n    disabled: true\n  }, {\n    label: 'Option D',\n    value: 'optionD'\n  }];\n  return <Listbox options={disabledOptions} onChange={option => console.info('onChange', option)} />;\n}",...WithDisabledOptions.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithAutofocus","WithMultiselect","WithCheck","WithThreeItemsVisible","WithoutOptionLabel","WithDisabledOptions"]}}]);