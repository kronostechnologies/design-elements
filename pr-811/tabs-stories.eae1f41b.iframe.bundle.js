"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[3259],{"./stories/tabs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Contained:()=>Contained,Global:()=>Global,Normal:()=>Normal,UnloadTabCallback:()=>UnloadTabCallback,WithForceRenderTabPanels:()=>WithForceRenderTabPanels,WithIcons:()=>WithIcons,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Tabs",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.A},StyledDiv=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.div`
    padding: var(--spacing-2x);
`,Normal=()=>{const tabs=[{title:"Contact",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"First Name",accessorKey:"column1"},{header:"Last Name",accessorKey:"column2"}],data:[{column1:"First Name 1",column2:"First Name 2"},{column1:"Last Name 1",column2:"Last Name 2"}]})})},{title:"Calendar",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(StyledDiv,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Card,{children:"Monday : Doing something meaningful"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Card,{children:"Tuesday : Doing something else"})]})},{title:"Note",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.TextArea,{label:"Notes"})})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs})};Normal.displayName="Normal";const Global=()=>{const tabs=[{title:"First Button",leftIcon:"chevronUp",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"First tab content"})},{title:"Second Button",leftIcon:"chevronLeft",rightIcon:"chevronRight",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Second tab content"})},{title:"Third Button",rightIcon:"chevronDown",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Third tab content"})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{global:!0,tabs})};Global.displayName="Global";const WithIcons=()=>{const tabs=[{title:"First Button",leftIcon:"chevronUp",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"First tab content"})},{title:"Second Button",leftIcon:"chevronLeft",rightIcon:"chevronRight",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Second tab content"})},{title:"Third Button",rightIcon:"chevronDown",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Third tab content"})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs})};WithIcons.displayName="WithIcons";const WithForceRenderTabPanels=()=>{const tabs=[{title:"First Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"First tab content"})},{title:"Second Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Second tab content"})},{title:"Third Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Third tab content"})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs,forceRenderTabPanels:!0})};WithForceRenderTabPanels.displayName="WithForceRenderTabPanels";const Contained=()=>{const tabs=[{title:"First Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"First tab content"})},{title:"Second Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Second tab content"})},{title:"Third Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Third tab content"})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs,contained:!0})};Contained.displayName="Contained";const UnloadTabCallback=()=>{const tabs=[{title:"Tab that cannot change because onBeforeUnload resolves to false",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"First tab content"}),onBeforeUnload:()=>(console.info("cannot change tab because onBeforeUnload promise resolves to false here"),Promise.resolve(!1))},{title:"Second Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Second tab content"}),onBeforeUnload:()=>Promise.resolve(!0)},{title:"Third Button",panelContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledDiv,{children:"Third tab content"}),onBeforeUnload:()=>Promise.resolve(!0)}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tabs,{tabs,contained:!0})};UnloadTabCallback.displayName="UnloadTabCallback",Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => {\n  const contactTableColumns: TableColumn<Data> = [{\n    header: 'First Name',\n    accessorKey: 'column1'\n  }, {\n    header: 'Last Name',\n    accessorKey: 'column2'\n  }];\n  const contactTableData: Data[] = [{\n    column1: 'First Name 1',\n    column2: 'First Name 2'\n  }, {\n    column1: 'Last Name 1',\n    column2: 'Last Name 2'\n  }];\n  const tabs: Tab[] = [{\n    title: 'Contact',\n    panelContent: <StyledDiv>\n                    <Table columns={contactTableColumns} data={contactTableData} />\n                </StyledDiv>\n  }, {\n    title: 'Calendar',\n    panelContent: <StyledDiv>\n                    <Card>Monday : Doing something meaningful</Card>\n                    <Card>Tuesday : Doing something else</Card>\n                </StyledDiv>\n  }, {\n    title: 'Note',\n    panelContent: <StyledDiv>\n                    <TextArea label=\"Notes\" />\n                </StyledDiv>\n  }];\n  return <Tabs tabs={tabs} />;\n}",...Normal.parameters?.docs?.source}}},Global.parameters={...Global.parameters,docs:{...Global.parameters?.docs,source:{originalSource:"() => {\n  const tabs: Tab[] = [{\n    title: 'First Button',\n    leftIcon: 'chevronUp',\n    panelContent: <StyledDiv>First tab content</StyledDiv>\n  }, {\n    title: 'Second Button',\n    leftIcon: 'chevronLeft',\n    rightIcon: 'chevronRight',\n    panelContent: <StyledDiv>Second tab content</StyledDiv>\n  }, {\n    title: 'Third Button',\n    rightIcon: 'chevronDown',\n    panelContent: <StyledDiv>Third tab content</StyledDiv>\n  }];\n  return <Tabs global tabs={tabs} />;\n}",...Global.parameters?.docs?.source}}},WithIcons.parameters={...WithIcons.parameters,docs:{...WithIcons.parameters?.docs,source:{originalSource:"() => {\n  const tabs: Tab[] = [{\n    title: 'First Button',\n    leftIcon: 'chevronUp',\n    panelContent: <StyledDiv>First tab content</StyledDiv>\n  }, {\n    title: 'Second Button',\n    leftIcon: 'chevronLeft',\n    rightIcon: 'chevronRight',\n    panelContent: <StyledDiv>Second tab content</StyledDiv>\n  }, {\n    title: 'Third Button',\n    rightIcon: 'chevronDown',\n    panelContent: <StyledDiv>Third tab content</StyledDiv>\n  }];\n  return <Tabs tabs={tabs} />;\n}",...WithIcons.parameters?.docs?.source}}},WithForceRenderTabPanels.parameters={...WithForceRenderTabPanels.parameters,docs:{...WithForceRenderTabPanels.parameters?.docs,source:{originalSource:"() => {\n  const tabs: Tab[] = [{\n    title: 'First Button',\n    panelContent: <StyledDiv>First tab content</StyledDiv>\n  }, {\n    title: 'Second Button',\n    panelContent: <StyledDiv>Second tab content</StyledDiv>\n  }, {\n    title: 'Third Button',\n    panelContent: <StyledDiv>Third tab content</StyledDiv>\n  }];\n  return <Tabs tabs={tabs} forceRenderTabPanels />;\n}",...WithForceRenderTabPanels.parameters?.docs?.source}}},Contained.parameters={...Contained.parameters,docs:{...Contained.parameters?.docs,source:{originalSource:"() => {\n  const tabs: Tab[] = [{\n    title: 'First Button',\n    panelContent: <StyledDiv>First tab content</StyledDiv>\n  }, {\n    title: 'Second Button',\n    panelContent: <StyledDiv>Second tab content</StyledDiv>\n  }, {\n    title: 'Third Button',\n    panelContent: <StyledDiv>Third tab content</StyledDiv>\n  }];\n  return <Tabs tabs={tabs} contained />;\n}",...Contained.parameters?.docs?.source}}},UnloadTabCallback.parameters={...UnloadTabCallback.parameters,docs:{...UnloadTabCallback.parameters?.docs,source:{originalSource:"() => {\n  const tabs: Tab[] = [{\n    title: 'Tab that cannot change because onBeforeUnload resolves to false',\n    panelContent: <StyledDiv>First tab content</StyledDiv>,\n    onBeforeUnload: () => {\n      console.info('cannot change tab because onBeforeUnload promise resolves to false here');\n      return Promise.resolve(false);\n    }\n  }, {\n    title: 'Second Button',\n    panelContent: <StyledDiv>Second tab content</StyledDiv>,\n    onBeforeUnload: () => Promise.resolve(true)\n  }, {\n    title: 'Third Button',\n    panelContent: <StyledDiv>Third tab content</StyledDiv>,\n    onBeforeUnload: () => Promise.resolve(true)\n  }];\n  return <Tabs tabs={tabs} contained />;\n}",...UnloadTabCallback.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Global","WithIcons","WithForceRenderTabPanels","Contained","UnloadTabCallback"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);
//# sourceMappingURL=tabs-stories.eae1f41b.iframe.bundle.js.map