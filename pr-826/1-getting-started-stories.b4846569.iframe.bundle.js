"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[299],{"./stories/1-getting-started.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Internationalization:()=>Internationalization,Theming:()=>Theming,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Getting Started",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem},ThemeCustomization1={ref:{"color-brand-05":"#E8EAED","color-brand-10":"#D0D6DC","color-brand-20":"#A1ADB9","color-brand-30":"#728395","color-brand-40":"#435A72","color-brand-50":"#14314F","color-brand-60":"#10273F","color-brand-70":"#0C1D2F","color-brand-80":"#081420","color-brand-90":"#040A10","color-accent-05":"#FAEDEA","color-accent-10":"#F5DAD4","color-accent-20":"#EBB5A9","color-accent-30":"#E2917E","color-accent-40":"#D86C53","color-accent-50":"#CE4728","color-accent-60":"#A53920","color-accent-70":"#7C2B18","color-accent-80":"#521C10","color-accent-90":"#290E08"}},ThemeCustomization2={ref:{"color-brand-05":"#e9e0f9","color-brand-20":"#ad84ea","color-brand-50":"#710096","color-brand-70":"#36005a","color-brand-80":"#230139","color-accent-20":"#f9f5b2","color-accent-50":"#efbd3e","color-accent-70":"#d4a714","color-white":"#FFFFFF","color-black":"#000000","color-neutral-02":"#FAFAFA","color-neutral-05":"#F1F2F2","color-neutral-15":"#DBDEE1","color-neutral-30":"#B7BBC2","color-neutral-50":"#878F9A","color-neutral-65":"#60666E","color-neutral-90":"#1B1C1E","color-alert-02":"#fdfcf6","color-alert-05":"#faf6e9","color-alert-20":"#f9e399","color-alert-50":"#cd9d23","color-alert-70":"#7b6315","color-informative-02":"#F9F7FB","color-informative-05":"#E0F0F9","color-informative-20":"#84C6EA","color-informative-50":"#006296","color-informative-70":"#003A5A","color-success-02":"#F6FCF8","color-success-05":"#E1F7EA","color-success-20":"#8ADDA9","color-success-50":"#008533","color-success-70":"#004F1E","color-warning-02":"#FFFBF5","color-warning-05":"#FFF7E5","color-warning-20":"#FFDD99","color-warning-50":"#F5A200","color-warning-70":"#9E6900","color-warning-80":"#664400","color-discovery-02":"#F9F7FB","color-discovery-05":"#EFEAF6","color-discovery-20":"#CFC1E3","color-discovery-50":"#602FA0","color-discovery-70":"#3A1C60"}},Theming={render(){const[theme,setTheme]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.equisoftTheme),[label,setLabel]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Default Equisoft Theme");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{theme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{display:"box",alignItems:"center",gap:"2rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3",{children:label}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{width:"200px"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DropdownList,{onChange:option=>function setCustomTheme(newSelectedTheme){switch(setLabel(newSelectedTheme.label),newSelectedTheme.value){case"customTheme1":setTheme(ThemeCustomization1);break;case"customTheme2":setTheme(ThemeCustomization2);break;default:setTheme(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.equisoftTheme)}}(option),defaultValue:"equisoftTheme",options:[{label:"Default Equisoft Theme",value:"equisoftTheme"},{label:"Custom theme 1",value:"customTheme1"},{label:"Custom Theme 2",value:"customTheme2"}]})})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{display:"table-row",alignItems:"center"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Primary",buttonType:"destructive-primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Primary",buttonType:"destructive-primary",disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",disabled:!0})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{backgroundColor:"#012639",padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Primary",buttonType:"destructive-primary",inverted:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",inverted:!0})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{backgroundColor:"#012639",padding:"1rem"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Primary",buttonType:"primary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Secondary",buttonType:"secondary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Tertiary",buttonType:"tertiary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Primary",buttonType:"destructive-primary",inverted:!0,disabled:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Destructive Secondary",buttonType:"destructive-secondary",inverted:!0,disabled:!0})]})]})]})})}},Internationalization={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.DesignSystem,{language:"fr",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SectionalBanner,{type:"info",children:"This message however is your responsibility."})})};Theming.parameters={...Theming.parameters,docs:{...Theming.parameters?.docs,source:{originalSource:'{\n  render() {\n    const [theme, setTheme] = useState(equisoftTheme);\n    const [label, setLabel] = useState(\'Default Equisoft Theme\');\n    function setCustomTheme(newSelectedTheme: DropdownListOption): void {\n      setLabel(newSelectedTheme.label);\n      switch (newSelectedTheme.value) {\n        case \'customTheme1\':\n          setTheme(ThemeCustomization1);\n          break;\n        case \'customTheme2\':\n          setTheme(ThemeCustomization2);\n          break;\n        case \'equisoftTheme\':\n          setTheme(equisoftTheme);\n          break;\n        default:\n          setTheme(equisoftTheme);\n      }\n    }\n    return <DesignSystem theme={theme}>\n                <div>\n                    <div style={{\n          display: \'box\',\n          alignItems: \'center\',\n          gap: \'2rem\'\n        }}>\n                        <h3>{label}</h3>\n                        <div style={{\n            width: \'200px\'\n          }}>\n                            <DropdownList onChange={option => setCustomTheme(option)} defaultValue="equisoftTheme" options={[{\n              label: \'Default Equisoft Theme\',\n              value: \'equisoftTheme\'\n            }, {\n              label: \'Custom theme 1\',\n              value: \'customTheme1\'\n            }, {\n              label: \'Custom Theme 2\',\n              value: \'customTheme2\'\n            }]} />\n                        </div>\n                    </div>\n                    <div style={{\n          display: \'table-row\',\n          alignItems: \'center\'\n        }}>\n                        <div style={{\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" />\n                            <Button label="Secondary" buttonType="secondary" />\n                            <Button label="Tertiary" buttonType="tertiary" />\n                            <Button label="Destructive Primary" buttonType="destructive-primary" />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" />\n                        </div>\n                        <div style={{\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" disabled />\n                            <Button label="Secondary" buttonType="secondary" disabled />\n                            <Button label="Tertiary" buttonType="tertiary" disabled />\n                            <Button label="Destructive Primary" buttonType="destructive-primary" disabled />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" disabled />\n                        </div>\n                        <div style={{\n            backgroundColor: \'#012639\',\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" inverted />\n                            <Button label="Secondary" buttonType="secondary" inverted />\n                            <Button label="Tertiary" buttonType="tertiary" inverted />\n                            <Button label="Destructive Primary" buttonType="destructive-primary" inverted />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" inverted />\n                        </div>\n                        <div style={{\n            backgroundColor: \'#012639\',\n            padding: \'1rem\'\n          }}>\n                            <Button label="Primary" buttonType="primary" inverted disabled />\n                            <Button label="Secondary" buttonType="secondary" inverted disabled />\n                            <Button label="Tertiary" buttonType="tertiary" inverted disabled />\n                            <Button label="Destructive Primary" buttonType="destructive-primary" inverted disabled />\n                            <Button label="Destructive Secondary" buttonType="destructive-secondary" inverted disabled />\n                        </div>\n                    </div>\n                </div>\n            </DesignSystem>;\n  }\n}',...Theming.parameters?.docs?.source}}},Internationalization.parameters={...Internationalization.parameters,docs:{...Internationalization.parameters?.docs,source:{originalSource:'{\n  render() {\n    return <DesignSystem language="fr">\n                <SectionalBanner type="info">\n                    This message however is your responsibility.\n                </SectionalBanner>\n            </DesignSystem>;\n  }\n}',...Internationalization.parameters?.docs?.source}}};const __namedExportsOrder=["Theming","Internationalization"]}}]);