"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[2074],{"../../.yarn/__virtual__/@mdx-js-react-virtual-8f9c672b3d/4/.yarn/berry/cache/@mdx-js-react-npm-3.1.0-a91217d996-10c0.zip/node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./stories/validation-inline.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js"),_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_7afe6e2126_4_yarn_berry_cache_storybook_addon_docs_npm_8_5_6_cd6ced5577_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../.yarn/__virtual__/@mdx-js-react-virtual-8f9c672b3d/4/.yarn/berry/cache/@mdx-js-react-npm-3.1.0-a91217d996-10c0.zip/node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../.yarn/__virtual__/@storybook-blocks-virtual-54e2580c9b/4/.yarn/berry/cache/@storybook-blocks-npm-8.5.6-a637a0850c-10c0.zip/node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){const _components={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_7afe6e2126_4_yarn_berry_cache_storybook_addon_docs_npm_8_5_6_cd6ced5577_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.W8,{title:"Patterns/Forms/Validation inline"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"form-validation-inline",children:"Form Validation (Inline)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Note"}),": This documentation outlines the best practice for providing feedback when users enter invalid data in form controls. It should be followed to ensure a consistent and accessible user experience. However, if project constraints or limitations (such as technical debt) make it impractical to implement this exact pattern, deviations may occur. In such cases, alternative patterns may be used while still aiming to maintain accessibility and usability standards."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"objective-problem-to-solve",children:"Objective (problem to solve)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Users need feedback after entering invalid data for a form control."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"solution-how-to-address-the-problem",children:"Solution (how to address the problem)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Notify users by providing an error message when the form control loses focus (on blur)."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"visual-design",children:"Visual Design"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figure",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img",{src:"doc/patterns/forms/Client-side-focus.png",alt:"form with field with keyboard focus",style:{width:"600px"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption",{children:"Figure 1: Form control with keyboard focus, highlighting the field for user interaction."})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("figure",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img",{src:"doc/patterns/forms/Client-side-error.png",alt:"form with field in error",style:{width:"600px"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("figcaption",{children:"Figure 2: Form control with the focus on the next field, showing the previous field in an error state after focus has moved."})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"behavior",children:"Behavior"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Users enter invalid data in a form."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"The entered value fails the validation when the user moves the focus away from the form control."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["An error icon and message is displayed next to the form control.","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"The error message clearly describes the error."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"The error message provides guidance of how to fix the error."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"The icon and error message have a red color that passes the contrast ratio of 3:1."}),"\n"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Form control's border turns red, passing the contrast ratio of 3:1."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["Form control have an ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"aria-invalid=”true”"})," attribute for screen reader to announce it as “invalid” on focus."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["Form control have a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'aria-describedby="[id-of-the-error-message]"'})," attribute associated to their respective error message for screen reader to announce the error message on focus."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"when-to-use",children:"When to use"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"When users enter invalid data into a form control and need immediate feedback."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"rationale-why-this-solution",children:"Rationale (why this solution)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"When a form is filled, the values are checked and a feedback is necessary to indicate to users if the entered value is valid or not. By Indicating an error right after users move the focus away from the form control provides the least interaction cost for the user allowing them to fix the error as it happen."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"form-controls",children:"Form controls"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Providing an error message next to each invalid form control allows users to identify each one of them individually. The error message has a red color that passes the color contrast ratio of 3:1 and an error icon allowing also color blind users to clearly identify the error state of a form control."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"screen-reader-considerations",children:"Screen Reader Considerations"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["We’ve decided not to notify screen reader users at the same time as sight users (they’ll be notify after the form is submitted). This approach helps avoid potential usability issues associated with inline or client-side validation. For example, using the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'aria-live="assertive"'})," attribute on blur may be too intrusive for some users, while using ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'aria-live="polite"'})," could result in the screen reader announcing the next form control before reading the error message for the invalid control, which may confuse users."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'aria-invalid="true"'})," and the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'aria-describedby="[id-of-the-error-message]"'})," attributes allows screen reader users to be notified of invalid form control and their respective error message when focused."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["WCAG 2.1 Success Criterion ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html",rel:"nofollow",children:"1.4.3 Contrast Minimum"})," (Level A)"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["WCAG 2.1 Success Criterion ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html",rel:"nofollow",children:"3.3.1 Error Identification"})," (Level A)"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["WCAG 2.1 Success Criterion ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html",rel:"nofollow",children:"3.3.2 Labels or Instructions"})," (Level A)"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["WCAG 2.1 Success Criterion ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html",rel:"nofollow",children:"3.3.3 Error Suggestions"})," (Level AA)"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["WCAG 2.1 Success Criterion ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-all.html",rel:"nofollow",children:"3.3.4 Error Prevention (Legal, Financial, Data)"})," (Level AA)"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"related-components",children:"Related components"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Combobox"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Date picker"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Money input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Numeric input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Phone input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Stepper input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Text input"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Text area"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"references",children:"References"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.nngroup.com/articles/errors-forms-design-guidelines/",rel:"nofollow",children:"https://www.nngroup.com/articles/errors-forms-design-guidelines/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://lsnrae.medium.com/accessible-form-validation-9fa637ddb0fc",rel:"nofollow",children:"https://lsnrae.medium.com/accessible-form-validation-9fa637ddb0fc"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://usability.yale.edu/web-accessibility/articles/forms",rel:"nofollow",children:"https://usability.yale.edu/web-accessibility/articles/forms"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://webaim.org/techniques/formvalidation/",rel:"nofollow",children:"https://webaim.org/techniques/formvalidation/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/tutorials/forms/notifications/",rel:"nofollow",children:"https://www.w3.org/WAI/tutorials/forms/notifications/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.levelaccess.com/level-access-news/how-to-provide-accessible-error-identification/",rel:"nofollow",children:"https://www.levelaccess.com/level-access-news/how-to-provide-accessible-error-identification/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.washington.edu/accessibility/checklist/form-validation/",rel:"nofollow",children:"https://www.washington.edu/accessibility/checklist/form-validation/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.ibm.com/able/toolkit/design/ux/feedback/",rel:"nofollow",children:"https://www.ibm.com/able/toolkit/design/ux/feedback/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.ibm.com/able/toolkit/develop/coding-interactions/dynamic-content/#provide-errors-accessibly",rel:"nofollow",children:"https://www.ibm.com/able/toolkit/develop/coding-interactions/dynamic-content/#provide-errors-accessibly"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://hiddedevries.nl/en/blog/2017-04-04-how-to-make-inline-error-messages-accessible",rel:"nofollow",children:"https://hiddedevries.nl/en/blog/2017-04-04-how-to-make-inline-error-messages-accessible"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://design-system.service.gov.uk/patterns/validation/",rel:"nofollow",children:"https://design-system.service.gov.uk/patterns/validation/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.carbondesignsystem.com/patterns/forms-pattern/#errors-and-validation",rel:"nofollow",children:"https://www.carbondesignsystem.com/patterns/forms-pattern/#errors-and-validation"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://design.mindsphere.io/patterns/form-validation.html",rel:"nofollow",children:"https://design.mindsphere.io/patterns/form-validation.html"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://hds.hel.fi/patterns/form-validation",rel:"nofollow",children:"https://hds.hel.fi/patterns/form-validation"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://rei.github.io/rei-cedar-docs/patterns/form-validation/",rel:"nofollow",children:"https://rei.github.io/rei-cedar-docs/patterns/form-validation/"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://ui-patterns.com/patterns/InputFeedback",rel:"nofollow",children:"https://ui-patterns.com/patterns/InputFeedback"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://ds.equisoft.io/pr-949/?path=/story/components-text-input--default",rel:"nofollow",children:"https://ds.equisoft.io/pr-949/?path=/story/components-text-input--default"})}),"\n"]})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_runner_work_design_elements_design_elements_yarn_virtual_storybook_addon_docs_virtual_7afe6e2126_4_yarn_berry_cache_storybook_addon_docs_npm_8_5_6_cd6ced5577_10c0_zip_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim_mjs__WEBPACK_IMPORTED_MODULE_2__.R)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}}}]);