(()=>{var e={};e.id=888,e.ids=[888],e.modules={9038:(e,r,t)=>{"use strict";t.d(r,{Z:()=>x});var o=t(997),s=t(6689),i=t(7518),n=t.n(i);let a=n().div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 300px;
  z-index: 9999;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin: 1rem;
    min-width: auto;
  }
`,c=n().div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4facfe;
`,d=n().div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`,l=n().div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 3px solid ${e=>e.$gradeColor};
  text-align: center;
`,u=n().div`
  font-size: 0.7rem;
  opacity: 0.8;
  margin-bottom: 0.2rem;
`,m=n().div`
  font-weight: bold;
  font-size: 0.9rem;
`,p=n().div`
  font-size: 0.6rem;
  color: ${e=>e.$color};
  margin-top: 0.2rem;
`,f=n().div`
  font-size: 0.7rem;
  opacity: 0.6;
  text-align: center;
  margin-top: 0.5rem;
`,x=()=>{let[e,r]=(0,s.useState)({}),[t,i]=(0,s.useState)(!1);(0,s.useEffect)(()=>{setTimeout(()=>{},1e3);let e=new PerformanceObserver(e=>{for(let t of e.getEntries())switch(t.entryType){case"largest-contentful-paint":r(e=>({...e,lcp:t.startTime}));break;case"first-input":r(e=>({...e,fid:t.processingStart-t.startTime}));break;case"layout-shift":t.hadRecentInput||r(e=>({...e,cls:(e.cls||0)+t.value}))}});try{e.observe({entryTypes:["largest-contentful-paint","first-input","layout-shift"]})}catch(e){}return()=>e.disconnect()},[]);let n=(e,r)=>{switch(e){case"lcp":return r<=2500?"Good":r<=4e3?"Needs Improvement":"Poor";case"fid":return r<=100?"Good":r<=300?"Needs Improvement":"Poor";case"cls":return r<=.1?"Good":r<=.25?"Needs Improvement":"Poor";case"fcp":return r<=1800?"Good":r<=3e3?"Needs Improvement":"Poor";case"ttfb":return r<=800?"Good":r<=1800?"Needs Improvement":"Poor";default:return"Unknown"}},x=e=>{switch(e){case"Good":return"#0cce6b";case"Needs Improvement":return"#ffa400";case"Poor":return"#ff4e42";default:return"#999"}};return t?(0,o.jsxs)(a,{children:[o.jsx(c,{children:"\uD83D\uDE80 Performance Monitor"}),o.jsx(d,{children:Object.entries(e).map(([e,r])=>{if(void 0===r)return null;let t=n(e,r);return(0,o.jsxs)(l,{$gradeColor:x(t),children:[o.jsx(u,{children:e.toUpperCase()}),(0,o.jsxs)(m,{children:[Math.round(r),"cls"===e?"":"ms"]}),o.jsx(p,{$color:x(t),children:t})]},e)})}),o.jsx(f,{children:"性能监控仅在开发环境显示"})]}):null}},3893:(e,r,t)=>{"use strict";t.a(e,async(e,o)=>{try{t.r(r),t.d(r,{default:()=>c});var s=t(997),i=t(6915),n=t(9038);t(108);var a=e([i]);i=(a.then?(await a)():a)[0];let d={colors:{primary:"#0070f3",secondary:"#0051cc",background:"#f0f2f5",text:"#333"},breakpoints:{mobile:"480px",tablet:"768px",desktop:"1024px"}};function c({Component:e,pageProps:r}){return(0,s.jsxs)(i.f6,{theme:d,children:[s.jsx(e,{...r}),s.jsx(n.Z,{})]})}o()}catch(e){o(e)}})},108:()=>{},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},4770:e=>{"use strict";e.exports=require("shallowequal")},7518:e=>{"use strict";e.exports=require("styled-components")},6162:e=>{"use strict";e.exports=require("stream")},5514:e=>{"use strict";e.exports=import("@emotion/is-prop-valid")},6726:e=>{"use strict";e.exports=import("@emotion/unitless")},4615:e=>{"use strict";e.exports=import("stylis")}};var r=require("../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[915],()=>t(3893));module.exports=o})();