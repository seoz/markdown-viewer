# MarkMark

MarkMark is a high-performance Markdown editor and previewer designed with a "Swiss Technical Modern" aesthetic. It prioritizes clarity, typography, and a seamless writing experience with local persistence and robust file handling.

![MarkMark Aesthetic](https://img.shields.io/badge/Aesthetic-Swiss%20Technical%20Modern-black?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite%20%2B%20Tailwind-blue?style=flat-square)

## ✨ Features

- **Technical Modern UI**: High-contrast design using Inter and JetBrains Mono fonts for a professional, code-centric feel.
- **Real-time Preview**: Instant rendering of Markdown with full GitHub-Flavored Markdown (GFM) support.
- **Local-First Persistence**: Your documents are automatically saved to `localStorage`, ensuring you never lose your progress.
- **Drag & Drop Support**: Seamlessly import `.md` and `.txt` files by dropping them anywhere on the editor.
- **Syntax Highlighting**: Beautifully highlighted code blocks within your Markdown documents using `react-syntax-highlighter`.
- **Fluid Animations**: Smooth state transitions and micro-interactions powered by `motion/react`.
- **Responsive Layout**: Optimized for both focused writing and side-by-side previewing.

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd markmark
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown) with `remark-gfm`
- **Syntax Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 📁 Project Structure

```text
src/
├── components/       # UI Components (Sidebar, Toolbar, Editor, Preview)
├── lib/             # Utility functions and shared logic
├── App.tsx          # Main application container
├── main.tsx         # Application entry point
└── index.css        # Global styles and Tailwind imports
```

## 🎨 Design Philosophy

MarkMark follows a **Swiss Technical Modern** aesthetic:
- **Typography**: `Inter` for UI; `JetBrains Mono` for technical data and code.
- **Contrast**: Bold blacks, whites, and varying shades of gray to create a focused environment.
- **Grid**: Strict adherence to alignment and whitespace to reduce cognitive load.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
