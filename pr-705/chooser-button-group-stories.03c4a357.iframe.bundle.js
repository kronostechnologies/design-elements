"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[7966],{"./stories/chooser-button-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InColumns:()=>InColumns,Normal:()=>Normal,WithASkipButton:()=>WithASkipButton,WithCallback:()=>WithCallback,WithValue:()=>WithValue,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const maritalStatus=[{value:"single",label:"Single, living alone or with a roommate"},{value:"married",label:"Married or living with a spouse"}],ageRange=[{value:"0,24",label:"Less than 24 years old"},{value:"25,34",label:"25 to 34 years old"},{value:"35,49",label:"35 to 49 years old"},{value:"50,64",label:"50 to 64 years old"},{value:"65+",label:"65+ years old"}],skipOption={value:"skip",label:"Would rather not say"},__WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Chooser Button Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup},Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup,{"data-testid":"chooser-button-group",groupName:"maritalStatus",inColumns:!1,options:maritalStatus});Normal.displayName="Normal";const WithASkipButton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup,{groupName:"maritalStatusSkip",inColumns:!1,options:maritalStatus,skipOption});WithASkipButton.displayName="WithASkipButton";const WithValue=()=>{const[selectedOption,setSelectedOption]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(ageRange[2]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup,{groupName:"ageRange",options:ageRange,value:selectedOption.value,onChange:option=>setSelectedOption(option)})};WithValue.displayName="WithValue";const InColumns=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup,{groupName:"ageRangeColumn",inColumns:!0,options:ageRange});InColumns.displayName="InColumns";const WithCallback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ChooserButtonGroup,{groupName:"ageRangeCallback",inColumns:!0,onChange:option=>console.info(option),options:ageRange});WithCallback.displayName="WithCallback",WithCallback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.O,Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => <ChooserButtonGroup data-testid='chooser-button-group' groupName=\"maritalStatus\" inColumns={false} options={maritalStatus} />",...Normal.parameters?.docs?.source}}},WithASkipButton.parameters={...WithASkipButton.parameters,docs:{...WithASkipButton.parameters?.docs,source:{originalSource:'() => <ChooserButtonGroup groupName="maritalStatusSkip" inColumns={false} options={maritalStatus} skipOption={skipOption} />',...WithASkipButton.parameters?.docs?.source}}},WithValue.parameters={...WithValue.parameters,docs:{...WithValue.parameters?.docs,source:{originalSource:'() => {\n  const [selectedOption, setSelectedOption] = useState(ageRange[2]);\n  return <ChooserButtonGroup groupName="ageRange" options={ageRange} value={selectedOption.value} onChange={option => setSelectedOption(option)} />;\n}',...WithValue.parameters?.docs?.source}}},InColumns.parameters={...InColumns.parameters,docs:{...InColumns.parameters?.docs,source:{originalSource:'() => <ChooserButtonGroup groupName="ageRangeColumn" inColumns options={ageRange} />',...InColumns.parameters?.docs?.source}}},WithCallback.parameters={...WithCallback.parameters,docs:{...WithCallback.parameters?.docs,source:{originalSource:'() => <ChooserButtonGroup groupName="ageRangeCallback" inColumns onChange={option => console.info(option)} options={ageRange} />',...WithCallback.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithASkipButton","WithValue","InColumns","WithCallback"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);