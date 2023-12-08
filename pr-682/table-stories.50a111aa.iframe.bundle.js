"use strict";(self.webpackChunk_equisoft_design_elements_storybook=self.webpackChunk_equisoft_design_elements_storybook||[]).push([[7560],{"./stories/table.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomColumns:()=>CustomColumns,CustomTextAlignment:()=>CustomTextAlignment,ErrorRows:()=>ErrorRows,Normal:()=>Normal,RowClickCallback:()=>RowClickCallback,RowNumbers:()=>RowNumbers,SelectableRows:()=>SelectableRows,SmallRows:()=>SmallRows,SortableRows:()=>SortableRows,Sticky:()=>Sticky,Striped:()=>Striped,WithColumnClassnames:()=>WithColumnClassnames,WithFooter:()=>WithFooter,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../.yarn/__virtual__/@equisoft-design-elements-react-virtual-0c2f823c14/1/packages/react/dist/bundle.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../.yarn/__virtual__/styled-components-virtual-0e8c327dd2/4/.yarn/berry/cache/styled-components-npm-5.3.11-d45616b9af-10c0.zip/node_modules/styled-components/dist/styled-components.browser.esm.js"),_utils_parameters__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./stories/utils/parameters.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../../../../.yarn/berry/cache/react-npm-17.0.2-99ba37d931-10c0.zip/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Structure/Table",component:_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,parameters:_utils_parameters__WEBPACK_IMPORTED_MODULE_1__.O},Normal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b"},{column1:"a",column2:"a",column3:"a"}]});Normal.displayName="Normal";const StyledTable=(0,styled_components__WEBPACK_IMPORTED_MODULE_3__.default)((({className,columns,data})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{className,columns,data})))`
    .column-1 {
        box-sizing: border-box;
        width: 150px;
    }

    .column-2 {
        box-sizing: border-box;
        width: 300px;
    }
`,WithColumnClassnames=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StyledTable,{columns:[{header:"Column 1",accessorKey:"column1",className:"column-1"},{header:"Column 2",accessorKey:"column2",className:"column-2"},{header:"Column 3",accessorKey:"column3",className:"column-3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b"},{column1:"a",column2:"a",column3:"a"}]});WithColumnClassnames.displayName="WithColumnClassnames";const WithFooter=()=>{const data=[{column1:"a",column2:"a",numbers:10},{column1:"b",column2:"b",numbers:20},{column1:"a",column2:"a",numbers:30}],columns=[{header:"Column 1",accessorKey:"column1",footer:"Total:",footerColSpan:2},{header:"Column 2",accessorKey:"column2",footerColSpan:0},{header:"Numbers",accessorKey:"numbers",footer:()=>{const total=data.reduce(((sum,row)=>row.numbers+sum),0);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span",{children:["Total:",total]})}}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns,data})};WithFooter.displayName="WithFooter";const ErrorRows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b",error:!0},{column1:"c",column2:"c",column3:"c",error:!0}]});ErrorRows.displayName="ErrorRows";const Striped=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{striped:!0,columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b"},{column1:"c",column2:"c",column3:"c"}]});Striped.displayName="Striped";const RowNumbers=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{rowNumbers:!0,columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b"},{column1:"a",column2:"a",column3:"a"}]});RowNumbers.displayName="RowNumbers";const SmallRows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{rowSize:"small",columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a"},{column1:"b",column2:"b",column3:"b"},{column1:"a",column2:"a",column3:"a"}]});SmallRows.displayName="SmallRows";const RowClickCallback=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:"a",href:"/row1"},{column1:"b",column2:"b",column3:"b",href:"/row2"}],onRowClick:row=>{console.info("row: ",row),console.info("href: ",row.original.href)}});RowClickCallback.displayName="RowClickCallback";const CustomTextAlignment=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2",textAlign:"center"},{header:"Column 3",accessorKey:"column3",textAlign:"right"}],data:[{column1:"Hello",column2:"World",column3:"Hello"},{column1:"Hello",column2:"World",column3:"Hello"}]});CustomTextAlignment.displayName="CustomTextAlignment";const CategoryCell=({cellValue})=>{const{value,tooltip}=cellValue;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{style:{display:"flex"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{style:{marginRight:"var(--spacing-half)"},children:value}),tooltip&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Tooltip,{label:tooltip})]})};CategoryCell.displayName="CategoryCell";const AmountHeader=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{textAlign:"right"},children:"Amount ($)"});AmountHeader.displayName="AmountHeader";const AmountCell=({cellValue})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{textAlign:"right"},children:cellValue});AmountCell.displayName="AmountCell";const CustomColumns=()=>{const columns=[{header:"Category",accessorKey:"category",cell:props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(CategoryCell,{cellValue:props.cell.getValue()})},{header:AmountHeader,accessorKey:"amount",cell:props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(AmountCell,{cellValue:props.cell.getValue()})}];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns,data:[{category:{value:"Safety fund",tooltip:"Money for emergencies"},amount:"2000$"},{category:{value:"Investments"},amount:"12000$"}]})};CustomColumns.displayName="CustomColumns";const SortableRows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2",sortable:!0,defaultSort:"asc"},{header:"Column 3",accessorKey:"column3",sortable:!0}],data:[{column1:"a",column2:"a",column3:10},{column1:"b",column2:"b",column3:20}]});SortableRows.displayName="SortableRows";const SelectableRows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{selectableRows:!0,columns:[{header:"Column 1",accessorKey:"column1"},{header:"Column 2",accessorKey:"column2"},{header:"Column 3",accessorKey:"column3"}],data:[{column1:"a",column2:"a",column3:10},{column1:"b",column2:"b",column3:20}],onSelectedRowsChange:console.info});SelectableRows.displayName="SelectableRows";const Wrap=styled_components__WEBPACK_IMPORTED_MODULE_3__.default.div`
    height: 200px;
    overflow: scroll;
