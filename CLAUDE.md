# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a content creation repository for Medium articles and social media publishing, organized as a monorepo:

- **`articles/`**: Article content for Medium and social media publishing
  - **`YYYY-MM-article-title/`**: Individual articles with content, assets, and code examples
  - **`drafts/`**: Work-in-progress articles and ideas
- **`projects/`**: Standalone projects and demonstrations for showcasing in articles
- **`shared/`**: Shared utilities and helpers across articles and projects
- **Content Structure**: Articles include `article.md`, `README.md`, `assets/`, and `code/` directories

## Common Development Commands

```bash
# Setup and installation
cd claude-code-lab
pnpm install  # Always use pnpm, never npm

# Environment setup
cp .env.example .env
# Add CLAUDE_API_KEY to .env file

# Create new article
mkdir -p articles/YYYY-MM-article-title/{assets,code}
touch articles/YYYY-MM-article-title/{README.md,article.mdx}

# Create new project
mkdir -p projects/YYYY-MM-project-name/{src,demo}
touch projects/YYYY-MM-project-name/README.md

# TypeScript compilation
pnpm exec tsc
```

## Key Technologies

- **Runtime**: Node.js 18+
- **Language**: TypeScript (all code is written in TypeScript)
- **Package Manager**: pnpm (always use pnpm, never npm)
- **Claude SDK**: `@anthropic-ai/sdk`
- **Environment**: dotenv for configuration
- **Always use typescript**

## Content Development Patterns

1. **Article Structure**: Each article has a dedicated folder with content, code examples, and assets
2. **Environment Configuration**: Code examples expect `CLAUDE_API_KEY` in environment variables
3. **Claude API Integration**: Direct API calls using fetch to `https://api.anthropic.com/v1/messages`
4. **Practical Examples**: All code should be runnable and well-documented
5. **Error Handling**: Comprehensive error handling for API failures and file operations

## Content Workflow

### Articles
- Follow `YYYY-MM-article-title` naming convention
- Include `article.mdx` for main content (always use MDX format), `README.md` for metadata
- Store code examples in `code/` subdirectory
- Include images and diagrams in `assets/` subdirectory
- Track publication status and Medium/social media links
- Always use mdx file to generate an articles

### Projects
- Follow `YYYY-MM-project-name` naming convention
- Each project is self-contained and can be featured in articles
- Include comprehensive documentation and setup instructions
- Focus on practical, runnable examples that demonstrate concepts
- Suitable for showcasing on social media and in Medium articles