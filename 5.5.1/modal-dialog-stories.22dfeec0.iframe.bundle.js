"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[2442],{"./stories/modal-dialog.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AlertDialog:()=>AlertDialog,CancelCallback:()=>CancelCallback,ConfirmCallback:()=>ConfirmCallback,CustomButtonLabels:()=>CustomButtonLabels,CustomFooterContent:()=>CustomFooterContent,InformationDialog:()=>InformationDialog,NoTitles:()=>NoTitles,Normal:()=>Normal,Scrollable:()=>Scrollable,WithTitleIcon:()=>WithTitleIcon,WithinShadowDOM:()=>WithinShadowDOM,WithoutCloseButton:()=>WithoutCloseButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/0/cache/styled-components-npm-5.3.11-d45616b9af-10edd4dae3.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils_shadow_dom_decorator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/utils/shadow-dom-decorator.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Disclosure/Modal Dialog",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog},Normal={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},Paragraph=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus molestie dignissim. Praesent nec vehicula erat. Duis sollicitudin maximus tristique. Donec eu erat congue, eleifend felis in, suscipit nibh. Nunc luctus orci vel nunc sodales, iaculis ultricies libero posuere. Suspendisse vel turpis lacus. Cras accumsan leo eu sem hendrerit, et rutrum nisl vehicula. Vivamus nec sapien ut nibh convallis ullamcorper. Nulla fringilla non ante sed posuere. Integer tincidunt nisi sed augue eleifend dignissim. Donec nec velit tellus. Nam nec lectus a ligula finibus tempus varius a felis. Ut lorem turpis, ultrices in vestibulum at, elementum et nunc. Cras rutrum ultricies nisi a congue. Ut et aliquam mi."});Paragraph.displayName="Paragraph";const Scrollable={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{id:"story-description",children:[...Array(10).keys()].map(((_,i)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Paragraph,{},i)))})})]})}},CustomButtonLabels={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,confirmButton:{label:"Custom Confirm"},cancelButton:{label:"Custom Cancel"},title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},WithTitleIcon={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,title:"With title icon",titleIcon:"warningFilled",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},WithoutCloseButton={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",hasCloseButton:!1,isOpen:isModalOpen,onRequestClose:closeModal,title:"Without close button",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},ConfirmCallback={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,confirmButton:{onConfirm:function handleConfirm(){console.info("confirmed"),closeModal()}},onRequestClose:closeModal,title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},CancelCallback={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,cancelButton:{onCancel:function handleCancel(){console.info("canceled"),closeModal()}},onRequestClose:closeModal,title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},NoTitles={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaLabel:"Modal label",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},CustomFooterContent={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,title:"Heading 5",subtitle:"Subtitle 1",footerContent:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("b",{children:"Custom Content"}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]})}},AbsoluteDiv=styled_components__WEBPACK_IMPORTED_MODULE_4__.default.div`
    left: -9999px;
    position: absolute;
    top: -9999px;
`,WithinShadowDOM={decorators:[_utils_shadow_dom_decorator__WEBPACK_IMPORTED_MODULE_2__.R],render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)(),[parentElement,setParentElement]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(),ref=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(setParentElement,[setParentElement]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(AbsoluteDiv,{ref}),parentElement&&[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,parentSelector:()=>parentElement,title:"Heading 5",subtitle:"Subtitle 1",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tellus nec auctor gravida."})})]]})}},InformationDialog={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"primary",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",isOpen:isModalOpen,onRequestClose:closeModal,title:"Information Modal",dialogType:"information",confirmButton:{label:"Got it"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"This modal has only one button. It is used to inform the user of something."})})]})}},AlertDialog={render:()=>{const{isModalOpen,closeModal,openModal}=(0,_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.useModal)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Button,{label:"Open Modal",buttonType:"destructive",onClick:openModal}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ModalDialog,{appElement:"#storybook-root",ariaDescribedby:"story-description",confirmButton:{label:"Delete"},isOpen:isModalOpen,onRequestClose:closeModal,title:"Alert Modal",dialogType:"alert",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{style:{margin:0},id:"story-description",children:"This modal has a destructive button. It is used to alert the user of something."})})]})}};Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} title="Heading 5" subtitle="Subtitle 1">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n                        Vivamus fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...Normal.parameters?.docs?.source}}},Scrollable.parameters={...Scrollable.parameters,docs:{...Scrollable.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} title="Heading 5" subtitle="Subtitle 1">\n                    <div id="story-description">\n                        {/* eslint-disable-next-line react/no-array-index-key */}\n                        {[...Array(10).keys()].map((_, i) => <Paragraph key={i} />)}\n                    </div>\n                </ModalDialog>\n            </>;\n  }\n}',...Scrollable.parameters?.docs?.source}}},CustomButtonLabels.parameters={...CustomButtonLabels.parameters,docs:{...CustomButtonLabels.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} confirmButton={{\n        label: \'Custom Confirm\'\n      }} cancelButton={{\n        label: \'Custom Cancel\'\n      }} title="Heading 5" subtitle="Subtitle 1">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...CustomButtonLabels.parameters?.docs?.source}}},WithTitleIcon.parameters={...WithTitleIcon.parameters,docs:{...WithTitleIcon.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} title="With title icon" titleIcon="warningFilled">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...WithTitleIcon.parameters?.docs?.source}}},WithoutCloseButton.parameters={...WithoutCloseButton.parameters,docs:{...WithoutCloseButton.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" hasCloseButton={false} isOpen={isModalOpen} onRequestClose={closeModal} title="Without close button">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...WithoutCloseButton.parameters?.docs?.source}}},ConfirmCallback.parameters={...ConfirmCallback.parameters,docs:{...ConfirmCallback.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    function handleConfirm(): void {\n      console.info(\'confirmed\');\n      closeModal();\n    }\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} confirmButton={{\n        onConfirm: handleConfirm\n      }} onRequestClose={closeModal} title="Heading 5" subtitle="Subtitle 1">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...ConfirmCallback.parameters?.docs?.source}}},CancelCallback.parameters={...CancelCallback.parameters,docs:{...CancelCallback.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    function handleCancel(): void {\n      console.info(\'canceled\');\n      closeModal();\n    }\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} cancelButton={{\n        onCancel: handleCancel\n      }} onRequestClose={closeModal} title="Heading 5" subtitle="Subtitle 1">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...CancelCallback.parameters?.docs?.source}}},NoTitles.parameters={...NoTitles.parameters,docs:{...NoTitles.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaLabel="Modal label" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal}>\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...NoTitles.parameters?.docs?.source}}},CustomFooterContent.parameters={...CustomFooterContent.parameters,docs:{...CustomFooterContent.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} title="Heading 5" subtitle="Subtitle 1" footerContent={<b>Custom Content</b>}>\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                        fringilla tellus nec auctor gravida.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...CustomFooterContent.parameters?.docs?.source}}},WithinShadowDOM.parameters={...WithinShadowDOM.parameters,docs:{...WithinShadowDOM.parameters?.docs,source:{originalSource:'{\n  decorators: [ShadowDomDecorator],\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    const [parentElement, setParentElement] = useState<HTMLDivElement | null>();\n    const ref = useCallback(setParentElement, [setParentElement]);\n    return <>\n                <AbsoluteDiv ref={ref} />\n\n                {parentElement && [<Button label="Open Modal" buttonType="primary" onClick={openModal} />, <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} parentSelector={() => parentElement} title="Heading 5" subtitle="Subtitle 1">\n                        <p style={{\n          margin: 0\n        }} id="story-description">\n                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus\n                            fringilla tellus nec auctor gravida.\n                        </p>\n                    </ModalDialog>]}\n            </>;\n  }\n}',...WithinShadowDOM.parameters?.docs?.source}}},InformationDialog.parameters={...InformationDialog.parameters,docs:{...InformationDialog.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="primary" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" isOpen={isModalOpen} onRequestClose={closeModal} title="Information Modal" dialogType="information" confirmButton={{\n        label: \'Got it\'\n      }}>\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        This modal has only one button. It is used to inform the user of something.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...InformationDialog.parameters?.docs?.source}}},AlertDialog.parameters={...AlertDialog.parameters,docs:{...AlertDialog.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const {\n      isModalOpen,\n      closeModal,\n      openModal\n    } = useModal();\n    return <>\n                <Button label="Open Modal" buttonType="destructive" onClick={openModal} />\n                <ModalDialog appElement="#storybook-root" ariaDescribedby="story-description" confirmButton={{\n        label: \'Delete\'\n      }} isOpen={isModalOpen} onRequestClose={closeModal} title="Alert Modal" dialogType="alert">\n                    <p style={{\n          margin: 0\n        }} id="story-description">\n                        This modal has a destructive button. It is used to alert the user of something.\n                    </p>\n                </ModalDialog>\n            </>;\n  }\n}',...AlertDialog.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","Scrollable","CustomButtonLabels","WithTitleIcon","WithoutCloseButton","ConfirmCallback","CancelCallback","NoTitles","CustomFooterContent","WithinShadowDOM","InformationDialog","AlertDialog"]},"./stories/utils/shadow-dom-decorator.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>ShadowDomDecorator});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../.yarn/cache/react-npm-17.0.2-99ba37d931-b254cc17ce.zip/node_modules/react/jsx-runtime.js");const ShadowDomDecorator=Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.ThemeWrapper,{isolateStyles:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});ShadowDomDecorator.displayName="ShadowDomDecorator";try{ShadowDomDecorator.displayName="ShadowDomDecorator",ShadowDomDecorator.__docgenInfo={description:"",displayName:"ShadowDomDecorator",props:{propTypes:{defaultValue:null,description:"",name:"propTypes",required:!1,type:{name:"WeakValidationMap<{}>"}},contextType:{defaultValue:null,description:"",name:"contextType",required:!1,type:{name:"Context<any>"}},contextTypes:{defaultValue:null,description:"",name:"contextTypes",required:!1,type:{name:"ValidationMap<any>"}},childContextTypes:{defaultValue:null,description:"",name:"childContextTypes",required:!1,type:{name:"ValidationMap<any>"}},defaultProps:{defaultValue:null,description:"",name:"defaultProps",required:!1,type:{name:"Partial<{}>"}},displayName:{defaultValue:null,description:"",name:"displayName",required:!1,type:{name:"string"}},getDerivedStateFromProps:{defaultValue:null,description:"",name:"getDerivedStateFromProps",required:!1,type:{name:"GetDerivedStateFromProps<{}, any>"}},getDerivedStateFromError:{defaultValue:null,description:"",name:"getDerivedStateFromError",required:!1,type:{name:"GetDerivedStateFromError<{}, any>"}},apply:{defaultValue:null,description:"Calls the function with the specified object as the this value and the elements of specified array as the arguments.\n@param thisArg The object to be used as the this object.\n@param thisArg The object to be used as the this object.\n@param args An array of argument values to be passed to the function.\n@param thisArg The object to be used as the this object.\n@param thisArg The object to be used as the this object.\n@param args An array of argument values to be passed to the function.",name:"apply",required:!0,type:{name:"{ <T>(this: new () => T, thisArg: T): void; <T, A extends any[]>(this: new (...args: A) => T, thisArg: T, args: A): void; } | { <T, R>(this: (this: T) => R, thisArg: T): R; <T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args: A): R; }"}},call:{defaultValue:null,description:"Calls the function with the specified object as the this value and the specified rest arguments as the arguments.\n@param thisArg The object to be used as the this object.\n@param args Argument values to be passed to the function.\n@param thisArg The object to be used as the this object.\n@param args Argument values to be passed to the function.",name:"call",required:!0,type:{name:"(<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, ...args: A) => void) | (<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A) => R)"}},bind:{defaultValue:null,description:"For a given function, creates a bound function that has the same body as the original function.\nThe this object of the bound function is associated with the specified object, and has the specified initial parameters.\n@param thisArg The object to be used as the this object.\n@param thisArg The object to be used as the this object.\n@param args Arguments to bind to the parameters of the function.\n@param thisArg The object to be used as the this object.\n@param thisArg The object to be used as the this object.\n@param args Arguments to bind to the parameters of the function.",name:"bind",required:!0,type:{name:"{ <T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>; <T, A extends any[], B extends any[], R>(this: (this: T, ...args: [...A, ...B]) => R, thisArg: T, ...args: A): (...args: B) => R; } | { ...; }"}},toString:{defaultValue:null,description:"Returns a string representation of a function.",name:"toString",required:!1,type:{name:"() => string"}},prototype:{defaultValue:null,description:"",name:"prototype",required:!0,type:{name:"any"}},length:{defaultValue:null,description:"",name:"length",required:!0,type:{name:"number"}},arguments:{defaultValue:null,description:"",name:"arguments",required:!0,type:{name:"any"}},caller:{defaultValue:null,description:"",name:"caller",required:!0,type:{name:"Function"}},name:{defaultValue:null,description:"Returns the name of the function. Function names are read-only and can not be changed.",name:"name",required:!0,type:{name:"string"}},"__@hasInstance@227":{defaultValue:null,description:"Determines whether the given value inherits from this function if this function was used\nas a constructor function.\n\nA constructor function can control which objects are recognized as its instances by\n'instanceof' by overriding this method.",name:"__@hasInstance@227",required:!0,type:{name:"(value: any) => boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/utils/shadow-dom-decorator.tsx#ShadowDomDecorator"]={docgenInfo:ShadowDomDecorator.__docgenInfo,name:"ShadowDomDecorator",path:"stories/utils/shadow-dom-decorator.tsx#ShadowDomDecorator"})}catch(__react_docgen_typescript_loader_error){}}}]);