`,Sticky=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrap,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_equisoft_design_elements_react__WEBPACK_IMPORTED_MODULE_0__.Table,{columns:[{header:"Column 1",accessorKey:"column1",sticky:!0},{header:"Column 2",accessorKey:"column2",sticky:!0},{header:"Column 3",accessorKey:"column3"},{header:"Column 4",accessorKey:"column4"},{header:"Column 5",accessorKey:"column5"},{header:"Column 6",accessorKey:"column6"},{header:"Column 7",accessorKey:"column7"},{header:"Column 8",accessorKey:"column8"},{header:"Column 9",accessorKey:"column9"},{header:"Column 10",accessorKey:"column10"},{header:"Column 11",accessorKey:"column11"},{header:"Column 12",accessorKey:"column12"},{header:"Column 13",accessorKey:"column13"},{header:"Column 14",accessorKey:"column14"},{header:"Column 15",accessorKey:"column15"}],data:[{column1:"a",column2:"a",column3:"a",column4:"a",column5:"a",column6:"a",column7:"a",column8:"a",column9:"a",column10:"a",column11:"a",column12:"a",column13:"a",column14:"a",column15:"a"},{column1:"b",column2:"b",column3:"b",column4:"b",column5:"b",column6:"b",column7:"b",column8:"b",column9:"b",column10:"b",column11:"b",column12:"b",column13:"b",column14:"b",column15:"b"},{column1:"c",column2:"c",column3:"c",column4:"c",column5:"c",column6:"c",column7:"c",column8:"c",column9:"c",column10:"c",column11:"c",column12:"c",column13:"c",column14:"c",column15:"c",error:!0},{column1:"d",column2:"d",column3:"d",column4:"d",column5:"d",column6:"d",column7:"d",column8:"d",column9:"d",column10:"d",column11:"d",column12:"d",column13:"d",column14:"d",column15:"d"},{column1:"e",column2:"e",column3:"e",column4:"e",column5:"e",column6:"e",column7:"e",column8:"e",column9:"e",column10:"e",column11:"e",column12:"e",column13:"e",column14:"e",column15:"e"},{column1:"f",column2:"f",column3:"f",column4:"f",column5:"f",column6:"f",column7:"f",column8:"f",column9:"f",column10:"f",column11:"f",column12:"f",column13:"f",column14:"f",column15:"f"},{column1:"g",column2:"g",column3:"g",column4:"g",column5:"g",column6:"g",column7:"g",column8:"g",column9:"g",column10:"g",column11:"g",column12:"g",column13:"g",column14:"g",column15:"g"},{column1:"h",column2:"h",column3:"h",column4:"h",column5:"h",column6:"h",column7:"h",column8:"h",column9:"h",column10:"h",column11:"h",column12:"h",column13:"h",column14:"h",column15:"h"},{column1:"i",column2:"i",column3:"i",column4:"i",column5:"i",column6:"i",column7:"i",column8:"i",column9:"i",column10:"i",column11:"i",column12:"i",column13:"i",column14:"i",column15:"i"}],stickyHeader:!0,onRowClick:row=>console.info("row: ",row)})});Sticky.displayName="Sticky",Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b'\n  }, {\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }];\n  return <Table columns={columns} data={data} />;\n}",...Normal.parameters?.docs?.source}}},WithColumnClassnames.parameters={...WithColumnClassnames.parameters,docs:{...WithColumnClassnames.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1',\n    className: 'column-1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2',\n    className: 'column-2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3',\n    className: 'column-3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b'\n  }, {\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }];\n  return <StyledTable columns={columns} data={data} />;\n}",...WithColumnClassnames.parameters?.docs?.source}}},WithFooter.parameters={...WithFooter.parameters,docs:{...WithFooter.parameters?.docs,source:{originalSource:"() => {\n  const data: TableRow<FooterData>[] = [{\n    column1: 'a',\n    column2: 'a',\n    numbers: 10\n  }, {\n    column1: 'b',\n    column2: 'b',\n    numbers: 20\n  }, {\n    column1: 'a',\n    column2: 'a',\n    numbers: 30\n  }];\n\n  // Footer function for the 'numbers' column\n  const footerSum = (): ReactElement => {\n    const total = data.reduce((sum, row) => row.numbers + sum, 0);\n    return <span>\n                Total:\n                {total}\n            </span>;\n  };\n\n  // Calculate the total sum of 'numbers'\n  const columns: TableColumn<FooterData> = [{\n    header: 'Column 1',\n    accessorKey: 'column1',\n    footer: 'Total:',\n    footerColSpan: 2\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2',\n    footerColSpan: 0\n  }, {\n    header: 'Numbers',\n    accessorKey: 'numbers',\n    footer: footerSum\n  }];\n  return <Table columns={columns} data={data} />;\n}",...WithFooter.parameters?.docs?.source}}},ErrorRows.parameters={...ErrorRows.parameters,docs:{...ErrorRows.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b',\n    error: true\n  }, {\n    column1: 'c',\n    column2: 'c',\n    column3: 'c',\n    error: true\n  }];\n  return <Table columns={columns} data={data} />;\n}",...ErrorRows.parameters?.docs?.source}}},Striped.parameters={...Striped.parameters,docs:{...Striped.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b'\n  }, {\n    column1: 'c',\n    column2: 'c',\n    column3: 'c'\n  }];\n  return <Table striped columns={columns} data={data} />;\n}",...Striped.parameters?.docs?.source}}},RowNumbers.parameters={...RowNumbers.parameters,docs:{...RowNumbers.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b'\n  }, {\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }];\n  return <Table rowNumbers columns={columns} data={data} />;\n}",...RowNumbers.parameters?.docs?.source}}},SmallRows.parameters={...SmallRows.parameters,docs:{...SmallRows.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b'\n  }, {\n    column1: 'a',\n    column2: 'a',\n    column3: 'a'\n  }];\n  return <Table rowSize=\"small\" columns={columns} data={data} />;\n}",...SmallRows.parameters?.docs?.source}}},RowClickCallback.parameters={...RowClickCallback.parameters,docs:{...RowClickCallback.parameters?.docs,source:{originalSource:"() => {\n  interface DataWithHref {\n    column1: string;\n    column2: string;\n    column3: string;\n    href: string;\n  }\n  const columns: TableColumn<DataWithHref> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<DataWithHref>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a',\n    href: '/row1'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b',\n    href: '/row2'\n  }];\n  return <Table<DataWithHref> columns={columns} data={data} onRowClick={row => {\n    console.info('row: ', row);\n    console.info('href: ', row.original.href);\n  }} />;\n}",...RowClickCallback.parameters?.docs?.source}}},CustomTextAlignment.parameters={...CustomTextAlignment.parameters,docs:{...CustomTextAlignment.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<Data> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2',\n    textAlign: 'center'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3',\n    textAlign: 'right'\n  }];\n  const data: TableRow<Data>[] = [{\n    column1: 'Hello',\n    column2: 'World',\n    column3: 'Hello'\n  }, {\n    column1: 'Hello',\n    column2: 'World',\n    column3: 'Hello'\n  }];\n  return <Table columns={columns} data={data} />;\n}",...CustomTextAlignment.parameters?.docs?.source}}},CustomColumns.parameters={...CustomColumns.parameters,docs:{...CustomColumns.parameters?.docs,source:{originalSource:"() => {\n  const data: ComplexData[] = [{\n    category: {\n      value: 'Safety fund',\n      tooltip: 'Money for emergencies'\n    },\n    amount: '2000$'\n  }, {\n    category: {\n      value: 'Investments'\n    },\n    amount: '12000$'\n  }];\n  const columns: TableColumn<ComplexData> = [{\n    header: 'Category',\n    accessorKey: 'category',\n    // eslint-disable-next-line react/no-unstable-nested-components\n    cell: props => <CategoryCell cellValue={(props.cell.getValue() as ComplexData['category'])} />\n  }, {\n    header: AmountHeader,\n    accessorKey: 'amount',\n    // eslint-disable-next-line react/no-unstable-nested-components\n    cell: props => <AmountCell cellValue={(props.cell.getValue() as ComplexData['amount'])} />\n  }];\n  return <Table<ComplexData> columns={columns} data={data} />;\n}",...CustomColumns.parameters?.docs?.source}}},SortableRows.parameters={...SortableRows.parameters,docs:{...SortableRows.parameters?.docs,source:{originalSource:"() => {\n  interface SortableData {\n    column1: string;\n    column2: string;\n    column3: number;\n  }\n  const columns: TableColumn<SortableData> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2',\n    sortable: true,\n    defaultSort: 'asc'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3',\n    sortable: true\n  }];\n  const data: TableRow<SortableData>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 10\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 20\n  }];\n  return <Table<SortableData> columns={columns} data={data} />;\n}",...SortableRows.parameters?.docs?.source}}},SelectableRows.parameters={...SelectableRows.parameters,docs:{...SelectableRows.parameters?.docs,source:{originalSource:"() => {\n  interface SelectableData {\n    column1: string;\n    column2: string;\n    column3: number;\n  }\n  const columns: TableColumn<SelectableData> = [{\n    header: 'Column 1',\n    accessorKey: 'column1'\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2'\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }];\n  const data: TableRow<SelectableData>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 10\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 20\n  }];\n  return <Table<SelectableData> selectableRows columns={columns} data={data} onSelectedRowsChange={console.info} />;\n}",...SelectableRows.parameters?.docs?.source}}},Sticky.parameters={...Sticky.parameters,docs:{...Sticky.parameters?.docs,source:{originalSource:"() => {\n  const columns: TableColumn<StickyData> = [{\n    header: 'Column 1',\n    accessorKey: 'column1',\n    sticky: true\n  }, {\n    header: 'Column 2',\n    accessorKey: 'column2',\n    sticky: true\n  }, {\n    header: 'Column 3',\n    accessorKey: 'column3'\n  }, {\n    header: 'Column 4',\n    accessorKey: 'column4'\n  }, {\n    header: 'Column 5',\n    accessorKey: 'column5'\n  }, {\n    header: 'Column 6',\n    accessorKey: 'column6'\n  }, {\n    header: 'Column 7',\n    accessorKey: 'column7'\n  }, {\n    header: 'Column 8',\n    accessorKey: 'column8'\n  }, {\n    header: 'Column 9',\n    accessorKey: 'column9'\n  }, {\n    header: 'Column 10',\n    accessorKey: 'column10'\n  }, {\n    header: 'Column 11',\n    accessorKey: 'column11'\n  }, {\n    header: 'Column 12',\n    accessorKey: 'column12'\n  }, {\n    header: 'Column 13',\n    accessorKey: 'column13'\n  }, {\n    header: 'Column 14',\n    accessorKey: 'column14'\n  }, {\n    header: 'Column 15',\n    accessorKey: 'column15'\n  }];\n  const data: TableRow<StickyData>[] = [{\n    column1: 'a',\n    column2: 'a',\n    column3: 'a',\n    column4: 'a',\n    column5: 'a',\n    column6: 'a',\n    column7: 'a',\n    column8: 'a',\n    column9: 'a',\n    column10: 'a',\n    column11: 'a',\n    column12: 'a',\n    column13: 'a',\n    column14: 'a',\n    column15: 'a'\n  }, {\n    column1: 'b',\n    column2: 'b',\n    column3: 'b',\n    column4: 'b',\n    column5: 'b',\n    column6: 'b',\n    column7: 'b',\n    column8: 'b',\n    column9: 'b',\n    column10: 'b',\n    column11: 'b',\n    column12: 'b',\n    column13: 'b',\n    column14: 'b',\n    column15: 'b'\n  }, {\n    column1: 'c',\n    column2: 'c',\n    column3: 'c',\n    column4: 'c',\n    column5: 'c',\n    column6: 'c',\n    column7: 'c',\n    column8: 'c',\n    column9: 'c',\n    column10: 'c',\n    column11: 'c',\n    column12: 'c',\n    column13: 'c',\n    column14: 'c',\n    column15: 'c',\n    error: true\n  }, {\n    column1: 'd',\n    column2: 'd',\n    column3: 'd',\n    column4: 'd',\n    column5: 'd',\n    column6: 'd',\n    column7: 'd',\n    column8: 'd',\n    column9: 'd',\n    column10: 'd',\n    column11: 'd',\n    column12: 'd',\n    column13: 'd',\n    column14: 'd',\n    column15: 'd'\n  }, {\n    column1: 'e',\n    column2: 'e',\n    column3: 'e',\n    column4: 'e',\n    column5: 'e',\n    column6: 'e',\n    column7: 'e',\n    column8: 'e',\n    column9: 'e',\n    column10: 'e',\n    column11: 'e',\n    column12: 'e',\n    column13: 'e',\n    column14: 'e',\n    column15: 'e'\n  }, {\n    column1: 'f',\n    column2: 'f',\n    column3: 'f',\n    column4: 'f',\n    column5: 'f',\n    column6: 'f',\n    column7: 'f',\n    column8: 'f',\n    column9: 'f',\n    column10: 'f',\n    column11: 'f',\n    column12: 'f',\n    column13: 'f',\n    column14: 'f',\n    column15: 'f'\n  }, {\n    column1: 'g',\n    column2: 'g',\n    column3: 'g',\n    column4: 'g',\n    column5: 'g',\n    column6: 'g',\n    column7: 'g',\n    column8: 'g',\n    column9: 'g',\n    column10: 'g',\n    column11: 'g',\n    column12: 'g',\n    column13: 'g',\n    column14: 'g',\n    column15: 'g'\n  }, {\n    column1: 'h',\n    column2: 'h',\n    column3: 'h',\n    column4: 'h',\n    column5: 'h',\n    column6: 'h',\n    column7: 'h',\n    column8: 'h',\n    column9: 'h',\n    column10: 'h',\n    column11: 'h',\n    column12: 'h',\n    column13: 'h',\n    column14: 'h',\n    column15: 'h'\n  }, {\n    column1: 'i',\n    column2: 'i',\n    column3: 'i',\n    column4: 'i',\n    column5: 'i',\n    column6: 'i',\n    column7: 'i',\n    column8: 'i',\n    column9: 'i',\n    column10: 'i',\n    column11: 'i',\n    column12: 'i',\n    column13: 'i',\n    column14: 'i',\n    column15: 'i'\n  }];\n  return <Wrap>\n            <Table columns={columns} data={data} stickyHeader onRowClick={row => console.info('row: ', row)} />\n        </Wrap>;\n}",...Sticky.parameters?.docs?.source}}};const __namedExportsOrder=["Normal","WithColumnClassnames","WithFooter","ErrorRows","Striped","RowNumbers","SmallRows","RowClickCallback","CustomTextAlignment","CustomColumns","SortableRows","SelectableRows","Sticky"]},"./stories/utils/parameters.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>rawCodeParameters});const rawCodeParameters={docs:{source:{type:"code"}}}}}]);