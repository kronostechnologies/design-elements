"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[1606,4908],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/money-input.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_money_input_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/money-input.stories.tsx");function _createMdxContent(props){const _components={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_money_input_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"money-input",children:"Money Input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#definition",children:"Definition"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#usage",children:"Usage"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#variants",children:"Variants"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"#properties",children:"Properties"})}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"definition",children:"Definition"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Money input allows users to enter numeric values that represent an amount of money in a particular currency."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_money_input_stories__WEBPACK_IMPORTED_MODULE_3__.FrenchLocale}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-to-use",children:"When to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Use when you have to enter or edit money values."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-not-to-use",children:"When not to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Do not use for anything else than a money value."}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"variants",children:"Variants"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"french-currency-display",children:"French Currency Display"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"When the component displays a CAD or USD currency in French, the currency symbol is on the right."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_money_input_stories__WEBPACK_IMPORTED_MODULE_3__.FrenchLocale}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"english-currency-display",children:"English Currency display"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"When the component displays a CAD or USD currency in English, the currency symbol is on the left."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_money_input_stories__WEBPACK_IMPORTED_MODULE_3__.EnglishLocale}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"with-toggletip-information",children:"With Toggletip information"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_money_input_stories__WEBPACK_IMPORTED_MODULE_3__.WithToggletip}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"properties",children:"Properties"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.MoneyInput}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"references",children:"References"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://carbondesignsystem.com/components/number-input/code/",rel:"nofollow",children:"https://carbondesignsystem.com/components/number-input/code/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://corporatefinanceinstitute.com/resources/financial-modeling/free-financial-modeling-guide/?fbclid=IwAR0bHd65BZ9TFxzqEAwzqajDWaPccLr9pBHj-6EutI0AXXvWRpROi0-XjAo",rel:"nofollow",children:"https://corporatefinanceinstitute.com/resources/financial-modeling/free-financial-modeling-guide/?fbclid=IwAR0bHd65BZ9TFxzqEAwzqajDWaPccLr9pBHj-6EutI0AXXvWRpROi0-XjAo"})}),"\n"]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_design_elements_design_elements_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./stories/money-input.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EnglishLocale:()=>EnglishLocale,FrenchLocale:()=>FrenchLocale,OnChangeCallback:()=>OnChangeCallback,WithToggletip:()=>WithToggletip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../react/dist/bundle.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const MoneyInputMeta={title:"Components/Money Input",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.MoneyInput,args:{label:"Entrez un montant",hint:"Hint",locale:"fr-CA"},argTypes:{onChange:{control:{disable:!0}}},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.MoneyInput,{...args,"data-testid":"some-data-testid"})},__WEBPACK_DEFAULT_EXPORT__=MoneyInputMeta,FrenchLocale={...MoneyInputMeta},EnglishLocale={...MoneyInputMeta,args:{label:"Choose a number",locale:"en-CA"}},OnChangeCallback={...MoneyInputMeta,args:{onChange:(value,formattedValue)=>{console.info("value:",value),console.info("formattedValue: ",formattedValue)}}};OnChangeCallback.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A;const WithToggletip={...MoneyInputMeta,args:{toggletip:{label:"Toggletip label",children:"Toggletip content"}}},__namedExportsOrder=["FrenchLocale","EnglishLocale","OnChangeCallback","WithToggletip"];FrenchLocale.parameters={...FrenchLocale.parameters,docs:{...FrenchLocale.parameters?.docs,source:{originalSource:"{\n  ...MoneyInputMeta\n}",...FrenchLocale.parameters?.docs?.source}}},EnglishLocale.parameters={...EnglishLocale.parameters,docs:{...EnglishLocale.parameters?.docs,source:{originalSource:"{\n  ...MoneyInputMeta,\n  args: {\n    label: 'Choose a number',\n    locale: 'en-CA'\n  }\n}",...EnglishLocale.parameters?.docs?.source}}},OnChangeCallback.parameters={...OnChangeCallback.parameters,docs:{...OnChangeCallback.parameters?.docs,source:{originalSource:"{\n  ...MoneyInputMeta,\n  args: {\n    onChange: (value, formattedValue) => {\n      console.info('value:', value);\n      console.info('formattedValue: ', formattedValue);\n    }\n  }\n}",...OnChangeCallback.parameters?.docs?.source}}},WithToggletip.parameters={...WithToggletip.parameters,docs:{...WithToggletip.parameters?.docs,source:{originalSource:"{\n  ...MoneyInputMeta,\n  args: {\n    toggletip: {\n      label: 'Toggletip label',\n      children: 'Toggletip content'\n    }\n  }\n}",...WithToggletip.parameters?.docs?.source}}}},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);