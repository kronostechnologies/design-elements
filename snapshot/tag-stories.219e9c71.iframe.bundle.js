"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[8151],{"./stories/tag.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Clickable:()=>Clickable,Deletable:()=>Deletable,Medium:()=>Medium,Normal:()=>Normal,Small:()=>Small,WithIcons:()=>WithIcons,WithRef:()=>WithRef,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Notification/Tag",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag},Normal=()=>{const tags=[{label:"Tag 1",id:"1"},{label:"Tag 2",id:"2"},{label:"Tag 3",id:"3"}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:tags.map((tag=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{value:tag,size:"small"},tag.id)))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br",{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:tags.map((tag=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{value:tag,size:"medium"},tag.id)))})]})},Small=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{value:{label:"Tag"},size:"small"});Small.displayName="Small";const Medium=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{value:{label:"Tag"},size:"medium"});Medium.displayName="Medium";const WithIcons=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:[{value:{label:"Tag 1",id:"tag1"},iconName:"calendar"},{value:{label:"Tag 2",id:"tag2"},iconName:"home"},{value:{label:"Tag 3",id:"tag3"},iconName:"info"}].map((({iconName,value})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{iconName,value},value.id)))});WithIcons.displayName="WithIcons";const Deletable=()=>{const[options,setOptions]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{label:"Tag 1",id:"tag1"},{label:"Tag 2",id:"tag2"},{label:"Tag 3",id:"tag3"}]);function handleDelete(tag){const filteredOptionsArray=[...options].filter((({id})=>id!==tag.id));setOptions(filteredOptionsArray)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:options.map((tag=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{value:tag,onDelete:handleDelete},tag.id)))})};Deletable.displayName="Deletable";const Clickable=()=>{function handleClick(tag){console.info(`Clicked on ${tag.label}`)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{iconName:"copy",size:"small",onClick:handleClick,value:{label:"Tag 1"}},"small"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{iconName:"mail",size:"medium",onClick:handleClick,value:{label:"Tag 2"}},"medium")]})},WithRef=()=>{const ref=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tag,{ref,iconName:"copy",size:"small",value:{label:"Tag 1"}},"small")};WithRef.displayName="WithRef",WithRef.parameters=_utils_parameters__WEBPACK_IMPORTED_MODULE_2__.O,Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"(): ReactElement => {\n  const tags: TagValue[] = [{\n    label: 'Tag 1',\n    id: '1'\n  }, {\n    label: 'Tag 2',\n    id: '2'\n  }, {\n    label: 'Tag 3',\n    id: '3'\n  }];\n  return <>\n            <div>\n                {tags.map(tag => <Tag key={tag.id} value={tag} size=\"small\" />)}\n            </div>\n            <br />\n            <div>\n                {tags.map(tag => <Tag key={tag.id} value={tag} size=\"medium\" />)}\n            </div>\n        </>;\n}",...Normal.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"(): ReactElement => <Tag value={{\n  label: 'Tag'\n}} size=\"small\" />",...Small.parameters?.docs?.source}}},Medium.parameters={...Medium.parameters,docs:{...Medium.parameters?.docs,source:{originalSource:"(): ReactElement => <Tag value={{\n  label: 'Tag'\n}} size=\"medium\" />",...Medium.parameters?.docs?.source}}},WithIcons.parameters={...WithIcons.parameters,docs:{...WithIcons.parameters?.docs,source:{originalSource:"(): ReactElement => {\n  const options: TagProps[] = [{\n    value: {\n      label: 'Tag 1',\n      id: 'tag1'\n    },\n    iconName: 'calendar'\n  }, {\n    value: {\n      label: 'Tag 2',\n      id: 'tag2'\n    },\n    iconName: 'home'\n  }, {\n    value: {\n      label: 'Tag 3',\n      id: 'tag3'\n    },\n    iconName: 'info'\n  }];\n  return <div>\n            {options.map(({\n      iconName,\n      value\n    }) => <Tag key={value.id} iconName={iconName} value={value} />)}\n        </div>;\n}",...WithIcons.parameters?.docs?.source}}},Deletable.parameters={...Deletable.parameters,docs:{...Deletable.parameters?.docs,source:{originalSource:"(): ReactElement => {\n  const initialOptions: TagValue[] = [{\n    label: 'Tag 1',\n    id: 'tag1'\n  }, {\n    label: 'Tag 2',\n    id: 'tag2'\n  }, {\n    label: 'Tag 3',\n    id: 'tag3'\n  }];\n  const [options, setOptions] = useState(initialOptions);\n  function handleDelete(tag: TagValue): void {\n    const filteredOptionsArray = [...options].filter(({\n      id\n    }) => id !== tag.id);\n    setOptions(filteredOptionsArray);\n  }\n  return <div>\n            {options.map(tag => <Tag key={tag.id} value={tag} onDelete={handleDelete} />)}\n        </div>;\n}",...Deletable.parameters?.docs?.source}}},Clickable.parameters={...Clickable.parameters,docs:{...Clickable.parameters?.docs,source:{originalSource:'() => {\n  function handleClick(tag: TagValue): void {\n    console.info(`Clicked on ${tag.label}`);\n  }\n  return <>\n            <Tag key="small" iconName="copy" size="small" onClick={handleClick} value={{\n      label: \'Tag 1\'\n    }} />\n            <Tag key="medium" iconName="mail" size="medium" onClick={handleClick} value={{\n      label: \'Tag 2\'\n    }} />\n        </>;\n}',...Clickable.parameters?.docs?.source}}},WithRef.parameters={...WithRef.parameters,docs:{...WithRef.parameters?.docs,source:{originalSource:'() => {\n  const ref = useRef(null);\n  return <Tag ref={ref} key="small" iconName="copy" size="small" value={{\n    label: \'Tag 1\'\n  }} />;\n}',...WithRef.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Small","Medium","WithIcons","Deletable","Clickable","WithRef"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);