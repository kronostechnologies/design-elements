"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[7349],{"./stories/numeric-input.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Adornment:()=>Adornment,ControlledValue:()=>ControlledValue,Disabled:()=>Disabled,ExplicitInvalid:()=>ExplicitInvalid,MinimumAndMaximum:()=>MinimumAndMaximum,Normal:()=>Normal,Precision:()=>Precision,Required:()=>Required,WithoutLabel:()=>WithoutLabel,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Numeric Input",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput},Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Number",defaultValue:"50"});Normal.displayName="Normal";const Adornment=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Start",adornment:"%",adornmentPosition:"start",defaultValue:"50"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"End",adornment:"%",adornmentPosition:"end",textAlign:"right",defaultValue:"50"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Text",adornmentPosition:"end",adornment:"years",textAlign:"right",defaultValue:"5"})]}),WithoutLabel=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{defaultValue:"50"});WithoutLabel.displayName="WithoutLabel";const MinimumAndMaximum=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Percentage",hint:"Minimum 0 - Maximum 100",adornment:"%",min:0,max:100}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Quantity",hint:"Minimum 5",adornment:"Qty",min:5})]}),Required=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label",required:!0});Required.displayName="Required";const Precision=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label (precision = 0)",precision:0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label (precision = 2)",precision:2})]}),ControlledValue=()=>{const[inputValue,setInputValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("50");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label",onChange:(_event,{value,valueAsNumber})=>{setInputValue(value),console.info(`NumericInput onChange value: ${value}`),console.info(`NumericInput onChange valueAsNumber: ${valueAsNumber}`)},onBlur:(_event,{value,valueAsNumber})=>{console.info(`NumericInput onBlur value: ${value}`),console.info(`NumericInput onBlur valueAsNumber: ${valueAsNumber}`)},value:inputValue})};ControlledValue.displayName="ControlledValue",ControlledValue.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.O;const Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label",disabled:!0,defaultValue:100});Disabled.displayName="Disabled";const ExplicitInvalid=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{label:"Label",invalid:!0,validationErrorMessage:"This is a custom error message",defaultValue:100}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.NumericInput,{invalid:!0,defaultValue:100})]});Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => <NumericInput label="Number" defaultValue="50" />',...Normal.parameters?.docs?.source}}},Adornment.parameters={...Adornment.parameters,docs:{...Adornment.parameters?.docs,source:{originalSource:'() => <>\n        <NumericInput label="Start" adornment="%" adornmentPosition="start" defaultValue="50" />\n        <NumericInput label="End" adornment="%" adornmentPosition="end" textAlign="right" defaultValue="50" />\n        <NumericInput label="Text" adornmentPosition="end" adornment="years" textAlign="right" defaultValue="5" />\n    </>',...Adornment.parameters?.docs?.source}}},WithoutLabel.parameters={...WithoutLabel.parameters,docs:{...WithoutLabel.parameters?.docs,source:{originalSource:'() => <NumericInput defaultValue="50" />',...WithoutLabel.parameters?.docs?.source}}},MinimumAndMaximum.parameters={...MinimumAndMaximum.parameters,docs:{...MinimumAndMaximum.parameters?.docs,source:{originalSource:'() => <>\n        <NumericInput label="Percentage" hint="Minimum 0 - Maximum 100" adornment="%" min={0} max={100} />\n        <NumericInput label="Quantity" hint="Minimum 5" adornment="Qty" min={5} />\n    </>',...MinimumAndMaximum.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:'() => <NumericInput label="Label" required />',...Required.parameters?.docs?.source}}},Precision.parameters={...Precision.parameters,docs:{...Precision.parameters?.docs,source:{originalSource:'() => <>\n        <NumericInput label="Label (precision = 0)" precision={0} />\n        <NumericInput label="Label (precision = 2)" precision={2} />\n    </>',...Precision.parameters?.docs?.source}}},ControlledValue.parameters={...ControlledValue.parameters,docs:{...ControlledValue.parameters?.docs,source:{originalSource:"() => {\n  const [inputValue, setInputValue] = useState('50');\n  return <NumericInput label=\"Label\" onChange={(_event, {\n    value,\n    valueAsNumber\n  }) => {\n    setInputValue(value);\n    console.info(`NumericInput onChange value: ${value}`);\n    console.info(`NumericInput onChange valueAsNumber: ${valueAsNumber}`);\n  }} onBlur={(_event, {\n    value,\n    valueAsNumber\n  }) => {\n    console.info(`NumericInput onBlur value: ${value}`);\n    console.info(`NumericInput onBlur valueAsNumber: ${valueAsNumber}`);\n  }} value={inputValue} />;\n}",...ControlledValue.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'() => <NumericInput label="Label" disabled defaultValue={100} />',...Disabled.parameters?.docs?.source}}},ExplicitInvalid.parameters={...ExplicitInvalid.parameters,docs:{...ExplicitInvalid.parameters?.docs,source:{originalSource:'() => <>\n        <NumericInput label="Label" invalid validationErrorMessage="This is a custom error message" defaultValue={100} />\n        <NumericInput invalid defaultValue={100} />\n    </>',...ExplicitInvalid.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Adornment","WithoutLabel","MinimumAndMaximum","Required","Precision","ControlledValue","Disabled","ExplicitInvalid"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);