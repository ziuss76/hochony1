"use strict";(self.webpackChunkhochony_front=self.webpackChunkhochony_front||[]).push([[34],{2034:function(e,n,t){t.r(n),t.d(n,{default:function(){return X}});var c=t(4165),r=t(5861),a=t(5736),o=t(2791),i=t(7022),s=(t(3508),t(7632),t(6871)),l=(t(6649),t(2277),t(184));var u=function(e){var n=e.hochony,c=(0,s.s0)(),r=n.id,a=n.title,o=n.content,i=n.price,u=n.quan;return(0,l.jsxs)("div",{className:"col-lg-4",children:[(0,l.jsx)("img",{className:"product-img",onClick:function(){c("/detail/"+r)},src:0===r?t(633):1===r?t(416):2===r?t(2939):"https://ziuss-bucket.s3.ap-northeast-2.amazonaws.com/hochopic/hochonypic"+r+".webp",alt:"\uc774\ubbf8\uc9c0 \ub85c\ub529\uc911..",width:"500",height:"500"}),(0,l.jsxs)("div",{className:"product-box",onClick:function(){c("/detail/"+r)},children:[(0,l.jsx)("h4",{className:"photoTitle",children:a}),(0,l.jsx)("p",{children:o}),i?(0,l.jsxs)("p",{children:[i," won / ",u," units"]}):(0,l.jsxs)("p",{children:[u," units"]})]})]})},d=t(1413),h=t(885),f=t(5987),v=t(9007);var p=function(e,n){var t=(0,o.useRef)(!0);(0,o.useEffect)((function(){if(!t.current)return e();t.current=!1}),n)},m=t(7904),x=t(5746),b=t(1683),g=Math.pow(2,31)-1;function j(e,n,t){var c=t-Date.now();e.current=c<=g?setTimeout(n,c):setTimeout((function(){return j(e,n,t)}),g)}function N(){var e=(0,x.Z)(),n=(0,o.useRef)();return(0,b.Z)((function(){return clearTimeout(n.current)})),(0,o.useMemo)((function(){var t=function(){return clearTimeout(n.current)};return{set:function(c,r){void 0===r&&(r=0),e()&&(t(),r<=g?n.current=setTimeout(c,r):j(n,c,Date.now()+r))},clear:t}}),[])}var w=t(1396),y=t(1694),k=t.n(y),Z=t(239),C=(0,t(6543).Z)("carousel-caption"),I=t(162),S=["as","bsPrefix","className"],T=o.forwardRef((function(e,n){var t=e.as,c=void 0===t?"div":t,r=e.bsPrefix,a=e.className,o=(0,f.Z)(e,S),i=k()(a,(0,I.vE)(r,"carousel-item"));return(0,l.jsx)(c,(0,d.Z)((0,d.Z)({ref:n},o),{},{className:i}))}));T.displayName="CarouselItem";var E=T,M=t(1701),L=t(1380),R=t(7202),D=t(4083),O=["as","bsPrefix","slide","fade","controls","indicators","indicatorLabels","activeIndex","onSelect","onSlide","onSlid","interval","keyboard","onKeyDown","pause","onMouseOver","onMouseOut","wrap","touch","onTouchStart","onTouchMove","onTouchEnd","prevIcon","prevLabel","nextIcon","nextLabel","variant","className","children"],P={slide:!0,fade:!1,controls:!0,indicators:!0,indicatorLabels:[],defaultActiveIndex:0,interval:5e3,keyboard:!0,pause:"hover",wrap:!0,touch:!0,prevIcon:(0,l.jsx)("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:"Previous",nextIcon:(0,l.jsx)("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:"Next"};var F=o.forwardRef((function(e,n){var t=(0,Z.Ch)(e,{activeIndex:"onSelect"}),c=t.as,r=void 0===c?"div":c,a=t.bsPrefix,i=t.slide,s=t.fade,u=t.controls,x=t.indicators,b=t.indicatorLabels,g=t.activeIndex,j=t.onSelect,y=t.onSlide,C=t.onSlid,S=t.interval,T=t.keyboard,E=t.onKeyDown,P=t.pause,F=t.onMouseOver,A=t.onMouseOut,K=t.wrap,_=t.touch,z=t.onTouchStart,U=t.onTouchMove,X=t.onTouchEnd,q=t.prevIcon,B=t.prevLabel,H=t.nextIcon,J=t.nextLabel,G=t.variant,Q=t.className,V=t.children,W=(0,f.Z)(t,O),Y=(0,I.vE)(a,"carousel"),$=(0,I.SC)(),ee=(0,o.useRef)(null),ne=(0,o.useState)("next"),te=(0,h.Z)(ne,2),ce=te[0],re=te[1],ae=(0,o.useState)(!1),oe=(0,h.Z)(ae,2),ie=oe[0],se=oe[1],le=(0,o.useState)(!1),ue=(0,h.Z)(le,2),de=ue[0],he=ue[1],fe=(0,o.useState)(g||0),ve=(0,h.Z)(fe,2),pe=ve[0],me=ve[1];(0,o.useEffect)((function(){de||g===pe||(ee.current?re(ee.current):re((g||0)>pe?"next":"prev"),i&&he(!0),me(g||0))}),[g,de,pe,i]),(0,o.useEffect)((function(){ee.current&&(ee.current=null)}));var xe,be=0;(0,M.Ed)(V,(function(e,n){++be,n===g&&(xe=e.props.interval)}));var ge=(0,m.Z)(xe),je=(0,o.useCallback)((function(e){if(!de){var n=pe-1;if(n<0){if(!K)return;n=be-1}ee.current="prev",null==j||j(n,e)}}),[de,pe,j,K,be]),Ne=(0,v.Z)((function(e){if(!de){var n=pe+1;if(n>=be){if(!K)return;n=0}ee.current="next",null==j||j(n,e)}})),we=(0,o.useRef)();(0,o.useImperativeHandle)(n,(function(){return{element:we.current,prev:je,next:Ne}}));var ye=(0,v.Z)((function(){!document.hidden&&function(e){if(!e||!e.style||!e.parentNode||!e.parentNode.style)return!1;var n=getComputedStyle(e);return"none"!==n.display&&"hidden"!==n.visibility&&"none"!==getComputedStyle(e.parentNode).display}(we.current)&&($?je():Ne())})),ke="next"===ce?"start":"end";p((function(){i||(null==y||y(pe,ke),null==C||C(pe,ke))}),[pe]);var Ze="".concat(Y,"-item-").concat(ce),Ce="".concat(Y,"-item-").concat(ke),Ie=(0,o.useCallback)((function(e){(0,R.Z)(e),null==y||y(pe,ke)}),[y,pe,ke]),Se=(0,o.useCallback)((function(){he(!1),null==C||C(pe,ke)}),[C,pe,ke]),Te=(0,o.useCallback)((function(e){if(T&&!/input|textarea/i.test(e.target.tagName))switch(e.key){case"ArrowLeft":return e.preventDefault(),void($?Ne(e):je(e));case"ArrowRight":return e.preventDefault(),void($?je(e):Ne(e))}null==E||E(e)}),[T,E,je,Ne,$]),Ee=(0,o.useCallback)((function(e){"hover"===P&&se(!0),null==F||F(e)}),[P,F]),Me=(0,o.useCallback)((function(e){se(!1),null==A||A(e)}),[A]),Le=(0,o.useRef)(0),Re=(0,o.useRef)(0),De=N(),Oe=(0,o.useCallback)((function(e){Le.current=e.touches[0].clientX,Re.current=0,"hover"===P&&se(!0),null==z||z(e)}),[P,z]),Pe=(0,o.useCallback)((function(e){e.touches&&e.touches.length>1?Re.current=0:Re.current=e.touches[0].clientX-Le.current,null==U||U(e)}),[U]),Fe=(0,o.useCallback)((function(e){if(_){var n=Re.current;Math.abs(n)>40&&(n>0?je(e):Ne(e))}"hover"===P&&De.set((function(){se(!1)}),S||void 0),null==X||X(e)}),[_,P,je,Ne,De,S,X]),Ae=null!=S&&!ie&&!de,Ke=(0,o.useRef)();(0,o.useEffect)((function(){var e,n;if(Ae){var t=$?je:Ne;return Ke.current=window.setInterval(document.visibilityState?ye:t,null!=(e=null!=(n=ge.current)?n:S)?e:void 0),function(){null!==Ke.current&&clearInterval(Ke.current)}}}),[Ae,je,Ne,ge,S,ye,$]);var _e=(0,o.useMemo)((function(){return x&&Array.from({length:be},(function(e,n){return function(e){null==j||j(n,e)}}))}),[x,be,j]);return(0,l.jsxs)(r,(0,d.Z)((0,d.Z)({ref:we},W),{},{onKeyDown:Te,onMouseOver:Ee,onMouseOut:Me,onTouchStart:Oe,onTouchMove:Pe,onTouchEnd:Fe,className:k()(Q,Y,i&&"slide",s&&"".concat(Y,"-fade"),G&&"".concat(Y,"-").concat(G)),children:[x&&(0,l.jsx)("div",{className:"".concat(Y,"-indicators"),children:(0,M.UI)(V,(function(e,n){return(0,l.jsx)("button",{type:"button","data-bs-target":"","aria-label":null!=b&&b.length?b[n]:"Slide ".concat(n+1),className:n===pe?"active":void 0,onClick:_e?_e[n]:void 0,"aria-current":n===pe},n)}))}),(0,l.jsx)("div",{className:"".concat(Y,"-inner"),children:(0,M.UI)(V,(function(e,n){var t=n===pe;return i?(0,l.jsx)(D.Z,{in:t,onEnter:t?Ie:void 0,onEntered:t?Se:void 0,addEndListener:L.Z,children:function(n,c){return o.cloneElement(e,(0,d.Z)((0,d.Z)({},c),{},{className:k()(e.props.className,t&&"entered"!==n&&Ze,("entered"===n||"exiting"===n)&&"active",("entering"===n||"exiting"===n)&&Ce)}))}}):o.cloneElement(e,{className:k()(e.props.className,t&&"active")})}))}),u&&(0,l.jsxs)(l.Fragment,{children:[(K||0!==g)&&(0,l.jsxs)(w.Z,{className:"".concat(Y,"-control-prev"),onClick:je,children:[q,B&&(0,l.jsx)("span",{className:"visually-hidden",children:B})]}),(K||g!==be-1)&&(0,l.jsxs)(w.Z,{className:"".concat(Y,"-control-next"),onClick:Ne,children:[H,J&&(0,l.jsx)("span",{className:"visually-hidden",children:J})]})]})]}))}));F.displayName="Carousel",F.defaultProps=P;var A=Object.assign(F,{Caption:C,Item:E});var K=function(){return(0,l.jsx)(i.Z,{className:"col-lg-10",children:(0,l.jsxs)(A,{className:"my-5 mx-3 Carousel",children:[(0,l.jsxs)(A.Item,{interval:1500,children:[(0,l.jsx)("img",{className:"d-block w-100 carousel-img",src:t(9248),alt:"First slide",width:"3262",height:"1835"}),(0,l.jsxs)(A.Caption,{children:[(0,l.jsx)("h4",{children:"\uc790, \uc774\uc81c \ub2f9\uc2e0\ub3c4 \ud638\uc9d1\uc0ac"}),(0,l.jsx)("h6",{children:"\uc824\ub9ac\ub9db\uc880 \ubcfc\ud14c\uc57c?"})]})]}),(0,l.jsxs)(A.Item,{interval:1500,children:[(0,l.jsx)("img",{className:"d-block w-100 carousel-img",src:t(9610),alt:"Second slide",width:"3262",height:"1835"}),(0,l.jsxs)(A.Caption,{children:[(0,l.jsx)("h4",{children:"\uc774 \ucc9c\uc0ac\uac19\uc740 \ubaa8\uc2b5"}),(0,l.jsx)("h6",{children:"\uadf8\ub0e5 \uc9c0\ub098\uce60 \uc218 \uc5c6\uc9c0"})]})]}),(0,l.jsxs)(A.Item,{interval:3e3,children:[(0,l.jsx)("img",{className:"d-block w-100 carousel-img",src:t(4172),alt:"Third slide",width:"3262",height:"1835"}),(0,l.jsxs)(A.Caption,{children:[(0,l.jsx)("h4",{children:"\ud638\ucc9c\uc774\ub2d8\uc758"}),(0,l.jsx)("h6",{children:"\uc559\ud07c\ud55c \uadc0\uc5ec\uc6c0\uc744 \ud314\uc544\uc694"})]})]})]})})},_=t(4569),z=t.n(_),U=t(5872);var X=function(e){var n=e.hochony,t=e.hochony\ubcc0\uacbd,s=e.\uad6c\uae00\ub85c\uadf8\uc778,d=e.\uad6c\uae00\ub85c\uadf8\uc778\ubcc0\uacbd,h=e.\ub85c\uadf8\uc778\uc644\ub8cc\ubcc0\uacbd,f=e.\ub354\ubcf4\uae30,v=e.\ub354\ubcf4\uae30\ubcc0\uacbd;(0,o.useEffect)((function(){f&&z().get("/content").then((function(e){t(e.data),v(!1)})).catch((function(){console.log("\ubd88\ub7ec\uc624\uae30 \uc2e4\ud328!")}))}),[f]);var p=function(){var e=(0,r.Z)((0,c.Z)().mark((function e(n){var t,r;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z().post("/login",{accessToken:n.credential});case 3:(t=e.sent).data.name&&t.data.picture?(r={name:t.data.name,picture:t.data.picture},sessionStorage.setItem("userDetail",JSON.stringify(r)),h(!0),d(!1),v(!0)):console.log("Invalid response from server"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("Login Failed",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n){return e.apply(this,arguments)}}();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(K,{}),(0,l.jsxs)(i.Z,{className:"col-lg-10",children:[(0,l.jsx)("div",{className:"row",children:n.map((function(e,t){return(0,l.jsx)(u,{hochony:n[t],i:t},t)}))}),!0===s&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"googleText",children:(0,l.jsx)(a.Z,{pill:!0,bg:"light",text:"dark",children:"\uad6c\uae00 \ub85c\uadf8\uc778 \ud558\uace0 \ub354\ubcf4\uae30!"})}),(0,l.jsx)("div",{className:"googleBox",children:(0,l.jsx)(U.rg,{clientId:"847017456881-ammtkj4u2gplukp3a5lmvm7t1kmmv351.apps.googleusercontent.com",children:(0,l.jsx)(U.kZ,{text:"signin_with",shape:"pill",onSuccess:p})})})]})]})]})}},2277:function(){},9248:function(e,n,t){e.exports=t.p+"static/media/hochonybg1.5d62956a7a043dd35d9a.webp"},9610:function(e,n,t){e.exports=t.p+"static/media/hochonybg2.ba3445eb477bff2e4b1d.webp"},4172:function(e,n,t){e.exports=t.p+"static/media/hochonybg3.37c5790fc776717d05f9.webp"},633:function(e,n,t){e.exports=t.p+"static/media/hochonypic0.24ca1eecdcef7dfd791c.webp"},416:function(e,n,t){e.exports=t.p+"static/media/hochonypic1.eeb043c0bcea94bd1da5.webp"},2939:function(e,n,t){e.exports=t.p+"static/media/hochonypic2.4ba76a4e0a3512a5250f.webp"}}]);
//# sourceMappingURL=34.bc4ebf3b.chunk.js.map