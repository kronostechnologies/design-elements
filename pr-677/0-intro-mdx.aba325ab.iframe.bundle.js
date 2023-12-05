"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[2482,4956],{"./stories/0-intro.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_d3c0f6293f_4_yarn_berry_cache_storybook_addon_docs_npm_7_5_3_a70b3f79db_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/@mdx-js-react-virtual-2ecd1822fb/4/.yarn/berry/cache/@mdx-js-react-npm-2.3.0-d5582a450b-10c0.zip/node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../.yarn/__virtual__/@storybook-blocks-virtual-45b874a432/4/.yarn/berry/cache/@storybook-blocks-npm-7.5.3-30c3e26bbd-10c0.zip/node_modules/@storybook/blocks/dist/index.mjs"),_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/0-intro.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2",h4:"h4",p:"p",code:"code",pre:"pre",a:"a",strong:"strong"},(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_d3c0f6293f_4_yarn_berry_cache_storybook_addon_docs_npm_7_5_3_a70b3f79db_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.h_,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"equisofts-design-system",children:"Equisoft's Design System"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"add-the-library-to-your-project",children:"Add the library to your project"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"yarn add @equisoft/design-elements-react"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"add-the-designsystem-provider-to-your-app",children:"Add the DesignSystem provider to your app"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Simply add the provider in your App component. It should be something like this:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-typescript",children:"import { DesignSystem } from '@equisoft/design-elements-react';\nimport { VoidFunctionComponent } from 'react';\nimport { Router } from 'react-router';\nimport { Route, Switch } from 'react-router-dom';\n\nexport const App: VoidFunctionComponent = () => (\n    <DesignSystem>\n        <Router>\n            <Switch>\n                <Route component={HomeComponent} />\n            </Switch>\n        </Router>\n    </DesignSystem>\n);\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Ed,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.DesignSystem}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"theming",children:"Theming"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["For most cases, you won't need to provide a theme, as the DesignSystem uses Equisoft's theme by default. However, it's\npossible to override the theme, or parts of the theme. For more details, take a look at the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/kronostechnologies/design-elements/blob/master/packages/react/src/themes/theme.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"Theme definition"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__.Theming}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"internationalization",children:"Internationalization"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["If your application supports multiple languages, you simply need to sync the selected language in your application with\nthe ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"DesignSystem"})," provider's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"language"})," prop. The default language is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"english"}),".\nThe following sample shows that the provider only translates the messages\nrelated to the design system. For a more complex example, take a look at the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/kronostechnologies/webapp-boilerplate/tree/master/web/src/browser",target:"_blank",rel:"nofollow noopener noreferrer",children:"webapp-boilerplate"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Xz,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__.Internationalization})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_d3c0f6293f_4_yarn_berry_cache_storybook_addon_docs_npm_7_5_3_a70b3f79db_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../../.yarn/__virtual__/@mdx-js-react-virtual-2ecd1822fb/4/.yarn/berry/cache/@mdx-js-react-npm-2.3.0-d5582a450b-10c0.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./stories/0-intro.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Internationalization:()=>Internationalization,Theming:()=>Theming,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Introduction",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem},Theming={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{theme:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.testTheme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Custom theme"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Default Equisoft theme"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary"})]})})]})},Internationalization={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{language:"fr",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SectionalBanner,{type:"info",children:"This message however is your responsibility."})})};Theming.parameters={...Theming.parameters,docs:{...Theming.parameters?.docs,source:{originalSource:'{\n  render() {\n    return <>\n                <DesignSystem theme={testTheme}>\n                    <div>\n                        <h3>Custom theme</h3>\n                        <Button label="Primary" buttonType="primary" />\n                        <Button label="Secondary" buttonType="secondary" />\n                        <Button label="Tertiary" buttonType="tertiary" />\n                    </div>\n                </DesignSystem>\n                <DesignSystem>\n                    <div>\n                        <h3>Default Equisoft theme</h3>\n                        <Button label="Primary" buttonType="primary" />\n                        <Button label="Secondary" buttonType="secondary" />\n                        <Button label="Tertiary" buttonType="tertiary" />\n                    </div>\n                </DesignSystem>\n            </>;\n  }\n}',...Theming.parameters?.docs?.source}}},Internationalization.parameters={...Internationalization.parameters,docs:{...Internationalization.parameters?.docs,source:{originalSource:'{\n  render() {\n    return <DesignSystem language="fr">\n                <SectionalBanner type="info">\n                    This message however is your responsibility.\n                </SectionalBanner>\n            </DesignSystem>;\n  }\n}',...Internationalization.parameters?.docs?.source}}};const __namedExportsOrder=["Theming","Internationalization"]}}]);