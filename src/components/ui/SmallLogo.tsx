"use client";

import React from 'react';

export function SmallLogo() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes openLeft {
          0%   { transform: perspective(200px) rotateY(-5deg); }
          30%  { transform: perspective(200px) rotateY(-50deg); }
          70%  { transform: perspective(200px) rotateY(-50deg); }
          100% { transform: perspective(200px) rotateY(-5deg); }
        }
        @keyframes openRight {
          0%   { transform: perspective(200px) rotateY(5deg); }
          30%  { transform: perspective(200px) rotateY(50deg); }
          70%  { transform: perspective(200px) rotateY(50deg); }
          100% { transform: perspective(200px) rotateY(5deg); }
        }
        @keyframes flipPage {
          0%   { transform: perspective(200px) rotateY(0deg); opacity:1; }
          20%  { transform: perspective(200px) rotateY(-90deg); opacity:0.3; }
          40%  { transform: perspective(200px) rotateY(-180deg); opacity:1; }
          60%  { transform: perspective(200px) rotateY(-180deg); opacity:1; }
          80%  { transform: perspective(200px) rotateY(-90deg); opacity:0.3; }
          100% { transform: perspective(200px) rotateY(0deg); opacity:1; }
        }

        .small-logo-wrap {
          position: relative;
          width: 32px; height: 24px;
        }
        .small-logo-wrap > div {
          position: absolute; bottom: 0;
        }
        .small-logo-cover-l {
          left:0; width:14px; height:20px; background: #007F78; border-radius: 2px;
          transform-origin:right center; animation: openLeft 2.4s ease-in-out infinite;
        }
        .small-logo-cover-r {
          right:0; width:14px; height:20px; background: #007F78; border-radius: 2px;
          transform-origin:left center; animation: openRight 2.4s ease-in-out infinite;
        }
        .small-logo-page-l {
          left:1px; width:13px; height:18px; background: #fff; border: 0.5px solid #D3D1C7;
          border-radius:1px 0 0 1px;
        }
        .small-logo-page-r {
          right:1px; width:13px; height:18px; background: #fff; border: 0.5px solid #D3D1C7;
          border-radius:0 1px 1px 1px;
        }
        .small-logo-spine {
          left:50%; transform:translateX(-50%); width:2px; height:20px; background: #203233;
          border-radius: 1px; z-index: 2;
        }
        .small-logo-flip {
          left:50%; width:12px; height:17px; background: #FFDE68; border-radius:0 1px 1px 0;
          transform-origin: left center; z-index: 3;
          animation: flipPage 2.4s ease-in-out infinite;
        }
        .small-logo-dot {
          width:3px; height:3px; right:4px; bottom:8px; background: #FFB018; border-radius: 50%;
          position: absolute;
        }
      `}} />
      <div className="small-logo-wrap">
        <div className="small-logo-cover-l"></div>
        <div className="small-logo-cover-r"></div>
        <div className="small-logo-page-l"></div>
        <div className="small-logo-page-r"></div>
        <div className="small-logo-flip"></div>
        <div className="small-logo-spine"></div>
        <div className="small-logo-dot"></div>
      </div>
    </>
  );
}
