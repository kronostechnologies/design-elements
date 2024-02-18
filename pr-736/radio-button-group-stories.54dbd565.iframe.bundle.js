"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[9764],{"./stories/radio-button-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Callback:()=>Callback,Controlled:()=>Controlled,ControlledContent:()=>ControlledContent,DefaultChecked:()=>DefaultChecked,DefaultCheckedWithContent:()=>DefaultCheckedWithContent,Disabled:()=>Disabled,Normal:()=>Normal,WithContent:()=>WithContent,WithTooltip:()=>WithTooltip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Controls/Radio Button Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup},buttons=[{label:"Earth",value:"earth"},{label:"Mars",value:"mars",defaultChecked:!0},{label:"Pluto",value:"pluto",disabled:!0},{label:"Saturn",value:"saturn"}],Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{"data-testid":"radio-button-group-id",label:"Planets",groupName:"planets-1",buttons});Normal.displayName="Normal";const Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"cars-1",buttons:[{label:"Toyota",value:"toyota",disabled:!0}]});Disabled.displayName="Disabled";const DefaultChecked=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"cars-2",buttons:[{label:"Toyota",value:"toyota",defaultChecked:!0}]});DefaultChecked.displayName="DefaultChecked";const WithTooltip=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{"data-testid":"radio-button-group-id",label:"Planets",tooltip:{label:"Tooltip text content"},groupName:"planets-2",buttons});WithTooltip.displayName="WithTooltip";const WithContent=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{label:"Content",groupName:"content",buttons:[{label:"With content",value:"with",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"This is some content"})}},{label:"Without content",value:"without"}]});WithContent.displayName="WithContent",WithContent.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.y;const DefaultCheckedWithContent=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{label:"Content",groupName:"content2",buttons:[{defaultChecked:!0,label:"With content",value:"with",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"This is some content"})}},{label:"Without content",value:"without"}]});DefaultCheckedWithContent.displayName="DefaultCheckedWithContent",DefaultCheckedWithContent.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.y;const Controlled=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("red");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{label:"Colors",groupName:"colors",checkedValue:value,buttons:[{label:"Blue",value:"blue"},{label:"Red",value:"red"},{label:"Green",value:"green",disabled:!0},{label:"Yellow",value:"yellow"}],onChange:function handleChange(event){value!==event.target.value&&setValue(event.target.value)}})};Controlled.displayName="Controlled",Controlled.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.y;const ControlledContent=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("red");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{buttonType:"primary",label:"Change to Blue",onClick:()=>setValue("blue")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"controlled-default",checkedValue:value,buttons:[{label:"Blue",value:"blue",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:"Pewpew"})}},{label:"Red",value:"red",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:"Coucou"})}},{label:"Green",value:"green",disabled:!0},{label:"Yellow",value:"yellow"}],onChange:function handleChange(event){value!==event.target.value&&setValue(event.target.value)}})]})};ControlledContent.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.y;const Callback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"cities",onChange:function onChange(event){const checkedState=event.target.checked?"checked":"unchecked";console.info(`Radio button ${event.target.value} is ${checkedState}!`)},buttons:[{label:"Québec",value:"quebec"},{label:"Montréal",value:"montreal"}]});Callback.displayName="Callback",Callback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.y,Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => <RadioButtonGroup data-testid=\'radio-button-group-id\' label="Planets" groupName="planets-1" buttons={buttons} />',...Normal.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"() => <RadioButtonGroup groupName=\"cars-1\" buttons={[{\n  label: 'Toyota',\n  value: 'toyota',\n  disabled: true\n}]} />",...Disabled.parameters?.docs?.source}}},DefaultChecked.parameters={...DefaultChecked.parameters,docs:{...DefaultChecked.parameters?.docs,source:{originalSource:"() => <RadioButtonGroup groupName=\"cars-2\" buttons={[{\n  label: 'Toyota',\n  value: 'toyota',\n  defaultChecked: true\n}]} />",...DefaultChecked.parameters?.docs?.source}}},WithTooltip.parameters={...WithTooltip.parameters,docs:{...WithTooltip.parameters?.docs,source:{originalSource:"() => <RadioButtonGroup data-testid='radio-button-group-id' label=\"Planets\" tooltip={{\n  label: 'Tooltip text content'\n}} groupName=\"planets-2\" buttons={buttons} />",...WithTooltip.parameters?.docs?.source}}},WithContent.parameters={...WithContent.parameters,docs:{...WithContent.parameters?.docs,source:{originalSource:"() => <RadioButtonGroup label=\"Content\" groupName=\"content\" buttons={[{\n  label: 'With content',\n  value: 'with',\n  content: {\n    element: <p>This is some content</p>\n  }\n}, {\n  label: 'Without content',\n  value: 'without'\n}]} />",...WithContent.parameters?.docs?.source}}},DefaultCheckedWithContent.parameters={...DefaultCheckedWithContent.parameters,docs:{...DefaultCheckedWithContent.parameters?.docs,source:{originalSource:"() => <RadioButtonGroup label=\"Content\" groupName=\"content2\" buttons={[{\n  defaultChecked: true,\n  label: 'With content',\n  value: 'with',\n  content: {\n    element: <p>This is some content</p>\n  }\n}, {\n  label: 'Without content',\n  value: 'without'\n}]} />",...DefaultCheckedWithContent.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"() => {\n  const [value, setValue] = useState('red');\n  function handleChange(event: ChangeEvent<HTMLInputElement>): void {\n    if (value !== event.target.value) {\n      setValue(event.target.value);\n    }\n  }\n  return <RadioButtonGroup label=\"Colors\" groupName=\"colors\" checkedValue={value} buttons={[{\n    label: 'Blue',\n    value: 'blue'\n  }, {\n    label: 'Red',\n    value: 'red'\n  }, {\n    label: 'Green',\n    value: 'green',\n    disabled: true\n  }, {\n    label: 'Yellow',\n    value: 'yellow'\n  }]} onChange={handleChange} />;\n}",...Controlled.parameters?.docs?.source}}},ControlledContent.parameters={...ControlledContent.parameters,docs:{...ControlledContent.parameters?.docs,source:{originalSource:"() => {\n  const [value, setValue] = useState('red');\n  function handleChange(event: ChangeEvent<HTMLInputElement>): void {\n    if (value !== event.target.value) {\n      setValue(event.target.value);\n    }\n  }\n  return <>\n            <Button buttonType=\"primary\" label=\"Change to Blue\" onClick={() => setValue('blue')} />\n            <RadioButtonGroup groupName=\"controlled-default\" checkedValue={value} buttons={[{\n      label: 'Blue',\n      value: 'blue',\n      content: {\n        element: <div>Pewpew</div>\n      }\n    }, {\n      label: 'Red',\n      value: 'red',\n      content: {\n        element: <div>Coucou</div>\n      }\n    }, {\n      label: 'Green',\n      value: 'green',\n      disabled: true\n    }, {\n      label: 'Yellow',\n      value: 'yellow'\n    }]} onChange={handleChange} />\n        </>;\n}",...ControlledContent.parameters?.docs?.source}}},Callback.parameters={...Callback.parameters,docs:{...Callback.parameters?.docs,source:{originalSource:"() => {\n  function onChange(event: ChangeEvent<HTMLInputElement>): void {\n    const checkedState: string = event.target.checked ? 'checked' : 'unchecked';\n    console.info(`Radio button ${event.target.value} is ${checkedState}!`);\n  }\n  return <RadioButtonGroup groupName=\"cities\" onChange={onChange} buttons={[{\n    label: 'Québec',\n    value: 'quebec'\n  }, {\n    label: 'Montréal',\n    value: 'montreal'\n  }]} />;\n}",...Callback.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Disabled","DefaultChecked","WithTooltip","WithContent","DefaultCheckedWithContent","Controlled","ControlledContent","Callback"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);