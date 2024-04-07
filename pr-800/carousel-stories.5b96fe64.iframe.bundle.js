"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[7589],{"./stories/carousel.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Base:()=>Base,Loop:()=>Loop,WithAutomaticTransition:()=>WithAutomaticTransition,WithHeader:()=>WithHeader,WithInitialSlide:()=>WithInitialSlide,WithoutArrows:()=>WithoutArrows,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Carousel",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel},Slide=styled_components__WEBPACK_IMPORTED_MODULE_2__.default.div`
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
`,Header=styled_components__WEBPACK_IMPORTED_MODULE_2__.default.h1`
    text-align: center;
`;function slides(){return[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slide,{children:"Slide 1"},1),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slide,{children:"Slide 2"},2),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Slide,{children:"Slide 3"},3)]}const Base=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",children:slides()});Base.displayName="Base";const Loop=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",loop:!0,children:slides()});Loop.displayName="Loop";const WithoutArrows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",withArrows:!1,children:slides()});WithoutArrows.displayName="WithoutArrows";const WithHeader=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",header:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Header,{children:"Header"}),children:slides()});WithHeader.displayName="WithHeader";const WithInitialSlide=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",initialSlide:1,children:slides()});WithInitialSlide.displayName="WithInitialSlide";const WithAutomaticTransition=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Carousel,{"aria-label":"A carousel",autoTransitionDelay:1e3,loop:!0,children:slides()});WithAutomaticTransition.displayName="WithAutomaticTransition",Base.parameters={...Base.parameters,docs:{...Base.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel">\n        {slides()}\n    </Carousel>',...Base.parameters?.docs?.source}}},Loop.parameters={...Loop.parameters,docs:{...Loop.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel" loop>\n        {slides()}\n    </Carousel>',...Loop.parameters?.docs?.source}}},WithoutArrows.parameters={...WithoutArrows.parameters,docs:{...WithoutArrows.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel" withArrows={false}>\n        {slides()}\n    </Carousel>',...WithoutArrows.parameters?.docs?.source}}},WithHeader.parameters={...WithHeader.parameters,docs:{...WithHeader.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel" header={<Header>Header</Header>}>\n        {slides()}\n    </Carousel>',...WithHeader.parameters?.docs?.source}}},WithInitialSlide.parameters={...WithInitialSlide.parameters,docs:{...WithInitialSlide.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel" initialSlide={1}>\n        {slides()}\n    </Carousel>',...WithInitialSlide.parameters?.docs?.source}}},WithAutomaticTransition.parameters={...WithAutomaticTransition.parameters,docs:{...WithAutomaticTransition.parameters?.docs,source:{originalSource:'() => <Carousel aria-label="A carousel" autoTransitionDelay={1000} loop>\n        {slides()}\n    </Carousel>',...WithAutomaticTransition.parameters?.docs?.source}}};const __namedExportsOrder=["Base","Loop","WithoutArrows","WithHeader","WithInitialSlide","WithAutomaticTransition"]}}]);
//# sourceMappingURL=carousel-stories.5b96fe64.iframe.bundle.js.map