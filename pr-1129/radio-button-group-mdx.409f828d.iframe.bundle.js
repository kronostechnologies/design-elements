"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8523,9593],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/radio-button-group.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/radio-button-group.stories.tsx");function _createMdxContent(props){const _components={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"radio-button",children:"Radio Button"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#definition",children:"Definition"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#usage",children:"Usage"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#variants",children:"Variants"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#properties",children:"Properties"})}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Radio buttons display mutually exclusive options from which a user selects exactly one [1]."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-to-use",children:"When to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"When you only want the user to select one item [3]."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Use when the user has to select only one option from a list between 2 to 6 choices [3]."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Use it when validation is needed, such as a submit button [3]."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-not-to-use",children:"When not to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Radio buttons should not be used to perform actions [2]."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Don't use it when there are more than 6 options, consider the dropdown-list instead [3]."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"default",children:"Default"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"with-conditional-content",children:"With conditional content"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__.WithConditionalContent}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"with-toggletip-information",children:"With Toggletip information"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_radio_button_group_stories__WEBPACK_IMPORTED_MODULE_3__.WithToggletip}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.RadioButtonGroup}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"references",children:"References"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.nngroup.com/articles/radio-buttons-default-selection/",rel:"nofollow",children:"https://www.nngroup.com/articles/radio-buttons-default-selection/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://uxplanet.org/radio-buttons-ux-design-588e5c0a50dc",rel:"nofollow",children:"https://uxplanet.org/radio-buttons-ux-design-588e5c0a50dc"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://uxdesign.cc/ui-cheat-sheet-radio-buttons-checkboxes-and-other-selectors-bf56777ad59e",rel:"nofollow",children:"https://uxdesign.cc/ui-cheat-sheet-radio-buttons-checkboxes-and-other-selectors-bf56777ad59e"})}),"\n"]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./stories/radio-button-group.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Callback:()=>Callback,Controlled:()=>Controlled,Default:()=>Default,WithConditionalContent:()=>WithConditionalContent,WithToggletip:()=>WithToggletip,WithTooltip:()=>WithTooltip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Radio Button Group",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup},buttons=[{label:"Earth",value:"earth"},{label:"Mars",value:"mars",defaultChecked:!0},{label:"Pluto",value:"pluto",disabled:!0},{label:"Saturn",value:"saturn"}],Default={args:{label:"Planets",groupName:"planets-1",buttons}},WithConditionalContent={args:{label:"Select an option",groupName:"content",buttons:[{label:"This options has content",value:"with",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"This is some content"})}},{label:"This one does not",value:"without"},{label:"This options has form content",value:"form",content:{element:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input",{type:"text"})}}]}},WithTooltip={args:{label:"Planets",tooltip:{label:"Tooltip text content"},groupName:"planets-2",buttons}},WithToggletip={args:{label:"Planets",toggletip:{label:"Toggletip label",children:"Toggletip content"},groupName:"planets-3",buttons}},controlledButtons=[{label:"Earth",value:"earth"},{label:"Mars",value:"mars"},{label:"Pluto",value:"pluto",disabled:!0},{label:"Saturn",value:"saturn"}],Controlled=()=>{const[value,setValue]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("mars");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{buttonType:"primary",label:"Change to Saturn",onClick:()=>setValue("saturn")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"controlled-planets",checkedValue:value,buttons:controlledButtons,onChange:function handleChange(event){value!==event.target.value&&setValue(event.target.value)}})]})};Controlled.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A;const Callback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.RadioButtonGroup,{groupName:"cities",onChange:function onChange(event){const checkedState=event.target.checked?"checked":"unchecked";console.info(`Radio button ${event.target.value} is ${checkedState}!`)},buttons:[{label:"Québec",value:"quebec"},{label:"Montréal",value:"montreal"}]});Callback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A;const __namedExportsOrder=["Default","WithConditionalContent","WithTooltip","WithToggletip","Controlled","Callback"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Planets',\n    groupName: 'planets-1',\n    buttons\n  }\n}",...Default.parameters?.docs?.source}}},WithConditionalContent.parameters={...WithConditionalContent.parameters,docs:{...WithConditionalContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Select an option',\n    groupName: 'content',\n    buttons: [{\n      label: 'This options has content',\n      value: 'with',\n      content: {\n        element: <p>This is some content</p>\n      }\n    }, {\n      label: 'This one does not',\n      value: 'without'\n    }, {\n      label: 'This options has form content',\n      value: 'form',\n      content: {\n        element: <input type=\"text\" />\n      }\n    }]\n  }\n}",...WithConditionalContent.parameters?.docs?.source}}},WithTooltip.parameters={...WithTooltip.parameters,docs:{...WithTooltip.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Planets',\n    tooltip: {\n      label: 'Tooltip text content'\n    },\n    groupName: 'planets-2',\n    buttons\n  }\n}",...WithTooltip.parameters?.docs?.source}}},WithToggletip.parameters={...WithToggletip.parameters,docs:{...WithToggletip.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Planets',\n    toggletip: {\n      label: 'Toggletip label',\n      children: 'Toggletip content'\n    },\n    groupName: 'planets-3',\n    buttons\n  }\n}",...WithToggletip.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:'() => {\n  const [value, setValue] = useState(\'mars\');\n  function handleChange(event: ChangeEvent<HTMLInputElement>): void {\n    if (value !== event.target.value) {\n      setValue(event.target.value);\n    }\n  }\n  return <>\n            <Button buttonType="primary" label="Change to Saturn" onClick={() => setValue(\'saturn\')} />\n            <RadioButtonGroup groupName="controlled-planets" checkedValue={value} buttons={controlledButtons} onChange={handleChange} />\n        </>;\n}',...Controlled.parameters?.docs?.source}}},Callback.parameters={...Callback.parameters,docs:{...Callback.parameters?.docs,source:{originalSource:"() => {\n  function onChange(event: ChangeEvent<HTMLInputElement>): void {\n    const checkedState: string = event.target.checked ? 'checked' : 'unchecked';\n    console.info(`Radio button ${event.target.value} is ${checkedState}!`);\n  }\n  return <RadioButtonGroup groupName=\"cities\" onChange={onChange} buttons={[{\n    label: 'Québec',\n    value: 'quebec'\n  }, {\n    label: 'Montréal',\n    value: 'montreal'\n  }]} />;\n}",...Callback.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);