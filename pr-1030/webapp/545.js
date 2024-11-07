"use strict";(self.webpackChunkequisoft_design_system_webapp=self.webpackChunkequisoft_design_system_webapp||[]).push([[545],{545:function(e,s,a){a.d(s,{UserPage:function(){return A},UsersPage:function(){return E}});var t=a(881),l=a(533),n=a(786),r=a(309),i=a(220),o=a(562),d=a(456),c=a(872);const u=({id:e})=>{const s=(0,o.ur)(e);return(0,t.jsx)(l.RouteLink,{label:s?.name,href:`/user/${s?.id}`,routerLink:c.NavLink})},p=({id:e})=>{const{t:s}=(0,n.Bd)("users"),a=(0,o.ur)(e),i=(0,o.vO)(),{openModal:c,closeModal:u,isModalOpen:p}=(0,l.useModal)(),{showToast:x}=(0,l.useToast)(),g=(0,r.useCallback)((()=>{i({type:d.L.DELETE,id:e}),u(),x("success",s("deleteUserSuccess",{user:a?.name}))}),[u,i,e,x,s,a?.name]),f=(0,r.useCallback)((()=>{c()}),[c]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.Tooltip,{label:s("deleteUser",{user:a?.name}),children:(0,t.jsx)(l.IconButton,{buttonType:"tertiary",iconName:"trash","aria-label":s("deleteUser",{user:a?.name}),onClick:()=>f()})}),(0,t.jsx)(l.ModalDialog,{title:s("deleteUser",{user:`${a?.name}`}),appElement:"#root",isOpen:p,onRequestClose:u,confirmButton:{label:s("delete"),onConfirm:g},cancelButton:{label:s("cancel")},dialogType:"alert",children:(0,t.jsx)("span",{id:"modal-description",children:s("deleteUserMessage")})})]})},x=i.default.nav`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    gap: 8px;
    justify-content: space-between;
`,g=()=>{const{table:e}=(0,o.dp)(),s=(0,o.vO)(),a=(0,r.useCallback)((()=>(0,t.jsx)(l.Pagination,{resultsPerPage:e.usersPerPage,numberOfResults:e.totalCount,activePage:e.currentPage,onPageChange:e=>{s({type:d.L.UPDATE_TABLE,key:"currentPage",value:e})},pagesShown:3})),[e.usersPerPage,e.totalCount,e.currentPage,s]);return(0,t.jsxs)(x,{"aria-label":"table's pagination",children:[(0,t.jsx)("div",{}),a()]})};var f,h=a(741);!function(e){e.EDIT="edit",e.READ="read",e.CREATE="create"}(f||(f={}));const m=()=>{const{t:e}=(0,n.Bd)("users");return(0,t.jsxs)(l.Link,{button:{buttonType:"secondary"},href:h.b.user.getHref(f.CREATE),children:[(0,t.jsx)(l.Icon,{name:"plusSign"}),e("create")]})},b=i.default.div`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    justify-content: flex-end;
    padding: 8px 8px;
`,j=()=>(0,t.jsx)(b,{children:(0,t.jsx)(m,{})}),y=i.default.div`
    align-items: flex-start;
    align-self: stretch;
    background: #ffffff;
    border: 1px solid #f1f2f2;
    border-radius: 8px;
    box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 8px;
    padding: 16px 32px;

    td:nth-child(4) {
        padding-left: 0;
        padding-right: 0;
    }

    .action-column {
        box-sizing: border-box;
        width: 50px;
    }

    .data-column {
        box-sizing: border-box;
        width: 35%;
    }
`,T=()=>{const{t:e}=(0,n.Bd)("users"),{table:s}=(0,o.dp)(),a=(0,o.vO)(),i=(0,r.useMemo)((()=>[{id:"name",header:e("name"),accessorKey:"id",className:"data-column",sortable:!0,sortDescFirst:!1,focusable:!0,cell:e=>(0,t.jsx)(u,{id:e.cell.getValue()})},{id:"email",header:e("email"),accessorKey:"email",className:"data-column",sortable:!0},{id:"phone",header:e("phone"),accessorKey:"phone",className:"data-column",sortable:!0},{id:"action-delete",headerAriaLabel:"delete",accessorKey:"id",header:"",className:"action-column",sortable:!1,cell:e=>(0,t.jsx)(p,{id:e.cell.getValue()})}]),[e]);return(0,t.jsxs)(y,{children:[(0,t.jsx)(j,{}),(0,t.jsx)(l.Table,{rowSize:"small",columns:i,data:s.currentPageUsers,manualSort:!0,onSort:e=>a({type:d.L.UPDATE_TABLE,key:"sortBy",value:e?{key:e.id,desc:e.desc}:void 0})}),(0,t.jsx)(g,{})]})},E=()=>{const{t:e}=(0,n.Bd)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.Heading,{bold:!0,noMargin:!0,type:"xlarge",tag:"h1",children:e("users:title")}),(0,t.jsx)(T,{})]})};var k=a(343);const P=({id:e})=>(console.log(e),(0,t.jsx)("form",{})),v=i.default.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`,C=i.default.span`
    color: ${({theme:e})=>e.alias["color-content"]};
    display: flex;
    flex-direction: row;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    gap: 4px;
    letter-spacing: 0.2px;
    line-height: 20px;
`,w=i.default.span`
    color: ${({theme:e})=>e.alias["color-feedback-border-alert"]};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 20px;
`,A=()=>{const{t:e}=(0,n.Bd)("user"),{mode:s,id:a}=(0,k.g)(),r=s||f.CREATE,i={[f.CREATE]:e("createTitle"),[f.EDIT]:e("editTitle"),[f.READ]:e("readTitle")}[r];return(0,t.jsxs)(v,{children:[(0,t.jsx)(l.Heading,{bold:!0,noMargin:!0,type:"xlarge",tag:"h1",children:i}),(0,t.jsxs)(C,{children:[e("requiredFields"),(0,t.jsx)(w,{children:"*"})]}),(0,t.jsx)(P,{id:a})]})}}}]);