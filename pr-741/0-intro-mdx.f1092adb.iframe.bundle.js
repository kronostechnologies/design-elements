"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[9110,3312],{"./stories/0-intro.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_b96fe09215_4_yarn_berry_cache_storybook_addon_docs_npm_7_6_16_8d8d5851c3_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/@mdx-js-react-virtual-185c91fd6d/4/.yarn/berry/cache/@mdx-js-react-npm-2.3.0-d5582a450b-10c0.zip/node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../.yarn/__virtual__/@storybook-blocks-virtual-d53108f3fc/4/.yarn/berry/cache/@storybook-blocks-npm-7.6.16-dd39ef3100-10c0.zip/node_modules/@storybook/blocks/dist/index.mjs"),_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/0-intro.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2",h4:"h4",p:"p",code:"code",pre:"pre",a:"a",strong:"strong"},(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_b96fe09215_4_yarn_berry_cache_storybook_addon_docs_npm_7_6_16_8d8d5851c3_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"equisofts-design-system",children:"Equisoft's Design System"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"add-the-library-to-your-project",children:"Add the library to your project"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"yarn add @equisoft/design-elements-react"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h4,{id:"add-the-designsystem-provider-to-your-app",children:"Add the DesignSystem provider to your app"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Simply add the provider in your App component. It should be something like this:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-typescript",children:"import { DesignSystem } from '@equisoft/design-elements-react';\nimport { VoidFunctionComponent } from 'react';\nimport { Router } from 'react-router';\nimport { Route, Switch } from 'react-router-dom';\n\nexport const App: VoidFunctionComponent = () => (\n    <DesignSystem>\n        <Router>\n            <Switch>\n                <Route component={HomeComponent} />\n            </Switch>\n        </Router>\n    </DesignSystem>\n);\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.DesignSystem}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"theming",children:"Theming"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["For most cases, you won't need to provide a theme, as the DesignSystem uses Equisoft's theme by default. However, it's\npossible to override the theme, or parts of the theme. For more details, take a look at the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/kronostechnologies/design-elements/blob/master/packages/react/src/themes/theme.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"Theme definition"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__.Theming}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"internationalization",children:"Internationalization"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["If your application supports multiple languages, you simply need to sync the selected language in your application with\nthe ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"DesignSystem"})," provider's ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"language"})," prop. The default language is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"english"}),".\nThe following sample shows that the provider only translates the messages\nrelated to the design system. For a more complex example, take a look at the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://github.com/kronostechnologies/webapp-boilerplate/tree/master/web/src/browser",target:"_blank",rel:"nofollow noopener noreferrer",children:"webapp-boilerplate"}),"."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_0_intro_stories__WEBPACK_IMPORTED_MODULE_3__.Internationalization})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_b96fe09215_4_yarn_berry_cache_storybook_addon_docs_npm_7_6_16_8d8d5851c3_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../../.yarn/__virtual__/@mdx-js-react-virtual-185c91fd6d/4/.yarn/berry/cache/@mdx-js-react-npm-2.3.0-d5582a450b-10c0.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BN:()=>MDXContext,RP:()=>useMDXComponents,gz:()=>withMDXComponents,xA:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./stories/0-intro.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Internationalization:()=>Internationalization,Theming:()=>Theming,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Introduction",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem},ThemeCustomization1={ref:{"color-brand-50":"#00874E","color-brand-20":"#9EDBC1","color-brand-70":"#0B5E37","color-brand-05":"#E5F3ED","color-brand-80":"#00874E","color-accent-50":"#00874E","color-accent-20":"#CC9B0B","color-accent-70":"#3F474C"},alias:{"default-text-color":"color-brand-05","alternate-text-color":"color-brand-20"},component:{"button-primary-background-color":"color-brand-50","button-primary-inverted-background-color":"color-white","button-primary-border-color":"color-brand-50","button-primary-inverted-border-color":"color-white","button-primary-text-color":"color-white","button-primary-inverted-text-color":"color-brand-50"}},ThemeCustomization2={ref:{"color-brand-05":"#e9e0f9","color-brand-20":"#ad84ea","color-brand-50":"#710096","color-brand-70":"#36005a","color-brand-80":"#230139","color-accent-20":"#f9f5b2","color-accent-50":"#efbd3e","color-accent-70":"#d4a714","color-white":"#FFFFFF","color-black":"#000000","color-neutral-02":"#FAFAFA","color-neutral-05":"#F1F2F2","color-neutral-15":"#DBDEE1","color-neutral-30":"#B7BBC2","color-neutral-50":"#878F9A","color-neutral-65":"#60666E","color-neutral-90":"#1B1C1E","color-alert-02":"#fdfcf6","color-alert-05":"#faf6e9","color-alert-20":"#f9e399","color-alert-50":"#cd9d23","color-alert-70":"#7b6315","color-informative-02":"#F9F7FB","color-informative-05":"#E0F0F9","color-informative-20":"#84C6EA","color-informative-50":"#006296","color-informative-70":"#003A5A","color-success-02":"#F6FCF8","color-success-05":"#E1F7EA","color-success-20":"#8ADDA9","color-success-50":"#008533","color-success-70":"#004F1E","color-warning-02":"#FFFBF5","color-warning-05":"#FFF7E5","color-warning-20":"#FFDD99","color-warning-50":"#F5A200","color-warning-70":"#9E6900","color-warning-80":"#664400","color-discovery-02":"#F9F7FB","color-discovery-05":"#EFEAF6","color-discovery-20":"#CFC1E3","color-discovery-50":"#602FA0","color-discovery-70":"#3A1C60"}},Theming={render(){const[theme,setTheme]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.equisoftTheme),[label,setLabel]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Default Equisoft Theme");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{theme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{display:"box",alignItems:"center",gap:"2rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3",{children:label}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{width:"200px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DropdownList,{onChange:option=>function setCustomTheme(newSelectedTheme){switch(setLabel(newSelectedTheme.label),newSelectedTheme.value){case"customTheme1":setTheme(ThemeCustomization1);break;case"customTheme2":setTheme(ThemeCustomization2);break;default:setTheme(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.equisoftTheme)}}(option),defaultValue:"equisoftTheme",options:[{label:"Default Equisoft Theme",value:"equisoftTheme"},{label:"Custom theme 1",value:"customTheme1"},{label:"Custom Theme 2",value:"customTheme2"}]})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{display:"table-row",alignItems:"center"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive",buttonType:"destructive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive",buttonType:"destructive",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",disabled:!0})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{backgroundColor:"#012639",padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive",buttonType:"destructive",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",inverted:!0})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{backgroundColor:"#012639",padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive",buttonType:"destructive",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",inverted:!0,disabled:!0})]})]})]})})}},Internationalization={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{language:"fr",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SectionalBanner,{type:"info",children:"This message however is your responsibility."})})};Theming.parameters={...Theming.parameters,docs:{...Theming.parameters?.docs,source:{originalSource:'{\n  render() {\n    const [theme, setTheme] = useState(equisoftTheme);\n    const [label, setLabel] = useState(\'Default Equisoft Theme\');\n    function setCustomTheme(newSelectedTheme: DropdownListOption): void {\n      setLabel(newSelectedTheme.label);\n      switch (newSelectedTheme.value) {\n        case \'customTheme1\':\n          setTheme(ThemeCustomization1);\n          break;\n        case \'customTheme2\':\n          setTheme(ThemeCustomization2);\n          break;\n        case \'equisoftTheme\':\n          setTheme(equisoftTheme);\n          break;\n        default:\n          setTheme(equisoftTheme);\n      }\n    }\n    return <DesignSystem theme={theme}>\n                <div>\n                    <div style={{\n          display: \'box\',\n          alignItems: \'center\',\n          gap: \'2rem\'\n        }}>\n                        <h3>{label}</h3>\n                        <div style={{\n            width: \'200px\'\n          }}>\n                            <DropdownList onChange={option => setCustomTheme(option)} defaultValue="equisoftTheme" options={[{\n              label: \'Default Equisoft Theme\',\n              value: \'equisoftTheme\'\n            }, {\n              label: \'Custom theme 1\',\n              value: \'customTheme1\'\n            }, {\n              label: \'Custom Theme 2\',\n              value: \'customTheme2\'\n            }]} />\n                        </div>\n                    </div>\n                    <div style={{\n          display: \'table-row\',\n          alignItems: \'center\'\n        }}>\n                        <div style={{\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" />\n                            <Button label="Secondary" buttonType="secondary" />\n                            <Button label="Tertiary" buttonType="tertiary" />\n                            <Button label="Destructive" buttonType="destructive" />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" />\n                        </div>\n                        <div style={{\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" disabled />\n                            <Button label="Secondary" buttonType="secondary" disabled />\n                            <Button label="Tertiary" buttonType="tertiary" disabled />\n                            <Button label="Destructive" buttonType="destructive" disabled />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" disabled />\n                        </div>\n                        <div style={{\n            backgroundColor: \'#012639\',\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" inverted />\n                            <Button label="Secondary" buttonType="secondary" inverted />\n                            <Button label="Tertiary" buttonType="tertiary" inverted />\n                            <Button label="Destructive" buttonType="destructive" inverted />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" inverted />\n                        </div>\n                        <div style={{\n            backgroundColor: \'#012639\',\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" inverted disabled />\n                            <Button label="Secondary" buttonType="secondary" inverted disabled />\n                            <Button label="Tertiary" buttonType="tertiary" inverted disabled />\n                            <Button label="Destructive" buttonType="destructive" inverted disabled />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" inverted disabled />\n                        </div>\n                    </div>\n                </div>\n            </DesignSystem>;\n  }\n}',...Theming.parameters?.docs?.source}}},Internationalization.parameters={...Internationalization.parameters,docs:{...Internationalization.parameters?.docs,source:{originalSource:'{\n  render() {\n    return <DesignSystem language="fr">\n                <SectionalBanner type="info">\n                    This message however is your responsibility.\n                </SectionalBanner>\n            </DesignSystem>;\n  }\n}',...Internationalization.parameters?.docs?.source}}};const __namedExportsOrder=["Theming","Internationalization"]}}]);