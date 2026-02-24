import React from 'react';

interface RainbowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href?: string;
}

export const RainbowButton = ({ children, href, className = '', ...props }: RainbowButtonProps) => {
  return (
    <>
      <style>{`
        .rainbow-border {
          position: relative;
          z-index: 0;
        }
        .rainbow-border::before,
        .rainbow-border::after {
          content: '';
          position: absolute;
          left: -2px;
          top: -2px;
          border-radius: 999px;
          background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
          background-size: 400%;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          z-index: -1;
          animation: rainbow 20s linear infinite;
        }
        .rainbow-border::after {
          filter: blur(12px);
          opacity: 0.6;
        }
        @keyframes rainbow {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
      <a
        href={href}
        className={`rainbow-border inline-flex items-center justify-center gap-2 h-14 px-10 bg-zinc-900 text-white text-lg font-semibold rounded-full cursor-pointer transition-all duration-200 hover:bg-zinc-800 ${className}`}
        {...props}
      >
        {children}
      </a>
    </>
  );
};
