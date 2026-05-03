import React from 'react';
import { Separator } from 'react-resizable-panels';

export function ResizeHandle({ 
  className = '', 
  id 
}: { 
  className?: string;
  id?: string;
}) {
  return (
    <Separator
      className={`group relative flex w-1 items-center justify-center bg-[var(--border-app)] hover:bg-[var(--accent)] transition-colors duration-150 ${className}`}
      id={id}
    >
      <div className="z-10 flex h-6 w-1 items-center justify-center rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Separator>
  );
}
