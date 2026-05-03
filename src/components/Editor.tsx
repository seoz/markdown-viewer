import React from 'react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[var(--bg-app)]">
      <textarea
        className="flex-1 w-full p-8 md:p-10 font-mono text-[14px] leading-relaxed resize-none focus:outline-none bg-transparent selection:bg-neutral-200"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing markdown..."
        spellCheck={false}
      />
    </div>
  );
};
