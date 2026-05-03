import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Document {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const INITIAL_MARKDOWN = `# Welcome to MarkMark

A fast, technical-first markdown editor.

## Key Features
- **Live Preview**: See your changes in real-time.
- **Drag & Drop**: Drop any \`.md\` file into the window to read it.
- **Persistent**: Your work stays in your browser.
- **Modern UI**: Clean, distraction-free interface.

---

### Code Examples
\`\`\`typescript
const greeting = "Hello, MarkMark!";
console.log(greeting);
\`\`\`

### Tables
| Feature | Supported |
| :--- | :---: |
| GFM | Yes |
| Persistence | Yes |
| Vibes | 100% |
`;
