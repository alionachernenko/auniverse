"use strict";(self.webpackChunkauniverse=self.webpackChunkauniverse||[]).push([[878],{2760:function(n,e,t){t.d(e,{y:function(){return l}});var a=t(7689),r=t(1087),i=t(7692),s=t.p+"static/media/placeholder.666cded1451713a84026.png",o=t(184),l=function(n){var e=n.data,t=(n.width,n.className),l=(0,a.TH)(),c=e.name,d=e.released,u=e.genres,p=e.background_image,g=e.slug,h=e.rating;return console.log(h),console.log(e),(0,o.jsx)(r.rU,{to:"/catalog/".concat(g),"aria-label":"Read more about ".concat(c),className:"readmore-btn",children:(0,o.jsxs)("div",{className:"".concat(t),children:[p?(0,o.jsx)("img",{loading:"lazy",src:p,className:"poster",alt:"",width:"500",height:"auto"}):(0,o.jsx)("img",{src:s,alt:"",className:"poster"}),(0,o.jsxs)("div",{className:"description",children:[(0,o.jsx)("p",{className:"title",children:c}),d&&(0,o.jsx)("p",{className:"release_year",children:d.slice(0,4)}),u&&(0,o.jsx)("ul",{className:"genres",children:u.map((function(n){return(0,o.jsx)("li",{className:"genres_item",children:n.name},n.id)}))})]}),(0,o.jsxs)("div",{className:"desc",children:[c&&(0,o.jsx)("h1",{children:c}),u&&(0,o.jsx)("ul",{className:"genres",children:u.map((function(n){return(0,o.jsx)("li",{className:"genres_item",children:n.name},n.id)}))})]}),(0,o.jsxs)("div",{className:"readmore-btn",children:[(0,o.jsx)("p",{children:"Read more"}),(0,o.jsx)(i.U6L,{color:"green",title:"Read more button right arrow"})]}),"/catalog"===l.pathname&&(0,o.jsx)("p",{className:"rating",children:h})]})})}},2537:function(n,e,t){t.d(e,{b:function(){return d}});var a,r,i=t(168),s=t(2760),o=t(6444),l=t(9198),c=t(184),d=function(n){var e=n.games;return(0,c.jsx)(l.W,{children:(0,c.jsx)(u,{children:e.map((function(n){return(0,c.jsx)(p,{children:(0,c.jsx)(s.y,{data:n,width:500,className:"gamecard_catalog"})},n.id)}))})})},u=o.ZP.ul(a||(a=(0,i.Z)(["\n    // margin-bottom: 20px;\n    // align-items: center;\n    // justify-content: center;\n    // display: grid;\n    // grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));\n    // grid-gap: 1em;\n    // margin-top: 0;\n    // margin-bottom: 0;\n    // padding: 0;\n\n    display: flex;\n    flex-wrap: wrap;\n    gap: 30px;\n    padding: 0 20px;\n}\n"]))),p=o.ZP.li(r||(r=(0,i.Z)(["\n    width: 100%;\n\n    @media screen and (min-width: 768px) {\n        width: calc((100% - 30px)/2);\n    }\n\n    @media screen and (min-width: 1440px) {\n        width: calc((100% - 90px)/4);\n    }\n\n    \n"])))},854:function(n,e,t){t.d(e,{a:function(){return d}});var a,r,i,s=t(168),o=t(5243),l=t(6444),c=t(184),d=function(n){var e=n.className,t=n.color;return(0,c.jsx)(u,{render:e,children:(0,c.jsx)(o.C,{backgroundColor:t,ballColors:["orange","darkblue","red"]})})},u=l.ZP.div(a||(a=(0,s.Z)(["\n    ","\n"])),(function(n){return"loader-homepage"===n.render?(0,l.iv)(r||(r=(0,s.Z)(["\n                margin-left: 60px;\n            "]))):(0,l.iv)(i||(i=(0,s.Z)(["\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translateX(-50%)\n            "])))}))},5553:function(n,e,t){t.d(e,{P:function(){return P}});var a,r,i,s,o,l,c,d,u=t(168),p=t(9439),g=t(6444),h=t(1213),x=t(5243),m=t(2666),f=t(2791),j=t(276),b=t(2685),v=t(5353),Z=t(7689),w=t(9126),y=t(6856),N=t(184),P=function(n){var e=n.avatar,t=n.username,a=n.isAvatarLoading,r=n.setPhotoPath,i=n.setIsAvatarLoading,s=n.setUsername,o=(0,f.useContext)(m.Z).userId,l=(0,Z.TH)(),c=(0,f.useState)(!1),d=(0,p.Z)(c,2),u=d[0],g=d[1];return(0,N.jsxs)(k,{children:[(0,N.jsxs)(F,{children:["/profile"===l.pathname&&(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(z,{id:"upload_file",accept:".png, .jpg, .jpeg, .gif",type:"file",name:"photo",onChange:function(n){if(n.preventDefault(),n.target.files[0]){if(n.target.files[0].size>2097152)return console.log("noooooJJFJFJJFJFJ"),void i(!1);i(!0),(0,j.KV)((0,j.iH)(v.Z.storage,"/userpics/".concat(n.target.files[0].name)),n.target.files[0]).then((function(){return(0,j.Jt)((0,j.iH)(v.Z.storage,"/userpics/".concat(n.target.files[0].name)))})).then((function(n){console.log(n),(0,b.t8)((0,b.iH)(v.Z.database,"users/"+o+"/photoUrl"),n),r(n),i(!1)}))}}}),(0,N.jsx)(U,{htmlFor:"upload_file",children:(0,N.jsx)(h.vDL,{size:"100%",fill:"orange",color:"orange",stroke:"orange"})})]}),a?(0,N.jsx)(C,{children:(0,N.jsx)(x.iT,{color:"#FF6600",secondaryColor:"orange",width:"100%",height:"100%"})}):(0,N.jsx)(L,{style:{objectFit:"cover",width:200,height:"100%"},src:"".concat(e),alt:""})]}),(0,N.jsxs)("div",{style:{display:"flex",gap:5,alignItems:"center",justifyContent:"center",flexWrap:"wrap"},children:[!u&&(0,N.jsx)("h1",{children:t}),"/profile"===l.pathname&&!u&&(0,N.jsx)(J,{onClick:function(){return g(!0)},children:(0,N.jsx)(w.hFq,{})})]}),u&&(0,N.jsxs)(I,{action:"",onSubmit:function(n){n.preventDefault(),(0,b.t8)((0,b.iH)(v.Z.database,"users/"+o+"/username"),n.target.elements.username.value),s(n.target.elements.username.value),g(!1)},children:[(0,N.jsx)("input",{type:"text",name:"username",minLength:"3",required:!0,autoComplete:"off"}),(0,N.jsx)("button",{children:(0,N.jsx)(y.vB0,{size:15})})]})]})},k=g.ZP.div(a||(a=(0,u.Z)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 10px;\n    margin-bottom: 20px\n"]))),C=g.ZP.div(r||(r=(0,u.Z)(["\n    text-align: center;\n    width: 90%;\n    height: 90%\n"]))),F=g.ZP.div(i||(i=(0,u.Z)(["\n    border-radius: 100px;\n    height: 200px;\n    width: 200px;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    background-color: transparent;\n\n"]))),L=g.ZP.img(s||(s=(0,u.Z)(["\ntransition: 250ms filter ease;\n\n    ",":hover &{\n        filter: blur(3px)\n    }\n"])),F),U=g.ZP.label(o||(o=(0,u.Z)(["\n    border: none;\n    position: absolute;\n    opacity: 0;\n    width: 30px;\n    height: 30px;\n    background-color: white;\n    padding: 5px;\n    border-radius: 100px;\n    cursor: pointer;\n    z-index: 1111;\n    transition: 250ms all ease;\n\n    ",":hover &{\n        opacity: 1\n    }\n"])),F),z=g.ZP.input(l||(l=(0,u.Z)(["\n    width: 0.1px;\n    height: 0.1px;\n    opacity: 0;\n    overflow: hidden;\n    position: absolute;\n    z-index: -1;\n"]))),J=g.ZP.button(c||(c=(0,u.Z)(["\n    background-color: transparent;\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center\n"]))),I=g.ZP.form(d||(d=(0,u.Z)(["\n    height: 30px;\n    display: flex;\n    & input{\n        height: 100%;\n        padding: 0 15px;\n        width: 200px;\n        border-radius: 15px;\n        background-color: white;\n        border: 1px solid orange;\n        margin-right: 5px\n    }\n\n    & button{\n        height: 100%;\n        width: 30px;\n        border-radius: 15px;\n        border: 1px solid green;\n        background-color: white;\n        display: flex;\n        align-items: center;\n        justify-content: center\n    }\n"])))},1409:function(n,e,t){t.r(e);var a,r,i=t(168),s=t(3433),o=t(9439),l=t(2791),c=t(7689),d=t(2666),u=t(6189),p=t(1659),g=t(854),h=t(2537),x=t(5553),m=t(6444),f=t(184),j=m.ZP.div(a||(a=(0,i.Z)(["\n    padding: 20px 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    box-sizing: border-box;\n    position: relative;\n    min-height: calc(100vh - 61px);\n    width: 100%;\n"]))),b=m.ZP.button(r||(r=(0,i.Z)(["\n    color: white;\n    background-color: orange;\n    font-size: 20px;\n    font-family: 'Nunito', sans-serif;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 10px;\n"])));e.default=function(){var n=(0,l.useContext)(d.Z),e=n.userId,t=n.isLoggedIn,a=n.setUserId,r=(0,l.useState)([]),i=(0,o.Z)(r,2),m=i[0],v=i[1],Z=(0,l.useState)(""),w=(0,o.Z)(Z,2),y=w[0],N=w[1],P=(0,l.useState)(),k=(0,o.Z)(P,2),C=k[0],F=k[1],L=(0,l.useState)(!0),U=(0,o.Z)(L,2),z=U[0],J=U[1],I=(0,l.useState)(!1),S=(0,o.Z)(I,2),_=S[0],H=S[1],A=(0,c.s0)();(0,l.useEffect)((function(){t?Promise.all([(0,p.bG)(e),(0,p.Nx)(e)]).then((function(n){var e=(0,o.Z)(n,2),t=e[0],a=e[1];if(t.exists()){var r=t.val(),i=r.username,l=r.photoUrl;N(i),F(l||u)}else N("User");a.val()&&v((0,s.Z)(Object.values(a.val()))),J(!1)})).catch((function(n){console.error(n),J(!1)})):A("/login/login-page")}),[t,A,e]);return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(j,{children:z?(0,f.jsx)(g.a,{className:"loader-profile",color:"darkblue"}):(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(j,{className:"top",children:[(0,f.jsx)(x.P,{setPhotoPath:F,avatar:C,username:y,isAvatarLoading:_,setIsAvatarLoading:H,setUsername:N}),(0,f.jsx)(b,{type:"button",onClick:function(){(0,p.UX)().then((function(){A("/login/login-page"),a("")}))},children:"Log out"}),(0,f.jsx)("h2",{children:"Your favourite games:"}),(0,f.jsx)(h.b,{games:m})]})})})})}},6189:function(n,e,t){n.exports=t.p+"static/media/avatar-placeholder.78bbfd211b36ced81970.png"}}]);
//# sourceMappingURL=878.f3b2162e.chunk.js.map