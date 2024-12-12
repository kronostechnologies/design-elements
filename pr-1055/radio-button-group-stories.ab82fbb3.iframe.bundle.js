"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8523],{"./stories/radio-button-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Callback:()=>Callback,Controlled:()=>Controlled,Default:()=>Default,WithConditionalContent:()=>WithConditionalContent,WithTooltip:()=>WithTooltip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Radio Button Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup},buttons=[{label:"Earth",value:"earth"},{label:"Mars",value:"mars",defaultChecked:!0},{label:"Pluto",value:"pluto",disabled:!0},{label:"Saturn",value:"saturn"}],Default={args:{label:"Planets",groupName:"planets-1",buttons}},WithConditionalContent={args:{label:"Select an option",groupName:"content",buttons:[{label:"This options has content",value:"with",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"This is some content"})}},{label:"This one does not",value:"without"},{label:"This options has form content",value:"form",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input",{type:"text"})}}]}},WithTooltip={args:{label:"Planets",tooltip:{label:"Tooltip text content"},groupName:"planets-2",buttons}},controlledButtons=[{label:"Earth",value:"earth"},{label:"Mars",value:"mars"},{label:"Pluto",value:"pluto",disabled:!0},{label:"Saturn",value:"saturn"}],Controlled=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("mars");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{buttonType:"primary",label:"Change to Saturn",onClick:()=>setValue("saturn")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"controlled-planets",checkedValue:value,buttons:controlledButtons,onChange:function handleChange(event){value!==event.target.value&&setValue(event.target.value)}})]})};Controlled.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A;const Callback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"cities",onChange:function onChange(event){const checkedState=event.target.checked?"checked":"unchecked";console.info(`Radio button ${event.target.value} is ${checkedState}!`)},buttons:[{label:"Québec",value:"quebec"},{label:"Montréal",value:"montreal"}]});Callback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A;const __namedExportsOrder=["Default","WithConditionalContent","WithTooltip","Controlled","Callback"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Planets',\n    groupName: 'planets-1',\n    buttons\n  }\n}",...Default.parameters?.docs?.source}}},WithConditionalContent.parameters={...WithConditionalContent.parameters,docs:{...WithConditionalContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Select an option',\n    groupName: 'content',\n    buttons: [{\n      label: 'This options has content',\n      value: 'with',\n      content: {\n        element: <p>This is some content</p>\n      }\n    }, {\n      label: 'This one does not',\n      value: 'without'\n    }, {\n      label: 'This options has form content',\n      value: 'form',\n      content: {\n        element: <input type=\"text\" />\n      }\n    }]\n  }\n}",...WithConditionalContent.parameters?.docs?.source}}},WithTooltip.parameters={...WithTooltip.parameters,docs:{...WithTooltip.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Planets',\n    tooltip: {\n      label: 'Tooltip text content'\n    },\n    groupName: 'planets-2',\n    buttons\n  }\n}",...WithTooltip.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:'() => {\n  const [value, setValue] = useState(\'mars\');\n  function handleChange(event: ChangeEvent<HTMLInputElement>): void {\n    if (value !== event.target.value) {\n      setValue(event.target.value);\n    }\n  }\n  return <>\n            <Button buttonType="primary" label="Change to Saturn" onClick={() => setValue(\'saturn\')} />\n            <RadioButtonGroup groupName="controlled-planets" checkedValue={value} buttons={controlledButtons} onChange={handleChange} />\n        </>;\n}',...Controlled.parameters?.docs?.source}}},Callback.parameters={...Callback.parameters,docs:{...Callback.parameters?.docs,source:{originalSource:"() => {\n  function onChange(event: ChangeEvent<HTMLInputElement>): void {\n    const checkedState: string = event.target.checked ? 'checked' : 'unchecked';\n    console.info(`Radio button ${event.target.value} is ${checkedState}!`);\n  }\n  return <RadioButtonGroup groupName=\"cities\" onChange={onChange} buttons={[{\n    label: 'Québec',\n    value: 'quebec'\n  }, {\n    label: 'Montréal',\n    value: 'montreal'\n  }]} />;\n}",...Callback.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);