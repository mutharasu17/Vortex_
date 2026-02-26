(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84170,(e,t,a)=>{t.exports=e.r(37531)},43981,e=>{"use strict";var t=e.i(57594);e.i(99811);var a=e.i(23727),r=e.i(55524);function s(){let[e,s]=(0,t.useState)(null);(0,t.useEffect)(()=>{r.analytics&&Promise.resolve(r.analytics).then(e=>{e&&s(e)}).catch(()=>{})},[]);let i=(t,r)=>{if(e)try{(0,a.logEvent)(e,t,r)}catch{}};return{trackEvent:i,trackPageView:e=>i("page_view",{page_title:e}),trackLogin:e=>i("login",{method:e}),trackSignUp:e=>i("sign_up",{method:e}),trackButtonClick:e=>i("button_click",{button_name:e})}}e.s(["useAnalytics",()=>s])},76541,46624,e=>{"use strict";var t=e.i(57594);let a=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim(),r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:n,iconNode:d,...c},p)=>(0,t.createElement)("svg",{ref:p,...s,width:r,height:r,stroke:e,strokeWidth:o?24*Number(i)/Number(r):i,className:a("lucide",l),...!n&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(n)?n:[n]])),o=(e,s)=>{let o=(0,t.forwardRef)(({className:o,...l},n)=>(0,t.createElement)(i,{ref:n,iconNode:s,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,o),...l}));return o.displayName=r(e),o};e.s(["default",()=>o],76541);let l=o("cpu",[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]);e.s(["Cpu",()=>l],46624)},25573,e=>{"use strict";let t=(0,e.i(76541).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);e.s(["Zap",()=>t],25573)},94343,e=>{"use strict";var t=e.i(86095),a=e.i(57594),r=e.i(84170),s=e.i(8881),i=e.i(43981);e.i(55934);var o=e.i(32075),l=e.i(55524);let n="robots",d={async addRobot(e,t){if(!l.db)throw Error("Firestore not initialized");return(0,o.addDoc)((0,o.collection)(l.db,n),{...t,userId:e,lastUpdate:(0,o.serverTimestamp)()})},async updateRobot(e,t){if(!l.db)throw Error("Firestore not initialized");let a=(0,o.doc)(l.db,n,e);return(0,o.updateDoc)(a,{...t,lastUpdate:(0,o.serverTimestamp)()})},async getUserRobots(e){if(!l.db)throw Error("Firestore not initialized");let t=(0,o.query)((0,o.collection)(l.db,n),(0,o.where)("userId","==",e));return(await (0,o.getDocs)(t)).docs.map(e=>({id:e.id,...e.data()}))},async deleteRobot(e){if(!l.db)throw Error("Firestore not initialized");let t=(0,o.doc)(l.db,n,e);return(0,o.deleteDoc)(t)}};var c=e.i(76541);let p=(0,c.default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),m=(0,c.default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);var x=e.i(25573),h=e.i(46624);let b=(0,c.default)("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]),u=(0,c.default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);function g({end:e,duration:r=2e3,suffix:s=""}){let[i,o]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let t=0,a=e/(r/16),s=setInterval(()=>{(t+=a)>=e?(o(e),clearInterval(s)):o(Math.floor(t))},16);return()=>clearInterval(s)},[e,r]),(0,t.jsxs)("span",{children:[i.toLocaleString(),s]})}function f(){let{user:e,logOut:o,loading:l}=(0,s.useAuth)(),{trackPageView:n,trackButtonClick:c,trackEvent:f}=(0,i.useAnalytics)(),y=(0,r.useRouter)(),[v,j]=(0,a.useState)([]),[w,N]=(0,a.useState)(!0),[k,M]=(0,a.useState)(!1),[C,z]=(0,a.useState)({name:"",model:"",status:"active",battery:100});(0,a.useEffect)(()=>{l||e||y.push("/login")},[e,l,y]),(0,a.useEffect)(()=>{e&&(n("Dashboard"),E())},[e]);let E=async()=>{if(e)try{let t=await d.getUserRobots(e.uid);j(t)}catch(e){console.error("Error loading robots:",e)}finally{N(!1)}},A=async t=>{if(t.preventDefault(),e&&C.name&&C.model){M(!0);try{await d.addRobot(e.uid,C),f("add_robot",{model:C.model}),z({name:"",model:"",status:"active",battery:100}),await E()}catch(e){console.error("Error adding robot:",e)}finally{M(!1)}}},R=async e=>{if(confirm("Are you sure you want to decommission this unit?"))try{await d.deleteRobot(e),c("delete_robot"),await E()}catch(e){console.error("Error deleting robot:",e)}},U=async()=>{c("logout"),await o(),y.push("/login")};if(l||w||!e)return(0,t.jsx)("div",{className:"flex min-h-screen items-center justify-center bg-black",children:(0,t.jsx)(u,{className:"h-10 w-10 animate-spin text-indigo-500"})});let S=[{label:"Active Robots",value:v.length,suffix:"",icon:"🤖",color:"#6366f1"},{label:"Tasks Complete",value:4892,suffix:"",icon:"✅",color:"#8b5cf6"},{label:"Fleet Health",value:98,suffix:"%",icon:"⚡",color:"#06b6d4"},{label:"Battery Avg",value:v.length>0?Math.round(v.reduce((e,t)=>e+t.battery,0)/v.length):0,suffix:"%",icon:"🔋",color:"#10b981"}];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        
        .dash-bg {
          min-height: 100vh;
          background: radial-gradient(ellipse at 20% 20%, #0d0a2e 0%, #000 50%, #0a0a14 100%);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          padding: 2rem;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(99,102,241,0.15);
        }
        .dash-brand {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a5b4fc, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
        }
        .dash-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 0 16px rgba(99,102,241,0.4);
        }
        .logout-btn {
          padding: 8px 18px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.2); }

        .dash-content { 
          max-width: 1200px; 
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .dash-content { grid-template-columns: 1fr; }
        }

        .main-section { display: flex; flex-direction: column; gap: 2.5rem; }

        .welcome-text {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          background: linear-gradient(135deg, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .welcome-sub { color: rgba(148,163,184,0.6); margin-bottom: 1.5rem; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }
        .stat-number {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 8px 0 4px;
        }
        .stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); }

        /* Robot Grid */
        .robot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .robot-card {
          background: rgba(15,15,30,0.6);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 24px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .robot-card:hover {
          border-color: rgba(99,102,241,0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.1);
        }
        .robot-model {
          font-[Orbitron] text-[10px] font-bold tracking-[0.2em] text-indigo-400 mb-2 uppercase;
        }
        .robot-name { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: #fff; }
        .robot-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-active { background: rgba(34,197,94,0.1); color: #4ade80; }
        
        .robot-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .robot-stat-item { display: flex; flex-direction: column; gap: 4px; }
        .r-stat-val { font-family: 'Orbitron'; font-size: 0.9rem; font-weight: 600; color: #fff; }
        .r-stat-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; }

        .delete-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          color: rgba(255,255,255,0.2);
          transition: color 0.2s;
          cursor: pointer;
        }
        .delete-btn:hover { color: #f87171; }

        /* Add Form Card */
        .side-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .add-card {
          background: linear-gradient(135deg, rgba(30,27,75,0.8), rgba(15,15,30,0.9));
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 24px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .form-title { font-[Orbitron] text-sm font-bold tracking-widest text-[#a5b4fc] mb-6 flex items-center gap-2; }
        .input-group { margin-bottom: 1.25rem; }
        .input-label { display: block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; letter-spacing: 1px; }
        .input-field {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #6366f1; }
        .add-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.5); }
        .add-btn:disabled { opacity: 0.6; cursor: wait; }

        /* Cart Card */
        .cart-card {
          background: rgba(15,15,30,0.4);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 1.5rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cart-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(99,102,241,0.1); display: flex; align-items: center; justify-content: center; }
      `}),(0,t.jsxs)("div",{className:"dash-bg",children:[(0,t.jsxs)("header",{className:"dash-header",children:[(0,t.jsx)("div",{className:"dash-brand",children:"🤖 NEXUS"}),(0,t.jsxs)("div",{className:"dash-user",children:[(0,t.jsx)("div",{className:"user-avatar",children:e.email?.[0].toUpperCase()}),(0,t.jsxs)("div",{className:"hidden sm:block",children:[(0,t.jsx)("div",{className:"text-sm font-bold",children:e.displayName||"Operator"}),(0,t.jsx)("div",{className:"text-[10px] text-neutral-500 uppercase tracking-widest",children:"Command Center"})]}),(0,t.jsx)("button",{className:"logout-btn",onClick:U,children:"Sign Out"})]})]}),(0,t.jsxs)("div",{className:"dash-content",children:[(0,t.jsxs)("div",{className:"main-section",children:[(0,t.jsxs)("section",{children:[(0,t.jsx)("h1",{className:"welcome-text",children:"Fleet Overview"}),(0,t.jsxs)("p",{className:"welcome-sub",children:["Managing ",v.length," active units across the network."]}),(0,t.jsx)("div",{className:"stats-grid",children:S.map((e,a)=>(0,t.jsxs)("div",{className:"stat-card",children:[(0,t.jsx)("div",{className:"text-xl",children:e.icon}),(0,t.jsx)("div",{className:"stat-number",style:{color:e.color},children:(0,t.jsx)(g,{end:e.value,suffix:e.suffix})}),(0,t.jsx)("div",{className:"stat-label",children:e.label})]},a))})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{className:"mb-6 font-[Orbitron] text-sm font-bold tracking-[0.3em] uppercase text-indigo-400",children:"Deployed Units"}),(0,t.jsx)("div",{className:"robot-grid",children:v.length>0?v.map(e=>(0,t.jsxs)("div",{className:"robot-card",children:[(0,t.jsx)(m,{className:"delete-btn h-4 w-4",onClick:()=>e.id&&R(e.id)}),(0,t.jsx)("div",{className:"robot-model",children:e.model}),(0,t.jsx)("div",{className:"robot-name",children:e.name}),(0,t.jsxs)("div",{className:"robot-status-pill status-active",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"}),e.status]}),(0,t.jsxs)("div",{className:"robot-stats",children:[(0,t.jsxs)("div",{className:"robot-stat-item",children:[(0,t.jsxs)("div",{className:"r-stat-val",children:["#",Math.floor(900*Math.random())+100]}),(0,t.jsx)("div",{className:"r-stat-label",children:"Unit ID"})]}),(0,t.jsxs)("div",{className:"robot-stat-item",children:[(0,t.jsxs)("div",{className:"r-stat-val",children:[e.battery,"%"]}),(0,t.jsx)("div",{className:"r-stat-label",children:"Battery"})]}),(0,t.jsxs)("div",{className:"robot-stat-item",children:[(0,t.jsx)("div",{className:"r-stat-val",children:"98%"}),(0,t.jsx)("div",{className:"r-stat-label",children:"Link"})]})]})]},e.id)):(0,t.jsxs)("div",{className:"col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10",children:[(0,t.jsx)(h.Cpu,{className:"mx-auto h-12 w-12 text-white/10 mb-4"}),(0,t.jsx)("p",{className:"text-white/30 font-medium",children:"No units deployed yet. Use the command console to add your first robot."})]})})]})]}),(0,t.jsxs)("aside",{className:"side-section",children:[(0,t.jsxs)("div",{className:"add-card",children:[(0,t.jsxs)("div",{className:"form-title",children:[(0,t.jsx)(p,{className:"h-4 w-4"})," Deployment Console (Put/Post)"]}),(0,t.jsxs)("form",{onSubmit:A,children:[(0,t.jsxs)("div",{className:"input-group",children:[(0,t.jsx)("label",{className:"input-label",children:"Unit Designation (Name)"}),(0,t.jsx)("input",{type:"text",className:"input-field",placeholder:"e.g. Iron Sentinel",value:C.name,onChange:e=>z({...C,name:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"input-group",children:[(0,t.jsx)("label",{className:"input-label",children:"Model Series"}),(0,t.jsx)("input",{type:"text",className:"input-field",placeholder:"e.g. MK-7 Guardian",value:C.model,onChange:e=>z({...C,model:e.target.value}),required:!0})]}),(0,t.jsxs)("div",{className:"input-group",children:[(0,t.jsx)("label",{className:"input-label",children:"Power Level"}),(0,t.jsx)("input",{type:"range",className:"w-full h-1.5 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500",min:"1",max:"100",value:C.battery,onChange:e=>z({...C,battery:parseInt(e.target.value)})}),(0,t.jsxs)("div",{className:"flex justify-between mt-2 text-[10px] text-white/40 font-bold uppercase",children:[(0,t.jsx)("span",{children:"Low"}),(0,t.jsxs)("span",{className:"text-indigo-400",children:[C.battery,"% Critical Core"]}),(0,t.jsx)("span",{children:"Max"})]})]}),(0,t.jsxs)("button",{type:"submit",className:"add-btn",disabled:k,children:[k?(0,t.jsx)(u,{className:"h-4 w-4 animate-spin"}):(0,t.jsx)(x.Zap,{className:"h-4 w-4"}),"Deploy Unit"]})]})]}),(0,t.jsxs)("div",{className:"cart-card",children:[(0,t.jsxs)("div",{className:"form-title",children:[(0,t.jsx)(b,{className:"h-4 w-4"})," Deployment Cart"]}),v.slice(0,3).map((e,a)=>(0,t.jsxs)("div",{className:"cart-item",children:[(0,t.jsx)("div",{className:"cart-icon",children:"📦"}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("div",{className:"text-xs font-bold",children:e.name}),(0,t.jsx)("div",{className:"text-[10px] text-neutral-500",children:e.model})]}),(0,t.jsx)("div",{className:"text-[10px] font-bold text-green-500",children:"READY"})]},a)),0===v.length&&(0,t.jsx)("div",{className:"text-center py-4 text-[10px] text-white/20 uppercase tracking-widest",children:"Cart is Empty"}),(0,t.jsxs)("div",{className:"mt-4 pt-4 border-top border-white/5 flex justify-between items-center",children:[(0,t.jsx)("span",{className:"text-[10px] text-white/40 uppercase font-bold",children:"Priority Shipping"}),(0,t.jsx)("span",{className:"text-xs font-bold text-indigo-400",children:"FREE"})]})]})]})]})]})]})}e.s(["default",()=>f],94343)}]);