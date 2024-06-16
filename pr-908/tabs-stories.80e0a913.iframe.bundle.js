"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[3259],{"./stories/tabs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AddAndDeleteTabs:()=>AddAndDeleteTabs,Default:()=>Default,DefaultSelectedTab:()=>DefaultSelectedTab,Global:()=>Global,Scrollable:()=>Scrollable,UnloadTabCallback:()=>UnloadTabCallback,WithForceRenderTabPanels:()=>WithForceRenderTabPanels,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const StyledDiv=styled_components__WEBPACK_IMPORTED_MODULE_4__.default.div`
    padding: var(--spacing-2x);
`,tabs=[{id:"tab1",title:"Contact",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"First Name",accessorKey:"column1"},{header:"Last Name",accessorKey:"column2"}],data:[{column1:"First Name 1",column2:"First Name 2"},{column1:"Last Name 1",column2:"Last Name 2"}]})})},{id:"tab2",title:"Calendar",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(StyledDiv,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Card,{children:"Monday : Doing something meaningful"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Card,{children:"Tuesday : Doing something else"})]})},{id:"tab3",title:"Note",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Notes"})})}],TabsMeta={title:"Components/Tabs",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.A,argTypes:{tabs:{control:{disable:!0}}},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{...args,tabs})},__WEBPACK_DEFAULT_EXPORT__=TabsMeta,Default={...TabsMeta},Global={...TabsMeta,args:{global:!0}};let addTabCounter=3;const AddAndDeleteTabs={...TabsMeta,render:()=>{const[currentTabs,setCurrentTabs]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tabs);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs:currentTabs,onRemove:function handleRemove(tabId){setCurrentTabs((prevTabs=>prevTabs.filter((tab=>tab.id!==tabId))))},onAddTab:()=>{addTabCounter+=1,setCurrentTabs([...currentTabs,{id:`tab${addTabCounter}`,title:"New Tab",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"New tab content"})}])}})}},Scrollable={...TabsMeta,render:()=>{const customTabs=[...Array(15).keys()].map((i=>({id:`tab${i+1}`,title:`Tab ${i+1}`,panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(StyledDiv,{children:["Content",i+1]})})));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{style:{maxWidth:"600px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs:customTabs}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs:customTabs,global:!0})]})}},WithForceRenderTabPanels={...TabsMeta,args:{forceRenderTabPanels:!0}},UnloadTabCallback={...TabsMeta,render:()=>{const customTabs=[{id:"tab1",title:"Tab that cannot change because onBeforeUnload resolves to false",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"First tab content"}),onBeforeUnload:()=>(console.info("cannot change tab because onBeforeUnload promise resolves to false here"),Promise.resolve(!1))},{id:"tab2",title:"Second Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"Second tab content"}),onBeforeUnload:()=>Promise.resolve(!0)},{id:"tab2",title:"Third Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"Third tab content"}),onBeforeUnload:()=>Promise.resolve(!0)}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs:customTabs})}},DefaultSelectedTab={...TabsMeta,render:()=>{const customTabs=[{id:"tab1",title:"First Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"First tab content"})},{id:"tab2",title:"Second Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"Second tab content"})},{id:"tab3",title:"Third Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StyledDiv,{children:"Third tab content"})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs:customTabs,defaultSelectedId:"tab2"})}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta\n}",...Default.parameters?.docs?.source}}},Global.parameters={...Global.parameters,docs:{...Global.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  args: {\n    global: true\n  }\n}",...Global.parameters?.docs?.source}}},AddAndDeleteTabs.parameters={...AddAndDeleteTabs.parameters,docs:{...AddAndDeleteTabs.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  render: () => {\n    const [currentTabs, setCurrentTabs] = useState<Tab[]>(tabs);\n    function handleRemove(tabId: string): void {\n      setCurrentTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId));\n    }\n    return <Tabs tabs={currentTabs} onRemove={handleRemove} onAddTab={() => {\n      addTabCounter += 1;\n      setCurrentTabs([...currentTabs, {\n        id: `tab${addTabCounter}`,\n        title: 'New Tab',\n        panelContent: <StyledDiv>New tab content</StyledDiv>\n      }]);\n    }} />;\n  }\n}",...AddAndDeleteTabs.parameters?.docs?.source}}},Scrollable.parameters={...Scrollable.parameters,docs:{...Scrollable.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  render: () => {\n    const customTabs: Tab[] = [...Array(15).keys()].map(i => ({\n      id: `tab${i + 1}`,\n      title: `Tab ${i + 1}`,\n      panelContent: <StyledDiv>\n                    Content\n                    {i + 1}\n                </StyledDiv>\n    }));\n    return <div style={{\n      maxWidth: '600px'\n    }}>\n                <Tabs tabs={customTabs} />\n                <br />\n                <Tabs tabs={customTabs} global />\n            </div>;\n  }\n}",...Scrollable.parameters?.docs?.source}}},WithForceRenderTabPanels.parameters={...WithForceRenderTabPanels.parameters,docs:{...WithForceRenderTabPanels.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  args: {\n    forceRenderTabPanels: true\n  }\n}",...WithForceRenderTabPanels.parameters?.docs?.source}}},UnloadTabCallback.parameters={...UnloadTabCallback.parameters,docs:{...UnloadTabCallback.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  render: () => {\n    const customTabs: Tab[] = [{\n      id: 'tab1',\n      title: 'Tab that cannot change because onBeforeUnload resolves to false',\n      panelContent: <StyledDiv>First tab content</StyledDiv>,\n      onBeforeUnload: () => {\n        console.info('cannot change tab because onBeforeUnload promise resolves to false here');\n        return Promise.resolve(false);\n      }\n    }, {\n      id: 'tab2',\n      title: 'Second Button',\n      panelContent: <StyledDiv>Second tab content</StyledDiv>,\n      onBeforeUnload: () => Promise.resolve(true)\n    }, {\n      id: 'tab2',\n      title: 'Third Button',\n      panelContent: <StyledDiv>Third tab content</StyledDiv>,\n      onBeforeUnload: () => Promise.resolve(true)\n    }];\n    return <Tabs tabs={customTabs} />;\n  }\n}",...UnloadTabCallback.parameters?.docs?.source}}},DefaultSelectedTab.parameters={...DefaultSelectedTab.parameters,docs:{...DefaultSelectedTab.parameters?.docs,source:{originalSource:"{\n  ...TabsMeta,\n  render: () => {\n    const customTabs: Tab[] = [{\n      id: 'tab1',\n      title: 'First Button',\n      panelContent: <StyledDiv>First tab content</StyledDiv>\n    }, {\n      id: 'tab2',\n      title: 'Second Button',\n      panelContent: <StyledDiv>Second tab content</StyledDiv>\n    }, {\n      id: 'tab3',\n      title: 'Third Button',\n      panelContent: <StyledDiv>Third tab content</StyledDiv>\n    }];\n    return <Tabs tabs={customTabs} defaultSelectedId='tab2' />;\n  }\n}",...DefaultSelectedTab.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Global","AddAndDeleteTabs","Scrollable","WithForceRenderTabPanels","UnloadTabCallback","DefaultSelectedTab"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);
//# sourceMappingURL=tabs-stories.80e0a913.iframe.bundle.js.map