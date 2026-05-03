# Project Instructions & Conventions

## Security First
- **Secrets & API Keys**: NEVER hardcode API keys, secrets, or sensitive configuration in source code. Always use environment variables (`import.meta.env` for Vite client-side, `process.env` for server-side).
- **Environment Variables**: When adding new configuration, always update `.env.example` with placeholders.
- **Data Validation**: Always validate user input on both the client and via Firestore Security Rules.
- **AI Safety**: Use delimiters and strict system instructions in AI service calls to prevent prompt injection.

## Firebase Guidelines
- **Security Rules**: Every Firestore collection must have a corresponding security rule that enforces identity (ownership) and schema validation.
- **Initialization**: Use the pattern established in `src/lib/firebase.ts` which checks for required environment variables at runtime.

## UI & Design System (MarkMark Aesthetic)
- **Design Aesthetic**: Follow a "Swiss Technical Modern" style. This means high contrast (Black/White/Gray), generous whitespace, and a focus on typography.
- **Fonts**: 
  - Primary: `Inter` (sans-serif) for UI and content.
  - Secondary/Tech: `JetBrains Mono` for code, labels, and metadata.
- **Icons**: Use `lucide-react` exclusively.
- **Animations**: Use `motion/react` for all state transitions (e.g., sidebar toggles, document deletions, drag-and-drop overlays).
- **Utility Classes**: Use Tailwind CSS for 100% of the styling. Avoid custom CSS files except for `index.css` global variables.

## Feature Implementation Patterns
- **Local Persistence**: For local-first features, use `localStorage` with robust error handling for JSON parsing.
- **Markdown Rendering**: Use `react-markdown` with `remark-gfm` for GitHub-Flavored Markdown support.
- **Code Highlighting**: Use `react-syntax-highlighter` with the `atomDark` or similar high-contrast dark theme for pre-blocks.
- **Drag & Drop**: Maintain global drag-and-drop support for `.md` and `.txt` files with the established backdrop overlay pattern.

## Code Structure
- **Components**: Functional components only. 
- **Utilities**: Keep purely logic-based functions (ID generation, constants) in `src/lib/utils.ts`.
- **Modularity**: Split large views into smaller components (e.g., `Toolbar`, `Sidebar`, `Editor`, `Preview`) to maintain readability.
