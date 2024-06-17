"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[6320],{"./stories/side-drawer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LeftOrigin:()=>LeftOrigin,Normal:()=>Normal,Scrollable:()=>Scrollable,VariableWidth:()=>VariableWidth,WithNestedDrawer:()=>WithNestedDrawer,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const Box=styled_components__WEBPACK_IMPORTED_MODULE_4__.default.div`
    background-color: #094c6c;
    border-radius: 8px;
    height: 20vh;
    margin-bottom: 16px;

    &:nth-child(2n) {
        background-color: #012639;
    }
`,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Structure/Side Drawer",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.O},Normal=()=>{const[isDrawerOpen,setDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isDrawerOpen,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Drawer Content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Click to open side-drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!0)})]})},WithNestedDrawer=()=>{const[isDrawerOpen,setDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),[isNestedDrawerOpen,setNestedDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isDrawerOpen,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Drawer Content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isNestedDrawerOpen,nested:!0,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Nested Drawer Content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setNestedDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open nested drawer",buttonType:"primary",onClick:()=>setNestedDrawerOpen(!0)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Click to open side-drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!0)})]})},Scrollable=()=>{const[isDrawerOpen,setDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isDrawerOpen,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Drawer with scrollable content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:[...Array(6).keys()].map((el=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Box,{},el)))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Click to open side-drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!0)})]})},LeftOrigin=()=>{const[isDrawerOpen,setDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isDrawerOpen,drawerOrigin:"left",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Drawer Content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Click to open side-drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!0)})]})},VariableWidth=()=>{const[isDrawerOpen,setDrawerOpen]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.SideDrawer,{open:isDrawerOpen,width:"50%",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Drawer content"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Close drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!1)})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Click to open side-drawer",buttonType:"primary",onClick:()=>setDrawerOpen(!0)})]})};Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => {\n  const [isDrawerOpen, setDrawerOpen] = useState(false);\n  return <>\n            <SideDrawer open={isDrawerOpen}>\n                <h3>Drawer Content</h3>\n                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />\n            </SideDrawer>\n            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />\n        </>;\n}',...Normal.parameters?.docs?.source}}},WithNestedDrawer.parameters={...WithNestedDrawer.parameters,docs:{...WithNestedDrawer.parameters?.docs,source:{originalSource:'() => {\n  const [isDrawerOpen, setDrawerOpen] = useState(false);\n  const [isNestedDrawerOpen, setNestedDrawerOpen] = useState(false);\n  return <>\n            <SideDrawer open={isDrawerOpen}>\n                <h3>Drawer Content</h3>\n                <SideDrawer open={isNestedDrawerOpen} nested>\n                    <h3>Nested Drawer Content</h3>\n                    <Button label="Close drawer" buttonType="primary" onClick={() => setNestedDrawerOpen(false)} />\n                </SideDrawer>\n                <Button label="Open nested drawer" buttonType="primary" onClick={() => setNestedDrawerOpen(true)} />\n                <br />\n                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />\n            </SideDrawer>\n            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />\n        </>;\n}',...WithNestedDrawer.parameters?.docs?.source}}},Scrollable.parameters={...Scrollable.parameters,docs:{...Scrollable.parameters?.docs,source:{originalSource:'() => {\n  const [isDrawerOpen, setDrawerOpen] = useState(false);\n  return <>\n            <SideDrawer open={isDrawerOpen}>\n                <h3>Drawer with scrollable content</h3>\n                <div>\n                    {[...Array(6).keys()].map(el => <Box key={el} />)}\n                </div>\n                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />\n            </SideDrawer>\n            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />\n        </>;\n}',...Scrollable.parameters?.docs?.source}}},LeftOrigin.parameters={...LeftOrigin.parameters,docs:{...LeftOrigin.parameters?.docs,source:{originalSource:'() => {\n  const [isDrawerOpen, setDrawerOpen] = useState(false);\n  return <>\n            <SideDrawer open={isDrawerOpen} drawerOrigin="left">\n                <h3>Drawer Content</h3>\n                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />\n            </SideDrawer>\n            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />\n        </>;\n}',...LeftOrigin.parameters?.docs?.source}}},VariableWidth.parameters={...VariableWidth.parameters,docs:{...VariableWidth.parameters?.docs,source:{originalSource:'() => {\n  const [isDrawerOpen, setDrawerOpen] = useState(false);\n  return <>\n            <SideDrawer open={isDrawerOpen} width="50%">\n                <h3>Drawer content</h3>\n                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />\n            </SideDrawer>\n            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />\n        </>;\n}',...VariableWidth.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithNestedDrawer","Scrollable","LeftOrigin","VariableWidth"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);
//# sourceMappingURL=side-drawer-stories.9062caf8.iframe.bundle.js.map