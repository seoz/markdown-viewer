# System Design: MarkWise Markdown Editor

MarkWise is a high-performance, local-first Markdown editor built with modern web technologies. This document outlines the architectural decisions, design philosophy, and technical implementation details for review.

## 1. System Overview

MarkWise is a Single Page Application (SPA) designed for technical users who need a fast, reliable, and distraction-free environment for writing and previewing Markdown. It follows a "Swiss Technical Modern" aesthetic, prioritizing typography and whitespace.

### Core Features
- **Live Preview**: Dual-pane layout for real-time visualization of Markdown rendering.
- **Local-First Persistence**: Automatic saving to `localStorage` to ensure data persists across sessions.
- **File Interoperability**: Support for exporting documents as `.md` files and importing via drag-and-drop.
- **Responsive Workspace**: Flexible layout with resizable panels and multiple view modes (Editor-only, Preview-only, or Shared).

## 2. Architecture & Component Structure

The application follows a modular React component architecture, emphasizing separation of concerns and maintainability.

### High-Level Component Map
- `App.tsx`: The orchestrator. Manages the global state, document orchestration, and layout logic.
- `Sidebar.tsx`: Handles document navigation, listing, and global actions like creating new documents.
- `Toolbar.tsx`: Contextual actions for the current document (title editing, view toggling, export/import).
- `Editor.tsx`: A focused environment for raw text input.
- `Preview.tsx`: Renders the Markdown content into a polished, styled interface using `react-markdown`.
- `ResizeHandle.tsx`: Custom implementation for the `react-resizable-panels` interaction.

### Data Flow
1. **Source of Truth**: `App.tsx` maintains a `documents` array and a `currentDocId`.
2. **Synchronization**: On every change, the state is updated and subsequently mirrored to `localStorage`.
3. **Distribution**: Components receive specific slices of state or callback functions to trigger updates (e.g., `updateCurrentDoc`).

## 3. Technical Stack

| Technology | Role | Rationale |
| :--- | :--- | :--- |
| **React 19** | View Layer | Latest features, improved performance, and robust ecosystem. |
| **TypeScript** | Type Safety | Enforces strict data models for `Document` and component props, reducing runtime errors. |
| **Vite** | Build Tool | Extremely fast HMR and optimized production builds. |
| **Tailwind CSS** | Styling | Utility-first approach for rapid, consistent UI development without custom CSS overhead. |
| **Motion** | Animations | Smooth Spring-based transitions for UI state changes (Sidebar, overlays). |
| **React Resizable Panels** | Layout | Accessible, performant implementation for the split-pane editor view. |
| **Lucide React** | Icons | Clean, consistent iconography that fits the technical aesthetic. |

## 4. Key Design Decisions

### Local-First Persistence
Instead of requiring a backend immediately, the app utilizes `localStorage`.
- **Decision**: JSON serialization of the document collection.
- **Trade-off**: Simple to implement and zero latency. However, it is limited by browser storage quotas (~5MB) and device specificity.

### UI/UX: The "Swiss Technical Modern" Aesthetic
The design intentionally avoids the generic "Material" or "Bootstrap" look.
- **Typography**: Heavily relies on **Inter** for readability in the UI and **JetBrains Mono** for the technical essence in the editor and metadata.
- **Contrast**: High-contrast monochromatic palette (Slate/Zinc) with subtle borders and shadows to define depth without clutter.
- **Motion**: Uses spring animations for the sidebar and backdrop overlays to provide physical weight to the interface.

### Drag and Drop Implementation
To maximize utility, a global drag-and-drop handler is implemented at the root level (`App.tsx`).
- **Interaction**: A stylized backdrop Blur overlay appears when a file is hovered over the window, providing immediate visual feedback.
- **Parsing**: Asynchronously reads the file content using the `FileReader` API and injects it into the editor as a new document.

## 5. Persistence & Data Modeling

The data model is lean:
```typescript
interface Document {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}
```
Documents are stored in an array, allowing for O(1) retrieval of the current document using the ID-based selection pattern.

## 6. Future Roadmap & Scalability

If this were to evolve into a production-scale enterprise product, the next steps would be:

1. **Firebase/Firestore Integration**: Syncing documents to a cloud backend for cross-device access and real-time collaboration.
2. **Advanced Editor Features**: Integrating a code editor like Monaco (VS Code core) for better highlighting and command support.
3. **Search & Indexing**: Implementing a client-side search engine (e.g., Fuse.js) for finding documents in large collections.
4. **Version History**: Snapshots or CRDT-based versioning for document tracking.
