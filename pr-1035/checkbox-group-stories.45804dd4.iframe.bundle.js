"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[3322],{"./stories/checkbox-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Callback:()=>Callback,Controlled:()=>Controlled,DefaultChecked:()=>DefaultChecked,Disabled:()=>Disabled,Normal:()=>Normal,Required:()=>Required,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Checkbox Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,tags:["autodocs"]},Checkboxes=[{label:"Boat",name:"vehicule1",value:"boat"},{label:"Plane",name:"vehicule2",value:"plane",defaultChecked:!0},{label:"Car",name:"vehicule3",value:"car",disabled:!0},{label:"Bike",name:"vehicule4",value:"bike"}],CheckboxesControlled=[{label:"Blue",name:"color1",value:"blue"},{label:"Red",name:"color2",value:"red"},{label:"Green",name:"color3",value:"green"},{label:"Yellow",name:"color4",value:"yellow"}];let checkedValues=["blue","yellow"];function handleChange(event){checkedValues.includes(event.target.value)?checkedValues=checkedValues.filter((value=>value!==event.target.value)):checkedValues.push(event.target.value)}const Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{"data-testid":"some-checkbox-group-data-testid",label:"Vehicule",checkboxGroup:Checkboxes}),Disabled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{checkboxGroup:[{label:"Car",name:"vehicule",value:"car",disabled:!0}]}),Required=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{"data-testid":"some-checkbox-group-data-testid",label:"Vehicule",checkboxGroup:Checkboxes,required:!0,valid:!1}),Controlled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{label:"Colors",checkboxGroup:CheckboxesControlled,checkedValues,onChange:handleChange}),DefaultChecked=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{checkboxGroup:[{label:"Plane",name:"vehicule",value:"plane",defaultChecked:!0}]}),Callback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.CheckboxGroup,{onChange:function onChange(event){const checkedState=event.target.checked?"checked":"unchecked";console.info(`Checkbox ${event.target.value} is ${checkedState}!`)},checkboxGroup:[{label:"Bike",name:"vehicule",value:"bike",defaultChecked:!1}]});Callback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A;const __namedExportsOrder=["Normal","Disabled","Required","Controlled","DefaultChecked","Callback"];Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => <CheckboxGroup data-testid='some-checkbox-group-data-testid' label=\"Vehicule\" checkboxGroup={Checkboxes} />",...Normal.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"() => <CheckboxGroup checkboxGroup={[{\n  label: 'Car',\n  name: 'vehicule',\n  value: 'car',\n  disabled: true\n}]} />",...Disabled.parameters?.docs?.source}}},Required.parameters={...Required.parameters,docs:{...Required.parameters?.docs,source:{originalSource:"() => <CheckboxGroup data-testid='some-checkbox-group-data-testid' label=\"Vehicule\" checkboxGroup={Checkboxes} required valid={false} />",...Required.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:'() => <CheckboxGroup label="Colors" checkboxGroup={CheckboxesControlled} checkedValues={checkedValues} onChange={handleChange} />',...Controlled.parameters?.docs?.source}}},DefaultChecked.parameters={...DefaultChecked.parameters,docs:{...DefaultChecked.parameters?.docs,source:{originalSource:"() => <CheckboxGroup checkboxGroup={[{\n  label: 'Plane',\n  name: 'vehicule',\n  value: 'plane',\n  defaultChecked: true\n}]} />",...DefaultChecked.parameters?.docs?.source}}},Callback.parameters={...Callback.parameters,docs:{...Callback.parameters?.docs,source:{originalSource:"() => {\n  function onChange(event: ChangeEvent<HTMLInputElement>): void {\n    const checkedState: string = event.target.checked ? 'checked' : 'unchecked';\n    console.info(`Checkbox ${event.target.value} is ${checkedState}!`);\n  }\n  return <CheckboxGroup onChange={onChange} checkboxGroup={[{\n    label: 'Bike',\n    name: 'vehicule',\n    value: 'bike',\n    defaultChecked: false\n  }]} />;\n}",...Callback.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);