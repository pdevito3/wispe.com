# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation website for Wispe (React component library) built with:
- **React 19** with TypeScript
- **TanStack Router** for file-based routing
- **TanStack Query** for data fetching
- **Vite** for build tooling and development server
- **Tailwind CSS** for styling
- **MDX** for documentation content
- **Vitest** for testing
- **pnpm** as package manager

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on port 4777)
pnpm start
# or
pnpm dev

# Build for production (runs TypeScript check + Vite build)
pnpm build

# Run tests
pnpm test

# Preview production build
pnpm serve
```

## Architecture

### Routing Structure
- File-based routing with TanStack Router in `src/routes/`
- Root layout in `src/routes/__root.tsx` includes QueryClient provider and dark theme
- Documentation routes in `src/routes/docs/` with MDX support
- Route tree auto-generated in `src/routeTree.gen.ts`

### Component Organization
- UI components in `src/components/ui/` (shadcn/ui style)
- Example components in `src/components/examples/` demonstrating Wispe library usage
- MDX-specific components in `src/components/mdx/`
- Documentation sidebar and navigation components

### Styling
- Tailwind CSS with custom configuration
- Path alias `@/*` maps to `./src/*`
- Typography and component styles in separate CSS files

### MDX Integration
- Custom MDX setup with heading extraction for table of contents
- Rehype plugins for auto-linking headings and CSS class injection
- Documentation pages written as `.mdx` files with corresponding `.tsx` route files

### Data Sources
- Sample datasets in `src/datasets/` (books, fruit, users)
- Used for component examples and demonstrations

## Key Libraries
- `@wispe/wispe-react`: Main component library being documented
- `@tanstack/react-router`: File-based routing
- `@tanstack/react-query`: Data fetching and caching
- `@radix-ui/*`: Headless UI primitives
- `framer-motion`: Animations
- `react-hook-form`: Form handling

## Testing
- Vitest with jsdom environment
- Testing Library for React components
- Global test configuration in vite.config.js