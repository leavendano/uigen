# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Setup and Installation:**
```bash
npm run setup  # Install dependencies, generate Prisma client, run migrations
```

**Development:**
```bash
npm run dev                    # Start development server with Turbopack
npm run dev:daemon            # Start dev server in background, logs to logs.txt
```

**Build and Deploy:**
```bash
npm run build                 # Build for production
npm run start                 # Start production server
```

**Testing and Quality:**
```bash
npm run test                  # Run Vitest tests
npm run lint                  # Run ESLint
```

**Database:**
```bash
npm run db:reset              # Reset database (force migrate reset)
npx prisma generate           # Generate Prisma client
npx prisma migrate dev        # Run database migrations
```

## Architecture Overview

UIGen is an AI-powered React component generator built with Next.js 15 that uses a virtual file system to create and preview components without writing files to disk.

### Core Architecture Components

**Virtual File System (`src/lib/file-system.ts`):**
- In-memory file system that doesn't write to disk
- Supports file operations (create, read, update, delete, rename)
- Serialization/deserialization for persistence
- Used for component generation and editing

**Context Providers:**
- `FileSystemProvider` (`src/lib/contexts/file-system-context.tsx`): Manages virtual file system state
- `ChatProvider` (`src/lib/contexts/chat-context.tsx`): Handles AI chat integration with file system

**AI Integration:**
- Uses Anthropic Claude via Vercel AI SDK
- Tool calling system for file operations (`str_replace_editor`, `file_manager`)
- Chat interface handles tool calls to modify virtual file system

**Database (Prisma + SQLite):**
- `User` model: Authentication with email/password
- `Project` model: Stores chat messages and file system state as JSON
- Generated client output: `src/generated/prisma/`

**Key UI Components:**
- `ChatInterface`: Main chat UI for AI interaction
- `CodeEditor`: Monaco editor for code editing
- `PreviewFrame`: Live preview of generated components
- `FileTree`: Virtual file system browser

### Application Flow

1. User describes component in chat interface
2. AI generates code using tool calls
3. Tool calls modify virtual file system
4. Changes trigger live preview updates
5. Project state persisted to database (for registered users)

### Testing Setup

- Vitest with jsdom environment
- React Testing Library for component tests
- Tests located in `__tests__` directories alongside components
- Test setup is in file vitest.config.mts

### Environment Configuration

- Optional `ANTHROPIC_API_KEY` in `.env`
- Project works without API key (returns static code instead of AI-generated)
- Database: SQLite with Prisma ORM

## Code Writing Guidelines

- Use comments sparingly. Only comment complex code.

## Database Information

- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime when you need to understand the structure of data stored in the database.