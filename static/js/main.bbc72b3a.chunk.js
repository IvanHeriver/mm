(this.webpackJsonpmm=this.webpackJsonpmm||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),r=n(9),s=n.n(r),i=n(6),l=n(4),a=n(2),u=(n(14),function(e,t){for(var n=Array(e).fill(0),c=0;c<e;c++)n[c]=Math.floor(Math.random()*t)+1;return 0,n}),m=n(3),j=n(0),b=function(e){var t=e.color,n=e.nomargin,c=void 0!==n&&n,o="transparent"===t?"grey":"transparent";return Object(j.jsx)("button",{className:"one-color-btn",style:{backgroundColor:o,margin:c?"0":"2px"},children:"transparent"===t?null:Object(j.jsx)("img",{src:"/mm/"+t+"_pin.png",className:"one-color-img",draggable:"false"})})},d=function(e){var t=e.toGuess,n=e.colorOptions,o=e.onNewGame,r=e.onGiveUp,s=e.time,i=e.onOpenConfig,l=Object(c.useState)(!0),u=Object(a.a)(l,2),m=u[0],d=u[1];return Object(j.jsxs)("div",{className:"mm-toguess-container",children:[Object(j.jsxs)("div",{className:"one-color-row",children:[Object(j.jsx)("button",{onClick:function(){var e=document.querySelector(":root"),t=parseInt(window.getComputedStyle(e).getPropertyValue("--refwidth"));t>25&&t--,console.log(t),e.style.setProperty("--refwidth",t+"px")},children:Object(j.jsx)("img",{src:"/mm/zoomout_img.svg",className:"btn-img",draggable:"false"})}),Object(j.jsx)("button",{onClick:r,children:Object(j.jsx)("img",{src:"/mm/show_img.svg",className:"btn-img",draggable:"false"})}),Object(j.jsx)("button",{onClick:o,children:Object(j.jsx)("img",{src:"/mm/restart_img.svg",className:"btn-img",draggable:"false"})}),m?Object(j.jsx)("div",{className:"mm-timer",children:Object(j.jsx)("div",{children:function(e){var t=Math.floor(e/60),n=e-60*t;return t<10&&(t="0"+t),n<10&&(n="0"+n),t+":"+n}(s)})}):null,Object(j.jsx)("button",{onClick:function(){return d((function(e){return!e}))},children:Object(j.jsx)("img",{src:m?"/mm/notimer_img.svg":"/mm/timer_img.svg",className:"btn-img",draggable:"false"})}),Object(j.jsx)("button",{onClick:function(){return i()},children:Object(j.jsx)("img",{src:"/mm/config_img.svg",className:"btn-img",draggable:"false"})}),Object(j.jsx)("button",{onClick:function(){var e=document.querySelector(":root"),t=parseInt(window.getComputedStyle(e).getPropertyValue("--refwidth"));t<50&&t++,e.style.setProperty("--refwidth",t+"px")},children:Object(j.jsx)("img",{src:"/mm/zoomin_img.svg",className:"btn-img",draggable:"false"})})]}),Object(j.jsx)("div",{className:"one-color-row mm-rounded-border",children:t.map((function(e,t){return Object(j.jsx)(b,{color:n[e]},t)}))})]})},f=function(e){var t=e.colorOptions,n=e.color,c=e.setColor,o=e.clickMode;return void 0!==o&&o?Object(j.jsx)(g,{colorOptions:t,color:n,setColor:c}):Object(j.jsx)(O,{colorOptions:t,color:n,setColor:c})},g=function(e){var t,n=e.colorOptions,o=e.color,r=e.setColor,s=Object(c.useState)(!1),i=Object(a.a)(s,2),l=i[0],u=i[1];Object(c.useEffect)((function(){var e=function(e){u(!1)};return window.addEventListener("click",e),function(){window.removeEventListener("click",e)}}),[u]);return Object(j.jsxs)("div",{className:"mm-editable-color",onClick:function(e){if(console.log(l),l){console.log("here");var t=function(e){var t=document.elementFromPoint(e.clientX,e.clientY);return t&&t.parentElement.parentElement.getAttribute("idkey")?parseInt(t.parentElement.parentElement.getAttribute("idkey")):null}(e);console.log(t),t&&r(t),u(!1)}else setTimeout((function(){return u(!0)}),0)},children:[Object(j.jsx)(b,{color:n[o]}),l?Object(j.jsx)("div",{className:"mm-color-options",style:(t={},Object(m.a)(t,"--m",n.length-1),Object(m.a)(t,"--tan",.4),t),children:n.map((function(e,t){return 0===t?null:Object(j.jsx)("div",{idkey:t,style:Object(m.a)({},"--i",t+1),children:Object(j.jsx)(b,{color:e,nomargin:!0})},t)}))}):null]})},O=function(e){var t,n=e.colorOptions,o=e.color,r=e.setColor,s=Object(c.useState)(!1),i=Object(a.a)(s,2),l=i[0],u=i[1];Object(c.useEffect)((function(){var e=function(e){u(!1)};return window.addEventListener("mouseup",e),function(){window.removeEventListener("mouseup",e)}}),[u]);var d=function(e){var t=document.elementFromPoint(e.changedTouches[0].clientX,e.changedTouches[0].clientY);return t&&t.parentElement.parentElement.getAttribute("idkey")?parseInt(t.parentElement.parentElement.getAttribute("idkey")):null},f=function(e){var t=document.elementFromPoint(e.clientX,e.clientY);return t&&t.parentElement.parentElement.getAttribute("idkey")?parseInt(t.parentElement.parentElement.getAttribute("idkey")):null};return Object(j.jsxs)("div",{className:"mm-editable-color",onTouchStart:function(){u(!0)},onMouseDown:function(){u(!0)},onTouchMove:function(e){var t=d(e);t&&r(t)},onMouseMove:function(e){if(l){var t=f(e);t&&r(t)}},onTouchEnd:function(e){var t=d(e);t&&r(t),u(!1)},onMouseUp:function(e){var t=f(e);t&&r(t)},children:[Object(j.jsx)(b,{color:n[o]}),l?Object(j.jsx)("div",{className:"mm-color-options",style:(t={},Object(m.a)(t,"--m",n.length-1),Object(m.a)(t,"--tan",.4),t),children:n.map((function(e,t){return 0===t?null:Object(j.jsx)("div",{idkey:t,style:Object(m.a)({},"--i",t+1),children:Object(j.jsx)(b,{color:e,nomargin:!0})},t)}))}):null]})},h=function(e){var t=e.colorOptions,n=e.colors,o=e.setColors,r=e.onSubmit,s=e.clickSelectMode,i=void 0!==s&&s,u=Object(c.useState)(!1),m=Object(a.a)(u,2),b=m[0],d=m[1];Object(c.useEffect)((function(){d(n.map((function(e){return 0!=e})).reduce((function(e,t){return e&&t})))}),[n,d]);return Object(j.jsxs)("div",{className:"one-color-row",children:[Object(j.jsx)("div",{className:"mm-ingame-btns-right",children:Object(j.jsx)("button",{onClick:function(){r(n)},disabled:!b,children:Object(j.jsx)("img",{src:"/mm/play_img.svg",className:"btn-img",draggable:"false"})})}),Object(j.jsx)("div",{className:"mm-ingame-btns-left",children:Object(j.jsx)("button",{onClick:function(){o(Array(n.length).fill(0))},children:Object(j.jsx)("img",{src:"/mm/reset_img.svg",className:"btn-img",draggable:"false"})})}),n.map((function(e,c){return Object(j.jsx)(f,{colorOptions:t,color:e,setColor:function(e){var t=Object(l.a)(n);t[c]=e,o(t)},clickMode:i},c)}))]})},p=function(e){var t=e.type;return Object(j.jsx)("div",{className:"mm-res-pin "+t})},v=function(e){for(var t=e.gcgp,n=e.gcbp,c=[],o=0;o<t;o++)c.push("gcgp");for(var r=0;r<n;r++)c.push("gcbp");return Object(j.jsx)("div",{className:"mm-result",children:c.map((function(e,t){return Object(j.jsx)(p,{type:e},t)}))})},x=function(e){var t=e.colors,n=e.result,c=e.colorOptions,o=e.number;return Object(j.jsxs)("div",{className:"one-color-row",children:[Object(j.jsx)("div",{className:"mm-ingame-btns-right",children:Object(j.jsx)("div",{className:"mm-number",children:o})}),Object(j.jsx)(v,{gcgp:n.gcgp,gcbp:n.gcbp}),t.map((function(e,t){return Object(j.jsx)(b,{color:c[e]},t)}))]})},y=(n(16),n(17),function(e){var t=e.items,n=e.onChange,o=e.selected,r=void 0===o?null:o,s=e.multiselect,i=void 0!==s&&s,l=e.class_container,u=void 0===l?null:l,m=e.class_item,b=void 0===m?null:m,d=Object(c.useState)(function(e,t,n){var c=Array(e).fill(!1);if(null!==t){if(Array.isArray(t))!n&1!=t.length&&(t=[t[0]]);else{if(!Number.isInteger(t))throw"'selected' must be an integer of an array of integer";t=[t]}t.map((function(e,t){if(!Number.isInteger(e))throw"item "+t+" of 'selected' is not an integer";c[e]=!0}))}return c}(t.length,r,i)),f=Object(a.a)(d,2),g=f[0],O=f[1];Object(c.useEffect)((function(){if(console.log("Has changed: "+g),n){var e=[];g.map((function(t,n){t&&e.push(n)})),n(g,e)}}),[g]);return Object(j.jsx)("div",{className:"select-btn-container"+(u?" "+u:""),children:t.map((function(e,t){return Object(j.jsx)("button",{onClick:function(){return function(e){O((function(t){return t.map((function(t,n){return i||(t=!1),e===n?!t:t}))}))}(t)},className:b,isselected:g[t]?"true":"false",children:e},t)}))})}),C=(n(18),function(e){var t=e.onCloseConfig,n=e.nHoles,c=e.onNumberOfHolesChange,o=e.nColors,r=e.onNumberOfColorsChange,s=e.clickSelectMode,i=e.onSelectModeChange,l=[3,4,5,6,7,8],a=[3,4,5,6,7,8];return Object(j.jsxs)("div",{className:"mm-config",children:[Object(j.jsx)("button",{className:"mm-btn-close-config",onClick:function(){return t()},children:Object(j.jsx)("img",{src:"/mm/reset_img.svg",className:"btn-img",draggable:"false"})}),Object(j.jsxs)("section",{children:[Object(j.jsx)("h3",{children:"How do you want to select the colors?"}),Object(j.jsx)(y,{items:["Click and slide/drag","Click and click"].map((function(e){return Object(j.jsx)("p",{children:e})})),onChange:function(e,t){console.log(t),console.log(1===t[0]),i(1===t[0])},class_container:"slct-container",class_item:"slct-item",selected:s,multiselect:!1})]}),Object(j.jsxs)("section",{children:[Object(j.jsx)("h3",{children:"How many holes do you want ?"}),Object(j.jsx)("p",{children:"(will only take effect for the next game)"}),Object(j.jsx)(y,{items:l.map((function(e){return Object(j.jsx)("p",{children:e})})),onChange:function(e,t){c(l[t])},class_container:"slct-container",class_item:"slct-item",selected:l.indexOf(n),multiselect:!1})]}),Object(j.jsxs)("section",{children:[Object(j.jsx)("h3",{children:"How many colors do you want ?"}),Object(j.jsx)("p",{children:"(will only take effect for the next game)"}),Object(j.jsx)(y,{items:a.map((function(e){return Object(j.jsx)("p",{children:e})})),onChange:function(e,t){r(l[t])},class_container:"slct-container",class_item:"slct-item",selected:a.indexOf(o),multiselect:!1})]})]})}),N=["transparent","blue","green","yellow","red","black","white","violet","turquoise"],w=function(){var e=Object(c.useState)({holes:4,colors:6}),t=Object(a.a)(e,2),n=t[0],o=t[1],r=Object(c.useState)(N.slice(0,n.colors+1)),s=Object(a.a)(r,2),m=s[0],b=s[1];Object(c.useEffect)((function(){b(N.slice(0,n.colors+1))}),[n,b]);var f=Object(c.useState)(u(n.holes,n.colors)),g=Object(a.a)(f,2),O=g[0],p=g[1],v=Object(c.useState)(!1),y=Object(a.a)(v,2),w=y[0],k=y[1],S=Object(c.useState)([]),E=Object(a.a)(S,2),_=E[0],M=E[1],A=Object(c.useState)(Array(n.holes).fill(0)),I=Object(a.a)(A,2),H=I[0],P=I[1],G=Object(c.useState)(!1),T=Object(a.a)(G,2),L=T[0],q=T[1],F=Object(c.useState)(!1),U=Object(a.a)(F,2),X=U[0],Y=U[1],z=Object(c.useState)(0),J=Object(a.a)(z,2),V=J[0],B=J[1],D=Object(c.useState)(null),K=Object(a.a)(D,2),Q=K[0],R=K[1],W=function(){clearInterval(Q)},Z=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];console.log("opening config"),q(e)};return Object(j.jsx)("div",{className:"mm-app-container",children:Object(j.jsx)("div",{className:"game-config-container",children:L?Object(j.jsx)(C,{onCloseConfig:function(){return Z(!1)},nHoles:n.holes,onNumberOfHolesChange:function(e){return o((function(t){return Object(i.a)(Object(i.a)({},t),{},{holes:e})}))},nColors:n.colors,onNumberOfColorsChange:function(e){return o((function(t){return Object(i.a)(Object(i.a)({},t),{},{colors:e})}))},clickSelectMode:X?1:0,onSelectModeChange:function(e){return Y(e)}}):Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)(d,{toGuess:w?O:Array(O.length).fill(0),colorOptions:m,onNewGame:function(){M([]),P(Array(n.holes).fill(0)),p(u(n.holes,n.colors)),k(!1),B(0)},onGiveUp:function(){k(!0),W()},time:V,onOpenConfig:function(){Z(!0)}}),_.map((function(e,t){return Object(j.jsx)(x,{colors:e.g,result:e.r,colorOptions:m,number:t+1},t)})),w?null:Object(j.jsx)(h,{colorOptions:m,colors:H,setColors:function(e){P(e)},onSubmit:function(e){0===_.length&&R(setInterval((function(){B((function(e){return e+1}))}),1e3));var t=function(e,t){for(var n=Object(l.a)(e),c=Object(l.a)(t),o=0,r=0,s=n.length-1;s>=0;s--)n[s]===c[s]&&(o++,n.splice(s,1),c.splice(s,1));for(var i=0;i<n.length;i++){var a=c.indexOf(n[i]);-1!=a&&(r++,c.splice(a,1))}return{gcgp:o,gcbp:r}}(e,O);t.gcgp===O.length&&(k(!0),W()),M((function(n){return[].concat(Object(l.a)(n),[{g:e,r:t}])}))},clickSelectMode:X})]})})})};s.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(w,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.bbc72b3a.chunk.js.map