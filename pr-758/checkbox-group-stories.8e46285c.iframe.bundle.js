"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[3322],{"./stories/checkbox-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Callback:()=>Callback,Controlled:()=>Controlled,DefaultChecked:()=>DefaultChecked,Disabled:()=>Disabled,Normal:()=>Normal,__namedExportsOrder:()=>__namedExportsOrder,default:()=>checkbox_group_stories});var bundle=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),chunk_JWY6Y6NU=__webpack_require__("../../.yarn/__virtual__/@storybook-react-virtual-fed8dffe5a/4/.yarn/berry/cache/@storybook-react-npm-7.6.17-11b3e7cb66-10c0.zip/node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),external_STORYBOOK_MODULE_GLOBAL_.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,external_STORYBOOK_MODULE_PREVIEW_API_.start)(chunk_JWY6Y6NU.o,{render:chunk_JWY6Y6NU.X}),forceReRender=api.forceReRender;api.clientApi.raw;chunk_JWY6Y6NU.X;var parameters=__webpack_require__("./stories/utils/parameters.tsx"),jsx_runtime=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const checkbox_group_stories={title:"Components/Checkbox Group",component:bundle.CheckboxGroup},Checkboxes=[{label:"Boat",name:"vehicule1",value:"boat"},{label:"Plane",name:"vehicule2",value:"plane",defaultChecked:!0},{label:"Car",name:"vehicule3",value:"car",disabled:!0},{label:"Bike",name:"vehicule4",value:"bike"}],CheckboxesControlled=[{label:"Blue",name:"color1",value:"blue"},{label:"Red",name:"color2",value:"red"},{label:"Green",name:"color3",value:"green"},{label:"Yellow",name:"color4",value:"yellow"}];let checkedValues=["blue","yellow"];function handleChange(event){checkedValues.includes(event.target.value)?(checkedValues=checkedValues.filter((value=>value!==event.target.value)),forceReRender()):(checkedValues.push(event.target.value),forceReRender())}const Normal=()=>(0,jsx_runtime.jsx)(bundle.CheckboxGroup,{"data-testid":"some-checkbox-group-data-testid",label:"Vehicule",checkboxGroup:Checkboxes});Normal.displayName="Normal";const Disabled=()=>(0,jsx_runtime.jsx)(bundle.CheckboxGroup,{checkboxGroup:[{label:"Car",name:"vehicule",value:"car",disabled:!0}]});Disabled.displayName="Disabled";const Controlled=()=>(0,jsx_runtime.jsx)(bundle.CheckboxGroup,{label:"Colors",checkboxGroup:CheckboxesControlled,checkedValues,onChange:handleChange});Controlled.displayName="Controlled";const DefaultChecked=()=>(0,jsx_runtime.jsx)(bundle.CheckboxGroup,{checkboxGroup:[{label:"Plane",name:"vehicule",value:"plane",defaultChecked:!0}]});DefaultChecked.displayName="DefaultChecked";const Callback=()=>(0,jsx_runtime.jsx)(bundle.CheckboxGroup,{onChange:function onChange(event){const checkedState=event.target.checked?"checked":"unchecked";console.info(`Checkbox ${event.target.value} is ${checkedState}!`)},checkboxGroup:[{label:"Bike",name:"vehicule",value:"bike",defaultChecked:!1}]});Callback.displayName="Callback",Callback.parameters=parameters.A,Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => <CheckboxGroup data-testid='some-checkbox-group-data-testid' label=\"Vehicule\" checkboxGroup={Checkboxes} />",...Normal.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"() => <CheckboxGroup checkboxGroup={[{\n  label: 'Car',\n  name: 'vehicule',\n  value: 'car',\n  disabled: true\n}]} />",...Disabled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:'() => <CheckboxGroup label="Colors" checkboxGroup={CheckboxesControlled} checkedValues={checkedValues} onChange={handleChange} />',...Controlled.parameters?.docs?.source}}},DefaultChecked.parameters={...DefaultChecked.parameters,docs:{...DefaultChecked.parameters?.docs,source:{originalSource:"() => <CheckboxGroup checkboxGroup={[{\n  label: 'Plane',\n  name: 'vehicule',\n  value: 'plane',\n  defaultChecked: true\n}]} />",...DefaultChecked.parameters?.docs?.source}}},Callback.parameters={...Callback.parameters,docs:{...Callback.parameters?.docs,source:{originalSource:"() => {\n  function onChange(event: ChangeEvent<HTMLInputElement>): void {\n    const checkedState: string = event.target.checked ? 'checked' : 'unchecked';\n    console.info(`Checkbox ${event.target.value} is ${checkedState}!`);\n  }\n  return <CheckboxGroup onChange={onChange} checkboxGroup={[{\n    label: 'Bike',\n    name: 'vehicule',\n    value: 'bike',\n    defaultChecked: false\n  }]} />;\n}",...Callback.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Disabled","Controlled","DefaultChecked","Callback"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);