"use strict";(self.webpackChunkauniverse=self.webpackChunkauniverse||[]).push([[822],{9822:function(e,n,t){t.r(n);var a,s=t(168),i=t(3433),c=t(9439),o=t(2791),r=t(7849),l=t(953),u=t(6444),d=t(1087),g=t(184),h=u.ZP.div(a||(a=(0,s.Z)(["\n    padding: 10px 0 40px 0;\n    box-sizing: border-box;\n    min-height: calc(100vh - 61px);\n    position: relative;\n    background-color: black;\n    display: flex;\n    flex-direction: column;\n    align-items: space-between;\n    gap: 20px;\n\n    @media screen and (min-width: 1200px){\n        padding: 40px 0;\n    }\n"])));n.default=function(){var e=(0,o.useState)([]),n=(0,c.Z)(e,2),t=n[0],a=n[1],s=(0,o.useState)(0),u=(0,c.Z)(s,2),p=u[0],x=u[1],f=(0,o.useState)(!0),m=(0,c.Z)(f,2),b=m[0],j=m[1],v=(0,o.useState)(!1),w=(0,c.Z)(v,2),Z=w[0],k=w[1],N=(0,d.lr)(),S=(0,c.Z)(N,2),y=S[0],P=S[1],q=(0,o.useMemo)((function(){return Object.fromEntries((0,i.Z)(y))}),[y]),z=q.ordering,C=void 0===z?null:z,E=q.query,F=q.genre,M=void 0===F?null:F,I=q.page;(0,o.useEffect)((function(){j(!0),(0,r.Mn)(E,I,C,M).then((function(e){var n=e.data,t=n.results,s=n.count;a(t.filter((function(e){return"atomic-heart"!==e.slug}))),x(s/20),j(!1)})).catch((function(e){console.log(e),k(!0),j(!1)}))}),[I,E,C,M,y]);return(0,g.jsx)(h,{children:Z?(0,g.jsx)(l.qz,{}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.UI,{className:"catalog"}),b?(0,g.jsx)(l.aN,{className:"loader-catalog",color:"white"}):0!==t.length?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.bs,{games:t}),(0,g.jsx)(l.tl,{totalPages:p<=500?p:500,changePage:function(e){P({page:e+1}),j(!0),window.scroll({top:0})},page:I})]}):(0,g.jsx)("h1",{style:{color:"white"},children:"No matches"})]})})}}}]);
//# sourceMappingURL=822.283376be.chunk.js.map