"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[1531,9229],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/textarea.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_textarea_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/textarea.stories.tsx");function _createMdxContent(props){const _components={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_textarea_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"text-area",children:"Text area"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#definition",children:"Definition"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#usage",children:"Usage"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#variants",children:"Variants"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#properties",children:"Properties"})}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Text Area allows users to input a multi-line text [1]."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_textarea_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-to-use",children:"When to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Use when users have to enter free multi-line text."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-not-to-use",children:"When not to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["Do not use when users have to enter one line of text.","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"E.g. Name, Last Name, Organization, etc."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"default",children:"Default"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_textarea_stories__WEBPACK_IMPORTED_MODULE_3__.Default}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"max-length",children:"Max length"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_textarea_stories__WEBPACK_IMPORTED_MODULE_3__.MaxLength}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"with-toggletip-information",children:"With Toggletip information"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_textarea_stories__WEBPACK_IMPORTED_MODULE_3__.WithToggletip}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.TextArea}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"references",children:"References"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://primer.style/components/textarea",rel:"nofollow",children:"https://primer.style/components/textarea"})}),"\n"]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./stories/textarea.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledValue:()=>ControlledValue,Default:()=>Default,EventCallbacks:()=>EventCallbacks,MaxLength:()=>MaxLength,WithToggletip:()=>WithToggletip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const TextAreaMeta={title:"Components/Text Area",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,args:{label:"Text area label"},argTypes:{onBlur:{control:{disable:!0}},onChange:{control:{disable:!0}},onFocus:{control:{disable:!0}}}},__WEBPACK_DEFAULT_EXPORT__=TextAreaMeta,Default={args:{hint:"Hint"},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{...args,"data-testid":"some-data-test-id"})},MaxLength={args:{maxLength:25,hint:"Hint"}},ControlledValue={args:{value:"This is the value"}},EventCallbacks={parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A,render:args=>{function handleEvent(event){console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{...args,onChange:handleEvent,onBlur:handleEvent,onFocus:handleEvent})}},WithToggletip={...TextAreaMeta,args:{toggletip:{label:"Toggletip label",children:"Toggletip content"}}},__namedExportsOrder=["Default","MaxLength","ControlledValue","EventCallbacks","WithToggletip"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    hint: 'Hint'\n  },\n  render: args => <TextArea\n  // eslint-disable-next-line\n  {...args} data-testid=\"some-data-test-id\" />\n}",...Default.parameters?.docs?.source}}},MaxLength.parameters={...MaxLength.parameters,docs:{...MaxLength.parameters?.docs,source:{originalSource:"{\n  args: {\n    maxLength: 25,\n    hint: 'Hint'\n  }\n}",...MaxLength.parameters?.docs?.source}}},ControlledValue.parameters={...ControlledValue.parameters,docs:{...ControlledValue.parameters?.docs,source:{originalSource:"{\n  args: {\n    value: 'This is the value'\n  }\n}",...ControlledValue.parameters?.docs?.source}}},EventCallbacks.parameters={...EventCallbacks.parameters,docs:{...EventCallbacks.parameters?.docs,source:{originalSource:"{\n  parameters: rawCodeParameters,\n  render: args => {\n    function handleEvent(event: SyntheticEvent<HTMLTextAreaElement>): void {\n      console.info(`Custom function called on ${event.type}. Current value: ${event.currentTarget.value}`);\n    }\n    return <TextArea\n    // eslint-disable-next-line\n    {...args} onChange={handleEvent} onBlur={handleEvent} onFocus={handleEvent} />;\n  }\n}",...EventCallbacks.parameters?.docs?.source}}},WithToggletip.parameters={...WithToggletip.parameters,docs:{...WithToggletip.parameters?.docs,source:{originalSource:"{\n  ...TextAreaMeta,\n  args: {\n    toggletip: {\n      label: 'Toggletip label',\n      children: 'Toggletip content'\n    }\n  }\n}",...WithToggletip.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);