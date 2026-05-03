import React from 'react';
import { Plus, FileText, Trash2, Search } from 'lucide-react';
import { Document } from '../lib/utils';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  documents: Document[];
  currentDocId: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  currentDocId,
  onSelect,
  onDelete,
  onNew,
}) => {
  const [search, setSearch] = React.useState('');

  const filteredDocs = documents
    .filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="w-64 flex flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-app)] h-screen overflow-hidden">
      <div className="p-6 border-b border-[var(--border-app)] bg-white/50">
        <div className="flex items-center space-x-2 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white font-bold text-lg italic">
            M
          </div>
          <span className="text-lg font-bold tracking-tight">MarkMark</span>
        </div>
        <p className="technical-label text-[8px]">Minimalist Markdown Engine</p>
      </div>

      <div className="p-4 border-b border-[var(--border-app)]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium tracking-tight">Documents</span>
          <button
            onClick={onNew}
            className="p-1 hover:bg-neutral-200 rounded-md transition-colors text-neutral-600"
            title="New Document"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white border border-[var(--border-app)] rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all font-sans"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {filteredDocs.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "group relative flex items-center px-4 py-3 cursor-pointer transition-all border-l-2",
                currentDocId === doc.id
                  ? "bg-white border-[var(--accent)] text-[var(--ink)]"
                  : "hover:bg-neutral-200 border-transparent text-neutral-500"
              )}
              onClick={() => onSelect(doc.id)}
            >
              <FileText size={16} className="mr-3 opacity-60" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate leading-none mb-1">
                  {doc.title || "Untitled"}
                </p>
                <p className="technical-label text-[9px]">
                  {new Date(doc.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(doc.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-[var(--border-app)] flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="technical-label">MarkMark Local</span>
        </div>
        <p className="technical-label text-[7px] opacity-50">Built by Daniel Seo</p>
      </div>
    </div>
  );
};
