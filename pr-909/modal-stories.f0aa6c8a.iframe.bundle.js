"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[6459],{"./stories/modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Normal:()=>Normal,PaddingDisabled:()=>PaddingDisabled,WithFooter:()=>WithFooter,WithHeader:()=>WithHeader,WithoutCloseButton:()=>WithoutCloseButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Disclosure/Modal",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal},Normal=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},PaddingDisabled={parameters:{docs:{description:{story:"The prop `noPadding` removes padding to give you a blank modal to work with."}}},render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",noPadding:!0,isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"A modal without padding"})})]})}},WithoutCloseButton=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",hasCloseButton:!1,isOpen:isModalOpen,onRequestClose:closeModal})]})},WithHeader=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalHeader:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Header content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},WithFooter=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalFooter:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Footer content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})};Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...Normal.parameters?.docs?.source}}},PaddingDisabled.parameters={...PaddingDisabled.parameters,docs:{...PaddingDisabled.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    docs: {\n      description: {\n        story: \'The prop `noPadding` removes padding to give you a blank modal to work with.\'\n      }\n    }\n  },\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" noPadding isOpen={isModalOpen} onRequestClose={closeModal}>\n                    <span id="story-description">A modal without padding</span>\n                </Modal>\n            </>;\n  }\n}',...PaddingDisabled.parameters?.docs?.source}}},WithoutCloseButton.parameters={...WithoutCloseButton.parameters,docs:{...WithoutCloseButton.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" hasCloseButton={false} isOpen={isModalOpen} onRequestClose={closeModal} />\n        </>;\n}',...WithoutCloseButton.parameters?.docs?.source}}},WithHeader.parameters={...WithHeader.parameters,docs:{...WithHeader.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalHeader={<b>Header content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithHeader.parameters?.docs?.source}}},WithFooter.parameters={...WithFooter.parameters,docs:{...WithFooter.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalFooter={<b>Footer content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithFooter.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","PaddingDisabled","WithoutCloseButton","WithHeader","WithFooter"]}}]);