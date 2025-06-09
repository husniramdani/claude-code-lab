# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Claude AI agent experiments repository organized as a monorepo with the main content in `claude-code-lab/`:

- **`claude-code-lab/`**: Main project directory containing agent experiments and tutorials
- **`projects/YYYY-MM-project-name/`**: Individual agent projects with self-contained code and documentation  
- **`shared/`**: Shared utilities and helpers (currently empty)
- **Project Structure**: Each project has `README.md`, `agent.ts` (main code), and demo files

## Common Development Commands

```bash
# Setup and installation
cd claude-code-lab
pnpm install  # Always use pnpm, never npm

# Environment setup
cp .env.example .env
# Add CLAUDE_API_KEY to .env file

# Run a specific agent (example: summarizer)
cd projects/2025-06-claude-summarizer
pnpm exec ts-node agent.ts <file-path> [brief|standard|detailed]

# TypeScript compilation
pnpm exec tsc
```

## Key Technologies

- **Runtime**: Node.js 18+
- **Language**: TypeScript (all code is written in TypeScript)
- **Package Manager**: pnpm (always use pnpm, never npm)
- **Claude SDK**: `@anthropic-ai/sdk`
- **Environment**: dotenv for configuration

## Agent Development Patterns

1. **Main Agent Class**: Each project centers around a main class (e.g., `ClaudeSummarizer`)
2. **Environment Configuration**: All agents expect `CLAUDE_API_KEY` in environment variables
3. **Claude API Integration**: Direct API calls using fetch to `https://api.anthropic.com/v1/messages`
4. **Structured Responses**: Agents often return JSON-formatted responses
5. **Error Handling**: Comprehensive error handling for API failures and file operations

## Project Workflow

- Projects follow `YYYY-MM-project-name` naming convention
- Each project is self-contained with its own dependencies
- Documentation includes step-by-step build instructions and takeaways
- Focus on practical, runnable examples rather than theoretical concepts