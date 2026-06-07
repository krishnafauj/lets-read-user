"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen bg-background font-sans">
      
      {/* Left Column (35%) - Branding & Visuals */}
      <div className="hidden lg:flex lg:w-[35%] bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative ambient elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Logo & Tagline */}
        <div className="relative z-10 flex flex-col items-start gap-5">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 shadow-xl -ml-2 border border-white/20">
            <Image 
              src="/fulllogo.svg" 
              alt="Let'sRead Logo" 
              width={200} 
              height={55} 
              className="object-contain" 
              priority
            />
          </div>
          <p className="text-white font-medium tracking-widest uppercase text-[11px] opacity-90 border-l-2 border-white pl-3 ml-1">
            A Journey of a Thousand Books
          </p>
        </div>

        {/* Hero text / quote */}
        <div className="relative z-10 mt-auto mb-16">
          <h2 className="text-4xl font-normal text-white mb-6 leading-tight drop-shadow-sm">
            Unlock the world's <br /> best ideas.
          </h2>
          <p className="text-white/80 text-[17px] font-medium leading-relaxed max-w-sm">
            Join Let'sRead to organize your learning, track your reading streaks, and converse with AI spaces tailored for your growth.
          </p>
        </div>

        {/* Copyright */}
        <div className="relative z-10 text-white/50 text-sm font-medium">
          © 2026 Let'sRead Inc.
        </div>
      </div>

      {/* Right Column (65%) - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        
        <div className="w-full max-w-[400px] flex flex-col">
          
          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <Image 
                src="/icon.svg" 
                alt="Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
              <h1 className="text-3xl font-normal text-foreground tracking-tight">
                Welcome back
              </h1>
            </div>
            <p className="text-text-muted text-[15px] font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="w-full flex flex-col gap-4 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface border border-border hover:border-primary/50 hover:bg-primary/5 text-[14px] font-normal text-foreground transition-all duration-200 shadow-sm hover:shadow group">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                </g>
              </svg>
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface border border-border hover:border-primary/50 hover:bg-primary/5 text-[14px] font-normal text-foreground transition-all duration-200 shadow-sm hover:shadow group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.641-.026 2.669-1.48 3.666-2.947 1.164-1.704 1.64-3.355 1.666-3.441-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.002-.156-3.675 1.09-4.597 1.09zM15.588 3.818c.831-1.012 1.39-2.428 1.234-3.818-1.195.052-2.675.805-3.532 1.818-.766.896-1.429 2.338-1.234 3.714 1.338.104 2.701-.701 3.532-1.714z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center mb-8">
            <div className="flex-1 h-[1px] bg-border"></div>
            <span className="px-4 text-[12px] font-normal text-text-muted uppercase tracking-widest">or sign in with email</span>
            <div className="flex-1 h-[1px] bg-border"></div>
          </div>

          {/* Email Login Form */}
          <form className="w-full flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-[13px] font-normal text-foreground/90 ml-1">Email address</label>
              <input 
                id="email"
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 text-[15px] text-foreground bg-surface border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-text-muted/50 transition-all shadow-sm"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-2 px-4 py-3.5 bg-primary text-white text-[15px] font-normal tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign in securely
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-10 text-center text-[14.5px] text-text-muted font-medium">
            Don't have an account?{' '}
            <Link href="#" className="font-normal text-primary hover:text-primary/80 hover:underline transition-colors">
              Sign up for free
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
