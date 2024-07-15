"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[7712,7762],{"../../.yarn/__virtual__/@mdx-js-react-virtual-99a32bd300/4/.yarn/berry/cache/@mdx-js-react-npm-3.0.1-1ce14f6273-10c0.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/modal.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_39e9ef1135_4_yarn_berry_cache_storybook_addon_docs_npm_8_2_3_24385fe2b0_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/@mdx-js-react-virtual-99a32bd300/4/.yarn/berry/cache/@mdx-js-react-npm-3.0.1-1ce14f6273-10c0.zip/node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../.yarn/__virtual__/@storybook-blocks-virtual-2fe335419f/4/.yarn/berry/cache/@storybook-blocks-npm-8.2.3-626e37d92e-10c0.zip/node_modules/@storybook/blocks/dist/index.mjs"),_modal_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/modal.stories.tsx");function _createMdxContent(props){const _components={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_39e9ef1135_4_yarn_berry_cache_storybook_addon_docs_npm_8_2_3_24385fe2b0_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{of:_modal_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"modal",children:"Modal"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," component allows you to easily set modals up in your app."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"import",children:"Import"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-js",children:"    import { Modal, useModal } from '@equisoft/design-elements-react'\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["It is important for users of screenreaders that other page content be hidden (via the aria-hidden attribute) while the modal is open. To allow ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," to do this, you should set ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"appElement"})," prop to a query selector identifying the root of your app. For example, if your app content is located inside an element with the ID ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"root"}),", you should set the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"appElement"})," prop like this:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-jsx",children:'<Modal\n    appElement="#storybook-root"\n    isOpen={isModalOpen}\n    onRequestClose={closeModal}\n>\n    Some Content\n</Modal>\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.Modal}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.om,{of:_modal_stories__WEBPACK_IMPORTED_MODULE_3__})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_39e9ef1135_4_yarn_berry_cache_storybook_addon_docs_npm_8_2_3_24385fe2b0_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_4__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./stories/modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Normal:()=>Normal,PaddingDisabled:()=>PaddingDisabled,WithFooter:()=>WithFooter,WithHeader:()=>WithHeader,WithoutCloseButton:()=>WithoutCloseButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Modal",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal},Normal=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},PaddingDisabled={parameters:{docs:{description:{story:"The prop `noPadding` removes padding to give you a blank modal to work with."}}},render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",noPadding:!0,isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"A modal without padding"})})]})}},WithoutCloseButton=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",hasCloseButton:!1,isOpen:isModalOpen,onRequestClose:closeModal})]})},WithHeader=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalHeader:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Header content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},WithFooter=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalFooter:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Footer content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},__namedExportsOrder=["Normal","PaddingDisabled","WithoutCloseButton","WithHeader","WithFooter"];Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...Normal.parameters?.docs?.source}}},PaddingDisabled.parameters={...PaddingDisabled.parameters,docs:{...PaddingDisabled.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    docs: {\n      description: {\n        story: \'The prop `noPadding` removes padding to give you a blank modal to work with.\'\n      }\n    }\n  },\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" noPadding isOpen={isModalOpen} onRequestClose={closeModal}>\n                    <span id="story-description">A modal without padding</span>\n                </Modal>\n            </>;\n  }\n}',...PaddingDisabled.parameters?.docs?.source}}},WithoutCloseButton.parameters={...WithoutCloseButton.parameters,docs:{...WithoutCloseButton.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" hasCloseButton={false} isOpen={isModalOpen} onRequestClose={closeModal} />\n        </>;\n}',...WithoutCloseButton.parameters?.docs?.source}}},WithHeader.parameters={...WithHeader.parameters,docs:{...WithHeader.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalHeader={<b>Header content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithHeader.parameters?.docs?.source}}},WithFooter.parameters={...WithFooter.parameters,docs:{...WithFooter.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalFooter={<b>Footer content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithFooter.parameters?.docs?.source}}}}}]);