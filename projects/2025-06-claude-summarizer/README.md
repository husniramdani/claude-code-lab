# Claude Summarizer Agent 📝

An intelligent document summarization agent built with Claude Code that can process various file formats and generate concise, meaningful summaries.

## What It Does

This agent demonstrates how to build a smart summarization tool using Claude's advanced language understanding. It can:
- Process multiple document formats (txt, md, pdf)
- Generate summaries of different lengths (brief, standard, detailed)
- Extract key points and action items
- Maintain context across large documents

## Key Claude Code Features Used

- **Tool Use**: Leveraging file reading and processing tools
- **Context Management**: Efficiently handling large documents within token limits
- **Prompt Engineering**: Crafting effective summarization prompts
- **Workflow Automation**: Chaining multiple operations for complete processing

## Step-by-Step Build

### 1. Setup Environment

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Add your CLAUDE_API_KEY to .env
```

### 2. Agent Configuration

```typescript
// agent.ts
import { ClaudeAgent } from '@anthropic/claude-sdk';

const agent = new ClaudeAgent({
  apiKey: process.env.CLAUDE_API_KEY,
  model: 'claude-3-opus-20240229',
  tools: ['file_reader', 'text_processor']
});
```

### 3. Core Summarization Logic

```typescript
async function summarizeDocument(filePath: string, style: 'brief' | 'standard' | 'detailed') {
  // Read the document
  const content = await agent.readFile(filePath);
  
  // Process with Claude
  const summary = await agent.complete({
    prompt: `Summarize this document in a ${style} format...`,
    context: content
  });
  
  return summary;
}
```

### 4. Running the Agent

```bash
# Summarize a single document
pnpm run summarize --file ./docs/example.md --style brief

# Batch process multiple files
pnpm run summarize --dir ./documents --output ./summaries
```

## Demo / Outcome

Input document (2000 words) → **Brief Summary (150 words)**

Key features demonstrated:
- Maintains document structure and key points
- Preserves technical accuracy
- Identifies action items and decisions
- Formats output for easy scanning

## Code Structure

```
2025-06-claude-summarizer/
├── agent.ts          # Main agent logic
├── utils.ts          # Helper functions
├── prompts.ts        # Summarization prompts
├── .env.example      # Environment template
└── test/             # Example documents
```

## Takeaways

1. **Token Management**: Large documents require careful chunking to stay within limits
2. **Prompt Design**: Specific instructions yield better summaries
3. **Output Formatting**: Structured output improves usability
4. **Error Handling**: Always handle API limits and edge cases

## Next Steps

- Add support for more file formats (docx, html)
- Implement multi-language summarization
- Create a web interface for easier access
- Add custom summarization templates

---

👉 **Try it yourself**: Clone this project and experiment with your own documents!

🐦 [Share on Twitter](https://twitter.com/intent/tweet?text=Check%20out%20this%20Claude%20Summarizer%20Agent) | 💬 [Discuss on GitHub](https://github.com/yourusername/claude-code-lab/discussions)