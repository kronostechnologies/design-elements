"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[3045,6459],{"../../.yarn/__virtual__/@mdx-js-react-virtual-d2fca8aac5/0/cache/@mdx-js-react-npm-2.3.0-d5582a450b-f45fe77955.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./stories/modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Normal:()=>Normal,PaddingDisabled:()=>PaddingDisabled,WithFooter:()=>WithFooter,WithHeader:()=>WithHeader,WithoutCloseButton:()=>WithoutCloseButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Disclosure/Modal",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal},Normal=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},PaddingDisabled={parameters:{docs:{description:{story:"The prop `noPadding` removes padding to give you a blank modal to work with."}}},render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",noPadding:!0,isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"A modal without padding"})})]})}},WithoutCloseButton=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",hasCloseButton:!1,isOpen:isModalOpen,onRequestClose:closeModal})]})},WithHeader=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalHeader:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Header content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})},WithFooter=()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Modal,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,modalFooter:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("b",{children:"Footer content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})})]})};Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...Normal.parameters?.docs?.source}}},PaddingDisabled.parameters={...PaddingDisabled.parameters,docs:{...PaddingDisabled.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    docs: {\n      description: {\n        story: \'The prop `noPadding` removes padding to give you a blank modal to work with.\'\n      }\n    }\n  },\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" noPadding isOpen={isModalOpen} onRequestClose={closeModal}>\n                    <span id="story-description">A modal without padding</span>\n                </Modal>\n            </>;\n  }\n}',...PaddingDisabled.parameters?.docs?.source}}},WithoutCloseButton.parameters={...WithoutCloseButton.parameters,docs:{...WithoutCloseButton.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" hasCloseButton={false} isOpen={isModalOpen} onRequestClose={closeModal} />\n        </>;\n}',...WithoutCloseButton.parameters?.docs?.source}}},WithHeader.parameters={...WithHeader.parameters,docs:{...WithHeader.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalHeader={<b>Header content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithHeader.parameters?.docs?.source}}},WithFooter.parameters={...WithFooter.parameters,docs:{...WithFooter.parameters?.docs,source:{originalSource:'() => {\n  const {\n    isModalOpen,\n    closeModal,\n    openModal\n  } = useModal();\n  return <>\n            <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n            <Modal appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} modalFooter={<b>Footer content</b>}>\n                <span id="story-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>\n            </Modal>\n        </>;\n}',...WithFooter.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","PaddingDisabled","WithoutCloseButton","WithHeader","WithFooter"]},"./stories/modal.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js"),_storybook_addon_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/@mdx-js-react-virtual-d2fca8aac5/0/cache/@mdx-js-react-npm-2.3.0-d5582a450b-f45fe77955.zip/node_modules/@mdx-js/react/lib/index.js"),_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../.yarn/__virtual__/@storybook-blocks-virtual-c047d8fe53/0/cache/@storybook-blocks-npm-7.0.8-d50984aa2b-7b4a18b89b.zip/node_modules/@storybook/blocks/dist/index.mjs"),_modal_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/modal.stories.tsx");const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{})})):_createMdxContent();function _createMdxContent(){const _components=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre"},(0,_storybook_addon_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.h_,{of:_modal_stories__WEBPACK_IMPORTED_MODULE_3__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"modal",children:"Modal"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," component allows you to easily set modals up in your app."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"import",children:"Import"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-js",children:"    import { Modal, useModal } from '@equisoft/design-elements-react'\n"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["It is important for users of screenreaders that other page content be hidden (via the aria-hidden attribute) while the modal is open. To allow ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Modal"})," to do this, you should set ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"appElement"})," prop to a query selector identifying the root of your app. For example, if your app content is located inside an element with the ID ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"root"}),", you should set the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"appElement"})," prop like this:"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-jsx",children:'<Modal\n    appElement="#storybook-root"\n    isOpen={isModalOpen}\n    onRequestClose={closeModal}\n>\n    Some Content\n</Modal>\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"props",children:"Props"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Ed,{of:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_2__.Modal}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.fQ,{of:_modal_stories__WEBPACK_IMPORTED_MODULE_3__})]})}}}}]);