"use strict";(self.webpackChunkauniverse=self.webpackChunkauniverse||[]).push([[22],{9421:function(n,e,t){t.d(e,{q:function(){return c}});var i,r,o,a=t(168),s=t.p+"static/media/mario.4720f70d76cb3c5f1700.png",l=t(6444),d=t(184),c=function(){return(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:"Something went wrong..."}),(0,d.jsx)(x,{src:s,alt:"Mario thinking what happend"})]})},p=l.ZP.div(i||(i=(0,a.Z)(["\n    margin: auto;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n\n    @media screen and (min-width: 1200px) {\n        flex-direction: row;\n    }\n"]))),u=l.ZP.p(r||(r=(0,a.Z)(["\n    font-family: 'Nunito', sans-serif;\n    font-size: 40px;\n    max-width: 700px;\n    text-align: center;\n    color: white;\n"]))),x=l.ZP.img(o||(o=(0,a.Z)(["\n    width: 80vw;\n\n    @media screen and (min-width: 320px){\n        width: 200px\n    }\n\n    @media screen and (min-width: 768px){\n        width: 300px\n    }\n"])))},854:function(n,e,t){t.d(e,{a:function(){return c}});var i,r,o,a=t(168),s=t(5243),l=t(6444),d=t(184),c=function(n){var e=n.className,t=n.color;return(0,d.jsx)(p,{render:e,children:(0,d.jsx)(s.C,{backgroundColor:t,ballColors:["orange","darkblue","red"]})})},p=l.ZP.div(i||(i=(0,a.Z)(["\n    ","\n"])),(function(n){return"loader-homepage"===n.render?(0,l.iv)(r||(r=(0,a.Z)(["\n                margin-left: 60px;\n            "]))):(0,l.iv)(o||(o=(0,a.Z)(["\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translateX(-50%)\n            "])))}))},5553:function(n,e,t){t.d(e,{P:function(){return I}});var i,r,o,a,s,l,d,c,p,u,x,h,f=t(168),g=t(9439),m=t(2791),v=t(7689),b=t(2666),Z=t(2541),j=t(5243),w=t(1213),y=t(9126),k=t(3853),P=t(6856),C=t(6444),F=t(9085),z=t(184),I=function(n){var e=n.avatar,t=n.username,i=n.isAvatarLoading,r=n.setPhotoPath,o=n.setIsAvatarLoading,a=n.setUsername,s=n.isFriendInvited,l=n.isFriend,d=n.setIsFriendInvited,c=n.setIsFriend,p=(0,m.useContext)(b.g).userId,u=(0,v.UO)().id,x=(0,v.TH)(),h=(0,m.useState)(!1),f=(0,g.Z)(h,2),C=f[0],I=f[1];return(0,z.jsxs)(S,{children:[(0,z.jsxs)(L,{children:[x.pathname.includes("profile")?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(q,{id:"upload_file",accept:".png, .jpg, .jpeg, .gif",type:"file",name:"photo",onChange:function(n){return function(n){var e=n.target.files[0];if(n.preventDefault(),e){if(e.size>2097152)return F.Am.info("Maximum size: 2 MB",{position:"top-left",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,draggable:!0,theme:"dark"}),void o(!1);o(!0),(0,Z.t9)(e,p,r,o)}}(n)}}),(0,z.jsx)(U,{htmlFor:"upload_file",children:(0,z.jsx)(w.vDL,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})})]}):s||l?s?(0,z.jsx)(M,{children:"You sent an invitation"}):(0,z.jsx)(_,{onClick:function(){(0,Z.tJ)(u,p),c(!1)},children:(0,z.jsx)(k.pBC,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})}):(0,z.jsx)(_,{type:"button",onClick:function(){(0,Z.ol)(u,p),d(!0)},children:(0,z.jsx)(k.zy7,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})}),i?(0,z.jsx)(B,{children:(0,z.jsx)(j.iT,{color:"#FF6600",secondaryColor:"orange",width:"100%",height:"100%"})}):(0,z.jsx)(N,{src:"".concat(e),alt:"".concat(t,"'s avatar")})]}),(0,z.jsxs)(A,{children:[!C&&(0,z.jsx)(O,{children:t}),x.pathname.includes("profile")&&!C&&(0,z.jsx)(D,{onClick:function(){return I(!0)},children:(0,z.jsx)(y.HlX,{color:"white",size:20})})]}),C&&(0,z.jsxs)(X,{onSubmit:function(n){return function(n){n.preventDefault();var e=n.target.elements.username.value;(0,Z.JC)(p,e),a(e),I(!1)}(n)},children:[(0,z.jsx)("input",{type:"text",name:"username",minLength:"3",required:!0,autoComplete:"off"}),(0,z.jsx)("button",{children:(0,z.jsx)(P.vB0,{size:15})})]})]})},S=C.ZP.div(i||(i=(0,f.Z)(["\n    margin-bottom: 20px;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n\n    gap: 10px;\n\n    @media screen and (min-width: 1200px) {\n        margin-left: auto;\n        margin-right: auto\n    }\n    \n"]))),O=C.ZP.h1(r||(r=(0,f.Z)(["\n    text-align: center\n"]))),B=C.ZP.div(o||(o=(0,f.Z)(["\n    width: 90%;\n    height: 90%;\n    text-align: center;\n    \n"]))),L=C.ZP.div(a||(a=(0,f.Z)(["\n    height: 200px;\n    width: 200px;\n    border-radius: 100px;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n\n    overflow: hidden;\n    \n    background-color: transparent;\n\n"]))),A=C.ZP.div(s||(s=(0,f.Z)(["\n    display: flex; \n    gap: 5px;\n    align-items: baseline; \n    justify-content: center; \n    flex-wrap: wrap;\n"]))),M=C.ZP.p(l||(l=(0,f.Z)(["\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    transition: 250ms opacity ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),L),N=C.ZP.img(d||(d=(0,f.Z)(["\nwidth: 200px;\nheight: 100%;\nobject-fit: cover;\n\ntransition: 250ms filter ease;\n    ",":hover &{\n        filter: blur(3px)\n    }\n"])),L),U=C.ZP.label(c||(c=(0,f.Z)(["\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    border: none;\n    border-radius: 100px;\n\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    \n    background-color: white;\n    cursor: pointer;\n    transition: 250ms all ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),L),q=C.ZP.input(p||(p=(0,f.Z)(["\n    width: 0.1px;\n    height: 0.1px;\n    position: absolute;\n    z-index: -1;\n    opacity: 0;\n    overflow: hidden;\n"]))),D=C.ZP.button(u||(u=(0,f.Z)(["\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n    height: 100%;\n"]))),X=C.ZP.form(x||(x=(0,f.Z)(["\n    height: 30px;\n    display: flex;\n    & input{\n        height: 100%;\n        padding: 0 15px;\n        width: 200px;\n        border-radius: 15px;\n        background-color: white;\n        border: 1px solid orange;\n        margin-right: 5px\n    }\n\n    & button{\n        height: 100%;\n        width: 30px;\n        border-radius: 15px;\n        border: 1px solid green;\n        background-color: white;\n        display: flex;\n        align-items: center;\n        justify-content: center\n    }\n"]))),_=C.ZP.button(h||(h=(0,f.Z)(["\n    width: 40px;\n    height: 40px;\n    padding: 5px;\n    border: none;\n\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    \n    background-color: white;\n   \n    border-radius: 100px;\n    cursor: pointer;\n    \n    transition: 250ms all ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),L)},7260:function(n,e,t){t.r(e);var i,r,o,a,s=t(168),l=t(9439),d=t(2791),c=t(7689),p=t(2541),u=t(1087),x=t(2666),h=t(6444),f=t(5553),g=t(6189),m=t(854),v=t(9421),b=t(184),Z=h.ZP.div(i||(i=(0,s.Z)(["\n    min-height: calc(100vh - 61px);\n    width: 100%;\n    padding: 20px;\n    box-sizing: border-box;\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    position: relative;\n\n    color: white;\n    background-color: #00021A;\n\n    \n    @media screen and (min-width: 1200px) {\n        flex-direction: row;\n        align-items: flex-start;\n    }\n"]))),j=h.ZP.div(r||(r=(0,s.Z)(["\n    width: 100%;\n   \n    @media screen and (min-width: 768px) {\n        width: 50%;\n    }\n\n    @media screen and (min-width: 1200px) {\n        margin-left: auto;\n    }\n"]))),w=h.ZP.div(o||(o=(0,s.Z)(["\n    margin-bottom: 20px;\n    margin-left: auto;\n\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n\n    & :not(:last-child) {\n        margin-right: 100px;\n    }\n"]))),y=(0,h.ZP)(u.OL)(a||(a=(0,s.Z)(["\n    color: #090E2F;\n    font-weight: 500;\n    padding: 10px 0;\n    background-color: transparent;\n    font-family: 'Nunito', sans-serif;\n    font-size: 20px;\n    cursor: pointer;\n    color: white;\n    border: none;\n    position: relative;\n    display: block;\n\n    &.active::after{\n        content: '';\n        display: block;\n        height: 3px;\n        width: 100%;\n        border-radius: 4px;\n\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        background-color: #FF6600;\n    }\n"])));e.default=function(){var n=(0,d.useContext)(x.g).userId,e=(0,c.UO)().id,t=(0,d.useState)(""),i=(0,l.Z)(t,2),r=i[0],o=i[1],a=(0,d.useState)(""),s=(0,l.Z)(a,2),u=s[0],h=s[1],k=(0,d.useState)([]),P=(0,l.Z)(k,2),C=P[0],F=P[1],z=(0,d.useState)(!1),I=(0,l.Z)(z,2),S=I[0],O=I[1],B=(0,d.useState)(!1),L=(0,l.Z)(B,2),A=L[0],M=L[1],N=(0,d.useState)(!1),U=(0,l.Z)(N,2),q=U[0],D=U[1],X=(0,d.useState)(!1),_=(0,l.Z)(X,2),E=_[0],H=_[1],J=(0,c.s0)();return n===e&&J("/profile/bookmarks"),(0,d.useEffect)((function(){D(!0),Promise.all([(0,p.bG)(e),(0,p.MO)(e),(0,p.XP)(n)]).then((function(t){var i=(0,l.Z)(t,3),r=i[0],a=i[1],s=i[2],d=r.val(),c=d.username,p=d.favs,u=d.photoUrl;o(c),p&&F(Object.values(p)),h(u||g),a.val()&&O(Object.values(a.val()).some((function(e){return e===n}))),s.val()&&M(Object.values(s.val()).some((function(n){return n===e}))),D(!1)})).catch((function(n){console.log(n),H(!0),D(!1)}))}),[e,O,n]),(0,b.jsx)(Z,{children:q?(0,b.jsx)(m.a,{className:"loader_profile",color:"white"}):E?(0,b.jsx)(v.q,{}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f.P,{avatar:u,username:r,isFriendInvited:S,isFriend:A,setIsFriendInvited:O,setIsFriend:M}),(0,b.jsxs)(j,{children:[(0,b.jsx)(w,{children:(0,b.jsx)(y,{to:"bookmarks",children:"Bookmarks"})}),(0,b.jsx)(c.j3,{context:[C]})]})]})})}}}]);
//# sourceMappingURL=22.21d3114c.chunk.js.map