"use client";

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <style dangerouslySetInnerHTML={{__html: `
        .loader-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 60px 0 50px;
        }
        .book-scene { position: relative; width: 120px; height: 90px; }
        .book-cover-left {
          position: absolute; bottom: 0; left: 0;
          width: 54px; height: 72px;
          background: #007F78;
          border-radius: 3px 0 0 3px;
          transform-origin: right center;
          transform: perspective(300px) rotateY(-40deg);
          animation: loadOpenLeft 2.4s ease-in-out infinite;
        }
        .book-cover-right {
          position: absolute; bottom: 0; right: 0;
          width: 54px; height: 72px;
          background: #007F78;
          border-radius: 0 3px 3px 0;
          transform-origin: left center;
          transform: perspective(300px) rotateY(40deg);
          animation: loadOpenRight 2.4s ease-in-out infinite;
        }
        .page {
          position: absolute; bottom: 0;
          width: 52px; height: 70px;
          background: #fff;
          border: 0.5px solid #D3D1C7;
        }
        .page-left { left: 1px; border-radius: 2px 0 0 2px; }
        .page-right { right: 1px; border-radius: 0 2px 2px 2px; }
        .page-lines { padding: 10px 8px; }
        .line {
          height: 2px; border-radius: 1px;
          background: #D3D1C7; margin-bottom: 7px;
        }
        .line-short { width: 60%; }
        .line-orange { background: #FFB018; width: 80%; }
        .spine {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 6px; height: 72px;
          background: #203233;
          border-radius: 1px;
          z-index: 2;
        }
        .book-shadow {
          width: 100px; height: 8px;
          background: #D3D1C7;
          border-radius: 50%;
          margin: 8px auto 0;
          animation: loadShadow 2.4s ease-in-out infinite;
        }
        .page-flip {
          position: absolute; bottom: 0; left: 50%;
          width: 50px; height: 68px;
          background: #FFDE68;
          border-radius: 0 2px 2px 0;
          transform-origin: left center;
          animation: loadFlip 2.4s ease-in-out infinite;
          z-index: 3;
        }
        .brand-row {
          display: flex; align-items: baseline; gap: 0;
          margin-top: 28px;
        }
        .brand-light {
          font-weight: 300; font-size: 32px; letter-spacing: -0.5px;
          color: #203233;
        }
        .brand-bold {
          font-weight: 700; font-size: 32px; letter-spacing: -0.5px;
          color: #00BEAA;
        }
        .dots-row {
          display: flex; gap: 6px; margin-top: 14px; align-items: center;
        }
        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #D3D1C7;
          animation: loadDotPulse 2.4s ease-in-out infinite;
        }
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        .loading-text {
          font-size: 12px; letter-spacing: 3px;
          color: #888780; margin-top: 12px;
          text-transform: uppercase;
          animation: loadFadeText 2.4s ease-in-out infinite;
        }
        .underline-bar {
          width: 0; height: 3px; background: #FFB018;
          border-radius: 2px; margin-top: 4px;
          animation: loadGrowBar 2.4s ease-in-out infinite;
        }

        @keyframes loadOpenLeft {
          0%   { transform: perspective(300px) rotateY(-5deg); }
          30%  { transform: perspective(300px) rotateY(-55deg); }
          70%  { transform: perspective(300px) rotateY(-55deg); }
          100% { transform: perspective(300px) rotateY(-5deg); }
        }
        @keyframes loadOpenRight {
          0%   { transform: perspective(300px) rotateY(5deg); }
          30%  { transform: perspective(300px) rotateY(55deg); }
          70%  { transform: perspective(300px) rotateY(55deg); }
          100% { transform: perspective(300px) rotateY(5deg); }
        }
        @keyframes loadFlip {
          0%   { transform: perspective(300px) rotateY(0deg); opacity: 1; }
          20%  { transform: perspective(300px) rotateY(-90deg); opacity: 0.4; }
          40%  { transform: perspective(300px) rotateY(-180deg); opacity: 1; }
          60%  { transform: perspective(300px) rotateY(-180deg); opacity: 1; }
          80%  { transform: perspective(300px) rotateY(-90deg); opacity: 0.4; }
          100% { transform: perspective(300px) rotateY(0deg); opacity: 1; }
        }
        @keyframes loadShadow {
          0%   { width: 70px; opacity: 0.4; }
          30%  { width: 120px; opacity: 0.2; }
          70%  { width: 120px; opacity: 0.2; }
          100% { width: 70px; opacity: 0.4; }
        }
        @keyframes loadDotPulse {
          0%, 100% { background: #D3D1C7; transform: scale(1); }
          50%       { background: #00BEAA; transform: scale(1.4); }
        }
        @keyframes loadGrowBar {
          0%   { width: 0; }
          50%  { width: 120px; }
          100% { width: 0; }
        }
        @keyframes loadFadeText {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}} />
      <div className="loader-wrap">
        <div className="book-scene">
          <div className="book-cover-left">
            <div className="page-lines">
              <div className="line"></div>
              <div className="line line-short"></div>
              <div className="line"></div>
              <div className="line line-short"></div>
            </div>
          </div>
          <div className="book-cover-right">
            <div className="page-lines">
              <div className="line"></div>
              <div className="line line-short"></div>
              <div className="line line-orange"></div>
              <div className="line line-short"></div>
            </div>
          </div>
          <div className="page page-left">
            <div className="page-lines">
              <div className="line"></div>
              <div className="line line-short"></div>
              <div className="line"></div>
              <div className="line line-short"></div>
            </div>
          </div>
          <div className="page page-right">
            <div className="page-lines">
              <div className="line"></div>
              <div className="line line-short"></div>
              <div className="line line-orange"></div>
              <div className="line line-short"></div>
            </div>
          </div>
          <div className="page-flip"></div>
          <div className="spine"></div>
        </div>

        <div className="book-shadow"></div>

        <div className="brand-row">
          <span className="brand-light text-foreground">Let&apos;s</span><span className="brand-bold">Read</span>
        </div>
        <div className="underline-bar"></div>

        <div className="loading-text">Opening your book...</div>

        <div className="dots-row">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
