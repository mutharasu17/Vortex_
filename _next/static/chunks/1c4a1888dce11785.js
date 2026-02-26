(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7022,e=>{"use strict";e.i(57811);var t=e.i(86095),r=e.i(57594),i=e.i(84170),o=e.i(8881),a=e.i(43981);e.i(58971);var s=e.i(48690),n=e.i(11993);let l=({color:e="currentColor",size:t=24,className:i,...o})=>r.default.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:t,height:t,fill:e,...o,className:"remixicon "+(i||"")},r.default.createElement("path",{d:"M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"})),d=({color:e="currentColor",size:t=24,className:i,...o})=>r.default.createElement("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",width:t,height:t,fill:e,...o,className:"remixicon "+(i||"")},r.default.createElement("path",{d:"M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"}));function c(){let{user:e,signInWithGoogle:c,signInWithGithub:g,loading:p,firebaseReady:b}=(0,o.useAuth)(),{trackLogin:x,trackPageView:u}=(0,a.useAnalytics)(),m=(0,i.useRouter)(),[h,f]=(0,r.useState)(""),[v,C]=(0,r.useState)(!1),[w,y]=(0,r.useState)("intro"),[j,N]=(0,r.useState)("google"),k="/Vortex_",z=(0,r.useRef)(null),E=(0,r.useRef)(null);(0,r.useEffect)(()=>{e&&m.push("/")},[e,m]),(0,r.useEffect)(()=>{u("Login Page")},[]),(0,r.useEffect)(()=>{"loop"===w&&E.current&&E.current.play().catch(()=>{})},[w]);let I=async()=>{f(""),C(!0);try{"google"===j?(await c(),x("google")):(await g(),x("github")),m.push("/")}catch(e){e instanceof s.FirebaseError?f(e.message):f("An unexpected error occurred.")}finally{C(!1)}};return p?(0,t.jsx)("div",{className:"login-loading",children:(0,t.jsx)("div",{className:"login-spinner"})}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        .login-bg {
          min-height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .login-loading {
          min-height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .bg-video-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
          transition: opacity 2s ease-in-out;
        }

        .bg-video-intro {
          z-index: 3;
        }

        .bg-video-loop {
          z-index: 1;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% center, transparent 0%, rgba(0,0,0,0.8) 100%);
          z-index: 2;
        }

        .auth-card {
          position: relative;
          z-index: 50;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 3rem;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: 
            0 40px 100px -20px rgba(0, 0, 0, 0.8),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transform: translateX(180px); /* Moved further right */
        }

        .vortex-brand {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .vortex-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 12px;
          background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .vortex-subtitle {
          font-size: 0.65rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          display: block;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .auth-toggle-group {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          padding: 5px;
          border-radius: 14px;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .auth-toggle-btn {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 1;
          border: none;
          background: none;
          cursor: pointer;
        }

        .auth-toggle-btn.active {
          color: white;
        }

        .toggle-slider {
          position: absolute;
          top: 5px;
          left: 5px;
          width: calc(50% - 5px);
          height: calc(100% - 10px);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .submit-btn {
          background: #fff;
          color: #000;
          padding: 1.1rem;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.85rem;
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 3px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          cursor: pointer;
          margin-top: 0.5rem;
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
        }

        .submit-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-msg {
          color: #ff453a;
          font-size: 0.75rem;
          text-align: center;
          background: rgba(255, 69, 58, 0.1);
          padding: 0.85rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 69, 58, 0.2);
        }
      `}),(0,t.jsxs)("div",{className:"login-bg",children:[(0,t.jsxs)("div",{className:"bg-video-container",children:[(0,t.jsx)("video",{ref:z,autoPlay:!0,muted:!0,playsInline:!0,onEnded:()=>{y("loop")},className:"bg-video bg-video-intro",style:{opacity:+("intro"===w),pointerEvents:"intro"===w?"auto":"none"},children:(0,t.jsx)("source",{src:`${k}/vortex_l/vortex_l1.mp4`,type:"video/mp4"})}),(0,t.jsx)("video",{ref:E,muted:!0,playsInline:!0,loop:!0,preload:"auto",className:"bg-video bg-video-loop",style:{opacity:1},children:(0,t.jsx)("source",{src:`${k}/vortex_l/vortex_l2.mp4`,type:"video/mp4"})}),(0,t.jsx)("div",{className:"video-overlay"})]}),(0,t.jsxs)(n.motion.div,{initial:{x:200,opacity:0},animate:{x:180,opacity:1},transition:{duration:1.2,ease:[.16,1,.3,1]},className:"auth-card",children:[(0,t.jsxs)("div",{className:"vortex-brand",children:[(0,t.jsx)("h1",{className:"vortex-title",children:"VORTEX"}),(0,t.jsx)("span",{className:"vortex-subtitle",children:"Advanced Intelligence"})]}),(0,t.jsxs)("div",{className:"auth-toggle-group",children:[(0,t.jsx)("div",{className:"toggle-slider",style:{transform:`translateX(${"google"===j?"0":"100%"})`}}),(0,t.jsxs)("button",{className:`auth-toggle-btn ${"google"===j?"active":""}`,onClick:()=>N("google"),children:[(0,t.jsx)(d,{size:20}),"GOOGLE"]}),(0,t.jsxs)("button",{className:`auth-toggle-btn ${"github"===j?"active":""}`,onClick:()=>N("github"),children:[(0,t.jsx)(l,{size:20}),"GITHUB"]})]}),(0,t.jsx)("button",{onClick:I,disabled:v,className:"submit-btn",children:v?"CONNECTING...":`SIGN IN WITH ${j.toUpperCase()}`}),h&&(0,t.jsx)("div",{className:"error-msg",children:h}),!b&&(0,t.jsx)("div",{className:"text-white/20 text-[10px] text-center tracking-[0.5em] font-bold uppercase",children:"SYS_AUTH_VRX_2.4"})]}),(0,t.jsx)("div",{className:"absolute bottom-10 right-14 z-[60] opacity-30",children:(0,t.jsx)("span",{className:"text-[11px] text-white/50 tracking-[0.8em] font-semibold leading-none uppercase",children:"Vortex Systems Protocol"})})]})]})}e.s(["default",()=>c],7022)}]);