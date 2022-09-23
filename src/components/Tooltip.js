import * as React from 'react';

export default function Tooltip({ children, tooltipText }) {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
  }
  if (tooltipText) {
    return (
      <div className="relative cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          className="absolute w-36 -left-1/4 bottom-full text-sm text-zinc-100 bg-zinc-700 px-4 py-2 rounded transition duration-150 ease-out z-50"
          style={{ opacity: 0 }}
          ref={tipRef}
        >
          {tooltipText}
        </div>
        {children}
      </div>
    );
  }
  return children;
}
