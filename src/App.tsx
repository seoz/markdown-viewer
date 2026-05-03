/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Document, generateId, INITIAL_MARKDOWN } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';

export default function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocId, setCurrentDocId] = useState<string>('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'both' | 'edit' | 'preview'>('both');
  const [isDragging, setIsDragging] = useState(false);

  // Load documents from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('markwise_docs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDocuments(parsed);
        if (parsed.length > 0) {
          setCurrentDocId(parsed[0].id);
        }
      } catch (e) {
        console.error('Failed to parse saved documents', e);
      }
    } else {
      // Create initial doc
      const newDoc: Document = {
        id: generateId(),
        title: 'Welcome to MarkWise',
        content: INITIAL_MARKDOWN,
        updatedAt: Date.now(),
      };
      setDocuments([newDoc]);
      setCurrentDocId(newDoc.id);
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('markwise_docs', JSON.stringify(documents));
    }
  }, [documents]);

  const currentDoc = documents.find((doc) => doc.id === currentDocId) || documents[0];

  const updateCurrentDoc = useCallback((updates: Partial<Document>) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === currentDocId
          ? { ...doc, ...updates, updatedAt: Date.now() }
          : doc
      )
    );
  }, [currentDocId]);

  const createNewDoc = () => {
    const newDoc: Document = {
      id: generateId(),
      title: 'Untitled Document',
      content: '',
      updatedAt: Date.now(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDocId(newDoc.id);
    setViewMode('both');
  };

  const deleteDoc = (id: string) => {
    setDocuments((prev) => {
      const filtered = prev.filter((doc) => doc.id !== id);
      if (currentDocId === id && filtered.length > 0) {
        setCurrentDocId(filtered[0].id);
      } else if (filtered.length === 0) {
        const newDoc: Document = {
          id: generateId(),
          title: 'Welcome to MarkWise',
          content: INITIAL_MARKDOWN,
          updatedAt: Date.now(),
        };
        setCurrentDocId(newDoc.id);
        return [newDoc];
      }
      return filtered;
    });
  };

  const handleExport = () => {
    if (!currentDoc) return;
    const blob = new Blob([currentDoc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDoc.title || 'untitled'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (content: string, filename: string) => {
    const newDoc: Document = {
      id: generateId(),
      title: filename,
      content,
      updatedAt: Date.now(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setCurrentDocId(newDoc.id);
  };

  // Drag and Drop support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleImport(event.target?.result as string, file.name.replace(/\.md$/, ''));
      };
      reader.readAsText(file);
    }
  };

  if (!currentDoc) return null;

  return (
    <div 
      className="flex h-screen bg-[var(--bg-app)] text-[var(--ink)] overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <Sidebar
              documents={documents}
              currentDocId={currentDocId}
              onSelect={setCurrentDocId}
              onDelete={deleteDoc}
              onNew={createNewDoc}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0">
        <Toolbar
          currentDocTitle={currentDoc.title}
          onTitleChange={(title) => updateCurrentDoc({ title })}
          onExport={handleExport}
          onImport={handleImport}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="flex-1 flex overflow-hidden">
          {(viewMode === 'both' || viewMode === 'edit') && (
            <Editor
              content={currentDoc.content}
              onChange={(content) => updateCurrentDoc({ content })}
            />
          )}

          {(viewMode === 'both' || viewMode === 'preview') && (
            <Preview content={currentDoc.content} />
          )}
        </div>
      </main>

      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-16 border-2 border-dashed border-white/30 rounded-3xl text-white text-center"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload size={32} />
              </div>
              <p className="text-2xl font-medium tracking-tight">Drop to import document</p>
              <p className="text-white/50 mt-2 text-sm">Supports .md and .txt files</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

