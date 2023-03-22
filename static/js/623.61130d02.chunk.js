"use strict";(self.webpackChunkauniverse=self.webpackChunkauniverse||[]).push([[623],{9421:function(n,e,t){t.d(e,{q:function(){return c}});var i,o,r,a=t(168),s=t.p+"static/media/mario.4720f70d76cb3c5f1700.png",l=t(6444),d=t(184),c=function(){return(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Something went wrong..."}),(0,d.jsx)(u,{src:s,alt:"Mario thinking what happend"})]})},p=l.ZP.div(i||(i=(0,a.Z)(["\n    margin: auto;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n\n    @media screen and (min-width: 1200px) {\n        flex-direction: row;\n    }\n"]))),x=l.ZP.p(o||(o=(0,a.Z)(["\n    font-family: 'Nunito', sans-serif;\n    font-size: 40px;\n    max-width: 700px;\n    text-align: center;\n    color: white;\n"]))),u=l.ZP.img(r||(r=(0,a.Z)(["\n    width: 80vw;\n\n    @media screen and (min-width: 320px){\n        width: 200px\n    }\n\n    @media screen and (min-width: 768px){\n        width: 300px\n    }\n"])))},854:function(n,e,t){t.d(e,{a:function(){return c}});var i,o,r,a=t(168),s=t(5243),l=t(6444),d=t(184),c=function(n){var e=n.className,t=n.color;return(0,d.jsx)(p,{render:e,children:(0,d.jsx)(s.C,{backgroundColor:t,ballColors:["orange","darkblue","red"]})})},p=l.ZP.div(i||(i=(0,a.Z)(["\n    ","\n"])),(function(n){return"loader-homepage"===n.render?(0,l.iv)(o||(o=(0,a.Z)(["\n                margin-left: 60px;\n            "]))):(0,l.iv)(r||(r=(0,a.Z)(["\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translateX(-50%)\n            "])))}))},5553:function(n,e,t){t.d(e,{P:function(){return F}});var i,o,r,a,s,l,d,c,p,x,u,h=t(168),g=t(9439),f=t(2791),m=t(7689),b=t(2666),v=t(2541),j=t(5243),w=t(1213),Z=t(9126),y=t(3853),k=t(6856),P=t(6444),C=t(9085),z=t(184),F=function(n){var e=n.avatar,t=n.username,i=n.isAvatarLoading,o=n.setPhotoPath,r=n.setIsAvatarLoading,a=n.setUsername,s=n.isPendingFriend,l=n.isFriend,d=n.setIsPendingFriend,c=n.setIsFriend,p=(0,f.useContext)(b.g).userId,x=(0,m.UO)().id,u=(0,m.TH)(),h=(0,f.useState)(!1),P=(0,g.Z)(h,2),F=P[0],T=P[1];return(0,z.jsxs)(S,{children:[(0,z.jsxs)(O,{children:[u.pathname.includes("profile")?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(N,{id:"upload_file",accept:".png, .jpg, .jpeg, .gif",type:"file",name:"photo",onChange:function(n){return function(n){var e=n.target.files[0];if(n.preventDefault(),e){if(e.size>2097152)return C.Am.info("Maximum size: 2 MB",{position:"top-left",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,draggable:!0,theme:"dark"}),void r(!1);r(!0),(0,v.t9)(e,p,o,r)}}(n)}}),(0,z.jsx)(B,{htmlFor:"upload_file",children:(0,z.jsx)(w.vDL,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})})]}):s||l?s?(0,z.jsx)(U,{children:"You sent an invitation"}):(0,z.jsx)(M,{onClick:function(){(0,v.tJ)(x,p),c(!1)},children:(0,z.jsx)(y.pBC,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})}):(0,z.jsx)(M,{type:"button",onClick:function(){(0,v.ol)(x,p),d(!0)},children:(0,z.jsx)(y.zy7,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})}),i?(0,z.jsx)(L,{children:(0,z.jsx)(j.iT,{color:"#FF6600",secondaryColor:"orange",width:"100%",height:"100%"})}):(0,z.jsx)(A,{src:"".concat(e),alt:"".concat(t,"'s avatar")})]}),(0,z.jsxs)("div",{style:{display:"flex",gap:5,alignItems:"center",justifyContent:"center",flexWrap:"wrap"},children:[!F&&(0,z.jsx)(I,{children:t}),u.pathname.includes("profile")&&!F&&(0,z.jsx)(q,{onClick:function(){return T(!0)},children:(0,z.jsx)(Z.hFq,{color:"white"})})]}),F&&(0,z.jsxs)(D,{onSubmit:function(n){return function(n){n.preventDefault();var e=n.target.elements.username.value;(0,v.JC)(p,e),a(e),T(!1)}(n)},children:[(0,z.jsx)("input",{type:"text",name:"username",minLength:"3",required:!0,autoComplete:"off"}),(0,z.jsx)("button",{children:(0,z.jsx)(k.vB0,{size:15})})]})]})},S=P.ZP.div(i||(i=(0,h.Z)(["\n    margin-bottom: 20px;\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n\n    gap: 10px;\n\n    @media screen and (min-width: 1200px) {\n        margin-left: auto;\n        margin-right: auto\n    }\n    \n"]))),I=P.ZP.h1(o||(o=(0,h.Z)(["\n    text-align: center\n"]))),L=P.ZP.div(r||(r=(0,h.Z)(["\n    width: 90%;\n    height: 90%;\n    text-align: center;\n    \n"]))),O=P.ZP.div(a||(a=(0,h.Z)(["\n    height: 200px;\n    width: 200px;\n    border-radius: 100px;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n\n    overflow: hidden;\n    \n    background-color: transparent;\n\n"]))),U=P.ZP.p(s||(s=(0,h.Z)(["\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    transition: 250ms opacity ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),O),A=P.ZP.img(l||(l=(0,h.Z)(["\nwidth: 200px;\nheight: 100%;\nobject-fit: cover;\n\ntransition: 250ms filter ease;\n    ",":hover &{\n        filter: blur(3px)\n    }\n"])),O),B=P.ZP.label(d||(d=(0,h.Z)(["\n    width: 30px;\n    height: 30px;\n    padding: 5px;\n    border: none;\n    border-radius: 100px;\n\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    \n    background-color: white;\n    cursor: pointer;\n    transition: 250ms all ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),O),N=P.ZP.input(c||(c=(0,h.Z)(["\n    width: 0.1px;\n    height: 0.1px;\n    position: absolute;\n    z-index: -1;\n    opacity: 0;\n    overflow: hidden;\n"]))),q=P.ZP.button(p||(p=(0,h.Z)(["\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n"]))),D=P.ZP.form(x||(x=(0,h.Z)(["\n    height: 30px;\n    display: flex;\n    & input{\n        height: 100%;\n        padding: 0 15px;\n        width: 200px;\n        border-radius: 15px;\n        background-color: white;\n        border: 1px solid orange;\n        margin-right: 5px\n    }\n\n    & button{\n        height: 100%;\n        width: 30px;\n        border-radius: 15px;\n        border: 1px solid green;\n        background-color: white;\n        display: flex;\n        align-items: center;\n        justify-content: center\n    }\n"]))),M=P.ZP.button(u||(u=(0,h.Z)(["\n    width: 40px;\n    height: 40px;\n    padding: 5px;\n    border: none;\n\n    position: absolute;\n    z-index: 1111;\n    opacity: 0;\n    \n    background-color: white;\n   \n    border-radius: 100px;\n    cursor: pointer;\n    \n    transition: 250ms all ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),O)},8900:function(n,e,t){t.r(e);var i,o,r,a,s,l,d=t(168),c=t(3433),p=t(9439),x=t(2791),u=t(7689),h=t(1087),g=t(6189),f=t(2541),m=t(854),b=t(5553),v=t(828),j=t(2666),w=t(6444),Z=t(9198),y=t(9421),k=t(184),P=w.ZP.span(i||(i=(0,d.Z)(["\n    width: 15px;\n    height: 15px;\n    border-radius: 8px;\n\n    position: absolute;\n    top: 0;\n    right: -15px;\n\n    font-size: 14px;\n    text-align: center;\n    vertical-align: center;\n\n    background-color: green;\n    \n"]))),C=w.ZP.div(o||(o=(0,d.Z)(["\n    width: 100%;\n    min-height: calc(100vh - 61px);\n    padding: 20px;\n    box-sizing: border-box;\n    \n    position: relative;\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    \n    color: white;\n    \n    background-color: #00021A;\n\n    @media screen and (min-width: 1200px) {\n        flex-direction: row;\n        align-items: flex-start;\n    }\n"]))),z=w.ZP.div(r||(r=(0,d.Z)(["\n    width: 100%;\n\n    @media screen and (min-width: 1200px) {\n        margin-left: auto;\n    }\n\n     @media screen and (min-width: 768px) {\n        width: 50%;\n    }\n"]))),F=w.ZP.button(a||(a=(0,d.Z)(["\n    position: absolute;\n    top: 0;\n    right: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    color: white;\n\n        font-family: 'Nunito', sans-serif;\n        width: fit-content;\n        box-sizing: border-box;\n        padding: 10px;\n        background-color: #080D2B;\n        font-size: 20px;\n        background-color: orange;\n        box-shadow: red 2px 3px;\n        transition: 100ms all linear;\n\n        &:hover {\n            box-shadow: red 4px 5px;\n            transform: scale(1.05);\n            background-color: white;\n            color: orange\n        }\n\n        &::before {\n            content: '';\n            width: 20px;\n            height: 20px;\n\n            position: absolute;\n            top: 0px;\n            right: 0px;\n            \n            background-color: transparent;\n            border-top: 2px solid orange;\n            border-right: 2px solid orange;\n            \n            transition: 100ms all linear;\n        }\n\n        &::after{\n            content: '';\n            height: 20px;\n            width: 20px;\n            position: absolute;\n            bottom: 0px;\n            left: 0px;\n\n            background-color: transparent;\n            border-bottom: 2px solid orange;\n            border-left: 2px solid orange;\n        \n            transition: 100ms all linear;\n        }\n\n        &:hover::after{\n            bottom: -15px;\n            left: -13px;\n        }\n\n        &:hover::before {\n            top: -13px;\n            right: -15px;\n        }\n"]))),S=w.ZP.div(s||(s=(0,d.Z)(["\n    margin-bottom: 20px;\n    margin-left: auto;\n    display: flex;\n    justify-content: center;\n    flex-wrap: wrap;\n    gap: 0 40px;\n    \n"]))),I=(0,w.ZP)(h.OL)(l||(l=(0,d.Z)(["\n    display: block;\n    padding: 10px 0;\n    border: none;\n\n    font-family: 'Nunito', sans-serif;\n    font-size: 20px;\n    font-weight: 500;\n    \n    \n    position: relative;\n    background-color: transparent;\n    cursor: pointer;\n    color: white;\n\n    &.active::after{\n        content: '';\n        display: block;\n        height: 3px;\n        width: 100%;\n        border-radius: 4px;\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        \n        background-color: #FF6600;\n    }\n"])));e.default=function(){var n=(0,x.useContext)(j.g),e=n.userId,t=n.isLoggedIn,i=n.setUserId,o=(0,x.useState)([]),r=(0,p.Z)(o,2),a=r[0],s=r[1],l=(0,x.useState)([]),d=(0,p.Z)(l,2),h=d[0],w=d[1],L=(0,x.useState)(""),O=(0,p.Z)(L,2),U=O[0],A=O[1],B=(0,x.useState)([]),N=(0,p.Z)(B,2),q=N[0],D=N[1],M=(0,x.useState)(),T=(0,p.Z)(M,2),X=T[0],J=T[1],W=(0,x.useState)(!0),_=(0,p.Z)(W,2),E=_[0],G=_[1],H=(0,x.useState)(!1),Y=(0,p.Z)(H,2),$=Y[0],K=Y[1],Q=(0,x.useState)(!1),R=(0,p.Z)(Q,2),V=R[0],nn=R[1],en=(0,u.s0)();(0,x.useEffect)((function(){t?Promise.all([(0,f.bG)(e),(0,f.Nx)(e),(0,f.XP)(e),(0,f.MO)(e)]).then((function(n){var e=(0,p.Z)(n,4),t=e[0],i=e[1],o=e[2],r=e[3];if(t.exists()){var a=t.val(),l=a.username,d=a.photoUrl;A(l),J(d||g)}else A("User");i.val()&&w((0,c.Z)(Object.values(i.val()))),o.val()&&s(Object.values(o.val())),r.val()&&D(Object.values(r.val())),G(!1)})).catch((function(n){console.error(n),nn(!0),G(!1)})):en("/login/login-page")}),[t,en,s,e]);return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(C,{children:(0,k.jsx)(Z.W,{children:E?(0,k.jsx)(m.a,{className:"loader-profile",color:"white"}):V?(0,k.jsx)(y.q,{}):(0,k.jsx)(k.Fragment,{children:(0,k.jsxs)(C,{children:[(0,k.jsx)(b.P,{setPhotoPath:J,avatar:X,username:U,isAvatarLoading:$,setIsAvatarLoading:K,setUsername:A}),(0,k.jsxs)(z,{children:[(0,k.jsxs)(S,{children:[(0,k.jsx)(I,{to:"bookmarks",children:"Bookmarks"}),(0,k.jsxs)(I,{to:"friends",children:["Friends ",q.length>0&&(0,k.jsx)(P,{children:q.length})]})]}),(0,k.jsx)(u.j3,{context:[h,a,s,q,D]})]}),(0,k.jsx)(F,{type:"button",onClick:function(){(0,f.UX)().then((function(){en("/login/login-page"),i("")}))},children:(0,k.jsx)(v.T$9,{})})]})})})})})}}}]);
//# sourceMappingURL=623.61130d02.chunk.js.map