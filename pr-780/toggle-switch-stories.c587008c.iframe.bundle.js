"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[4636],{"./stories/toggle-switch.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,Normal:()=>Normal,Toggled:()=>Toggled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Toggle Switch",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleSwitch,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A},Normal=()=>{const[toggled,setToggled]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleSwitch,{"data-testid":"some-data-testid",label:"Switch",toggled,onToggle:setToggled})};Normal.displayName="Normal";const Toggled=()=>{const[toggled,setToggled]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleSwitch,{label:"Switch",toggled,onToggle:setToggled})};Toggled.displayName="Toggled";const Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleSwitch,{label:"Switch",disabled:!0,toggled:!1,onToggle:()=>console.info("Should not be called!")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ToggleSwitch,{label:"Switch",disabled:!0,toggled:!0,onToggle:()=>console.info("Should not be called!")})]});Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => {\n  const [toggled, setToggled] = useState(false);\n  return <ToggleSwitch data-testid='some-data-testid' label=\"Switch\" toggled={toggled} onToggle={setToggled} />;\n}",...Normal.parameters?.docs?.source}}},Toggled.parameters={...Toggled.parameters,docs:{...Toggled.parameters?.docs,source:{originalSource:'() => {\n  const [toggled, setToggled] = useState(true);\n  return <ToggleSwitch label="Switch" toggled={toggled} onToggle={setToggled} />;\n}',...Toggled.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"() => <>\n        <ToggleSwitch label=\"Switch\" disabled toggled={false} onToggle={() => console.info('Should not be called!')} />\n        <br />\n        <ToggleSwitch label=\"Switch\" disabled toggled onToggle={() => console.info('Should not be called!')} />\n    </>",...Disabled.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Toggled","Disabled"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);