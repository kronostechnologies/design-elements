"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8386],{"./stories/listbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Multiselect:()=>Multiselect,Normal:()=>Normal,WithCallbacks:()=>WithCallbacks,WithCaptions:()=>WithCaptions,WithControlledValue:()=>WithControlledValue,WithDefaultValue:()=>WithDefaultValue,WithDisabledOptions:()=>WithDisabledOptions,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Listbox",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox},options=[{label:"Option A",value:"optionA"},{label:"Option B",value:"optionB"},{label:"Option C",value:"optionC"},{label:"Option D",value:"optionD",disabled:!0},{label:"Option E",value:"optionE"},{label:"Option F",value:"optionF"},{label:"Option G",value:"optionG"}],Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options});Normal.displayName="Normal";const WithDefaultValue=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{defaultValue:"optionF",options});WithDefaultValue.displayName="WithDefaultValue";const WithCaptions=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options:[{label:"Option A",value:"optionA",caption:"The first one"},{label:"Option B",value:"optionB",caption:"Why not this one?"},{label:"Option C",value:"optionC",caption:"This one is also an option"}]});WithCaptions.displayName="WithCaptions";const WithDisabledOptions=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options:[{label:"Option A",value:"optionA"},{label:"Option B",value:"optionB",disabled:!0},{label:"Option C",value:"optionC",disabled:!0},{label:"Option D",value:"optionD"}]});WithDisabledOptions.displayName="WithDisabledOptions";const StyledButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button)`
    margin-top: 1rem;
`,WithControlledValue=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(void 0);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options,onChange:function handleChange(option){setValue(option.value)},value}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledButton,{buttonType:"primary",onClick:()=>setValue("optionC"),children:"Set value to Option C"})]})},WithCallbacks=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{options,onFocusChange:option=>console.info("onFocusChange",option),onChange:option=>console.info("onChange",option)});WithCallbacks.displayName="WithCallbacks";const Multiselect=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Listbox,{defaultValue:["optionA","optionC"],multiselect:!0,options});Multiselect.displayName="Multiselect",Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => <Listbox options={options} />",...Normal.parameters?.docs?.source}}},WithDefaultValue.parameters={...WithDefaultValue.parameters,docs:{...WithDefaultValue.parameters?.docs,source:{originalSource:'() => <Listbox defaultValue="optionF" options={options} />',...WithDefaultValue.parameters?.docs?.source}}},WithCaptions.parameters={...WithCaptions.parameters,docs:{...WithCaptions.parameters?.docs,source:{originalSource:"() => {\n  const optionsWithCaptions = [{\n    label: 'Option A',\n    value: 'optionA',\n    caption: 'The first one'\n  }, {\n    label: 'Option B',\n    value: 'optionB',\n    caption: 'Why not this one?'\n  }, {\n    label: 'Option C',\n    value: 'optionC',\n    caption: 'This one is also an option'\n  }];\n  return <Listbox options={optionsWithCaptions} />;\n}",...WithCaptions.parameters?.docs?.source}}},WithDisabledOptions.parameters={...WithDisabledOptions.parameters,docs:{...WithDisabledOptions.parameters?.docs,source:{originalSource:"() => {\n  const disabledOptions = [{\n    label: 'Option A',\n    value: 'optionA'\n  }, {\n    label: 'Option B',\n    value: 'optionB',\n    disabled: true\n  }, {\n    label: 'Option C',\n    value: 'optionC',\n    disabled: true\n  }, {\n    label: 'Option D',\n    value: 'optionD'\n  }];\n  return <Listbox options={disabledOptions} />;\n}",...WithDisabledOptions.parameters?.docs?.source}}},WithControlledValue.parameters={...WithControlledValue.parameters,docs:{...WithControlledValue.parameters?.docs,source:{originalSource:"() => {\n  const [value, setValue] = useState<string | undefined>(undefined);\n  function handleChange(option: ListboxOption): void {\n    setValue(option.value);\n  }\n  return <>\n            <Listbox options={options} onChange={handleChange} value={value} />\n            <StyledButton buttonType=\"primary\" onClick={() => setValue('optionC')}>\n                Set value to Option C\n            </StyledButton>\n        </>;\n}",...WithControlledValue.parameters?.docs?.source}}},WithCallbacks.parameters={...WithCallbacks.parameters,docs:{...WithCallbacks.parameters?.docs,source:{originalSource:"() => <Listbox options={options} onFocusChange={option => console.info('onFocusChange', option)} onChange={option => console.info('onChange', option)} />",...WithCallbacks.parameters?.docs?.source}}},Multiselect.parameters={...Multiselect.parameters,docs:{...Multiselect.parameters?.docs,source:{originalSource:"() => <Listbox defaultValue={['optionA', 'optionC']} multiselect options={options} />",...Multiselect.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithDefaultValue","WithCaptions","WithDisabledOptions","WithControlledValue","WithCallbacks","Multiselect"]}}]);
//# sourceMappingURL=listbox-stories.b390803b.iframe.bundle.js.map