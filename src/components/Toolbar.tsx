import React from 'react';
import { Download, Upload, Share2, PanelLeft, Eye, Edit3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ToolbarProps {
  currentDocTitle: string;
  onTitleChange: (title: string) => void;
  onExport: () => void;
  onImport: (content: string, filename: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  viewMode: 'both' | 'edit' | 'preview';
  setViewMode: (mode: 'both' | 'edit' | 'preview') => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentDocTitle,
  onTitleChange,
  onExport,
  onImport,
  isSidebarOpen,
  setSidebarOpen,
  viewMode,
  setViewMode,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onImport(content, file.name.replace(/\.md$/, ''));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-14 border-b border-[var(--border-app)] bg-white flex items-center px-4 justify-between shrink-0 z-10">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className={cn(
            "p-2 rounded-md transition-colors hover:bg-neutral-100",
            !isSidebarOpen && "text-neutral-400"
          )}
        >
          <PanelLeft size={20} />
        </button>
        <div className="h-6 w-[1px] bg-[var(--border-app)] mx-2" />
        <input
          type="text"
          className="text-sm font-medium focus:outline-none bg-transparent w-48 md:w-64 truncate"
          value={currentDocTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Document"
        />
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden md:flex items-center bg-neutral-100 p-1 rounded-lg mr-4">
          <button
            onClick={() => setViewMode('edit')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all font-medium",
              viewMode === 'edit' ? "bg-white shadow-sm text-black" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <Edit3 size={14} className="inline mr-1" /> Edit
          </button>
          <button
            onClick={() => setViewMode('both')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all font-medium",
              viewMode === 'both' ? "bg-white shadow-sm text-black" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Both
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              "px-3 py-1 text-xs rounded-md transition-all font-medium",
              viewMode === 'preview' ? "bg-white shadow-sm text-black" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <Eye size={14} className="inline mr-1" /> View
          </button>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-md transition-all"
          title="Import JSON/MD"
        >
          <Upload size={18} />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".md,.txt"
            onChange={handleFileUpload}
          />
        </button>
        <button
          onClick={onExport}
          className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-md transition-all"
          title="Download Markdown"
        >
          <Download size={18} />
        </button>
        <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-md transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};
