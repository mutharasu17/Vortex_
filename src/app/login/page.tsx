'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { FirebaseError } from 'firebase/app';
import { motion } from 'framer-motion';
import { RiGoogleFill, RiGithubFill } from "@remixicon/react";
import { gsap } from 'gsap';

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithGithub, loading, firebaseReady } = useAuth();
  const { trackLogin, trackPageView } = useAnalytics();
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoState, setVideoState] = useState<'intro' | 'loop'>('intro');
  const [authMethod, setAuthMethod] = useState<'google' | 'github'>('google');
  const basePath = process.env.NODE_ENV === "production" ? "/Vortex_" : "";

  const videoIntroRef = useRef<HTMLVideoElement>(null);
  const videoLoopRef = useRef<HTMLVideoElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  useEffect(() => {
    trackPageView('Login Page');
  }, []);

  // Seamless Loop Handling
  useEffect(() => {
    if (videoState !== 'loop' || !videoLoopRef.current) return;
    videoLoopRef.current.play().catch(() => { });
  }, [videoState]);

  const handleIntroEnd = () => {
    setVideoState('loop');
  };

  const clearState = () => { setError(''); };

  const handleAuth = async () => {
    clearState();
    setIsSubmitting(true);
    try {
      if (authMethod === 'google') {
        await signInWithGoogle();
        trackLogin('google');
      } else {
        await signInWithGithub();
        trackLogin('github');
      }
      router.push('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="login-loading">
        <div className="login-spinner" />
      </div>
    );
  }

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="login-bg">
        {/* Dual Video Background with Smooth Cross-fade */}
        <div className="bg-video-container">
          <video
            ref={videoIntroRef}
            autoPlay
            muted
            playsInline
            onEnded={handleIntroEnd}
            className="bg-video bg-video-intro"
            style={{ opacity: videoState === 'intro' ? 1 : 0, pointerEvents: videoState === 'intro' ? 'auto' : 'none' }}
          >
            <source src={`${basePath}/vortex_l/vortex_l1.mp4`} type="video/mp4" />
          </video>

          <video
            ref={videoLoopRef}
            muted
            playsInline
            loop
            preload="auto"
            className="bg-video bg-video-loop"
            style={{ opacity: 1 }}
          >
            <source src={`${basePath}/vortex_l/vortex_l2.mp4`} type="video/mp4" />
          </video>

          <div className="video-overlay" />
        </div>


        {/* Central Auth UI */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 180, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="auth-card"
        >
          <div className="vortex-brand">
            <h1 className="vortex-title">VORTEX</h1>
            <span className="vortex-subtitle">Advanced Intelligence</span>
          </div>

          <div className="auth-toggle-group">
            <div
              className="toggle-slider"
              style={{ transform: `translateX(${authMethod === 'google' ? '0' : '100%'})` }}
            />
            <button
              className={`auth-toggle-btn ${authMethod === 'google' ? 'active' : ''}`}
              onClick={() => setAuthMethod('google')}
            >
              <RiGoogleFill size={20} />
              GOOGLE
            </button>
            <button
              className={`auth-toggle-btn ${authMethod === 'github' ? 'active' : ''}`}
              onClick={() => setAuthMethod('github')}
            >
              <RiGithubFill size={20} />
              GITHUB
            </button>
          </div>

          <button
            onClick={handleAuth}
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'CONNECTING...' : `SIGN IN WITH ${authMethod.toUpperCase()}`}
          </button>

          {error && <div className="error-msg">{error}</div>}

          {!firebaseReady && (
            <div className="text-white/20 text-[10px] text-center tracking-[0.5em] font-bold uppercase">
              SYS_AUTH_VRX_2.4
            </div>
          )}
        </motion.div>

        {/* Branding Decor */}
        <div className="absolute bottom-10 right-14 z-[60] opacity-30">
          <span className="text-[11px] text-white/50 tracking-[0.8em] font-semibold leading-none uppercase">Vortex Systems Protocol</span>
        </div>
      </div>
    </>
  );
}
