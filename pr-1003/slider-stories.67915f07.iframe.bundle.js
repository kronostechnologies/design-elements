"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[6788],{"./stories/slider.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,Disabled:()=>Disabled,Range:()=>Range,Steps:()=>Steps,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js");const SliderMeta={title:"Components/Slider",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Slider,args:{label:"Label"}},__WEBPACK_DEFAULT_EXPORT__=SliderMeta,Basic={...SliderMeta,args:{...SliderMeta.args,min:0,max:100,defaultValue:50}},Range={...SliderMeta,args:{...SliderMeta.args,min:0,max:100,defaultValue:[30,60]}},Steps={...SliderMeta,args:{...SliderMeta.args,min:0,max:1e3,step:100,defaultValue:600}},Disabled={...SliderMeta,args:{...SliderMeta.args,min:0,max:100,defaultValue:50,step:10,disabled:!0}},__namedExportsOrder=["Basic","Range","Steps","Disabled"];Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  ...SliderMeta,\n  args: {\n    ...SliderMeta.args,\n    min: 0,\n    max: 100,\n    defaultValue: 50\n  }\n}",...Basic.parameters?.docs?.source}}},Range.parameters={...Range.parameters,docs:{...Range.parameters?.docs,source:{originalSource:"{\n  ...SliderMeta,\n  args: {\n    ...SliderMeta.args,\n    min: 0,\n    max: 100,\n    defaultValue: [30, 60]\n  }\n}",...Range.parameters?.docs?.source}}},Steps.parameters={...Steps.parameters,docs:{...Steps.parameters?.docs,source:{originalSource:"{\n  ...SliderMeta,\n  args: {\n    ...SliderMeta.args,\n    min: 0,\n    max: 1000,\n    step: 100,\n    defaultValue: 600\n  }\n}",...Steps.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  ...SliderMeta,\n  args: {\n    ...SliderMeta.args,\n    min: 0,\n    max: 100,\n    defaultValue: 50,\n    step: 10,\n    disabled: true\n  }\n}",...Disabled.parameters?.docs?.source}}}}}]);