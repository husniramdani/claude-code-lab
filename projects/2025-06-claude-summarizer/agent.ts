import { config } from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

config();

interface SummaryOptions {
  style: 'brief' | 'standard' | 'detailed';
  extractKeyPoints?: boolean;
  extractActionItems?: boolean;
}

interface SummaryResult {
  summary: string;
  keyPoints?: string[];
  actionItems?: string[];
  wordCount: {
    original: number;
    summary: number;
  };
}

class ClaudeSummarizer {
  private apiKey: string;
  private model: string;

  constructor() {
    if (!process.env.CLAUDE_API_KEY) {
      throw new Error('CLAUDE_API_KEY is required in environment variables');
    }
    this.apiKey = process.env.CLAUDE_API_KEY;
    this.model = 'claude-3-opus-20240229';
  }

  async summarizeFile(filePath: string, options: SummaryOptions): Promise<SummaryResult> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const originalWordCount = content.split(/\s+/).length;

      const prompt = this.buildPrompt(content, options);
      const summary = await this.callClaude(prompt);

      const result: SummaryResult = {
        summary: summary.summary,
        wordCount: {
          original: originalWordCount,
          summary: summary.summary.split(/\s+/).length
        }
      };

      if (options.extractKeyPoints) {
        result.keyPoints = summary.keyPoints;
      }

      if (options.extractActionItems) {
        result.actionItems = summary.actionItems;
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to summarize file: ${error.message}`);
    }
  }

  private buildPrompt(content: string, options: SummaryOptions): string {
    const styleInstructions = {
      brief: 'Create a brief summary (150-200 words) highlighting only the most critical points.',
      standard: 'Create a standard summary (300-500 words) covering main points and key details.',
      detailed: 'Create a comprehensive summary (700-1000 words) including all important information.'
    };

    let prompt = `Please summarize the following document. ${styleInstructions[options.style]}\n\n`;

    if (options.extractKeyPoints) {
      prompt += 'Also extract 3-5 key points as a bullet list.\n';
    }

    if (options.extractActionItems) {
      prompt += 'Also extract any action items or next steps mentioned.\n';
    }

    prompt += `\nDocument to summarize:\n${content}\n\n`;
    prompt += 'Return the response in JSON format with keys: summary, keyPoints (if requested), actionItems (if requested).';

    return prompt;
  }

  private async callClaude(prompt: string): Promise<any> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.content[0].text);
  }

  async summarizeBatch(directory: string, outputDir: string, options: SummaryOptions): Promise<void> {
    const files = await this.getMarkdownFiles(directory);
    
    for (const file of files) {
      console.log(`Processing: ${file}`);
      const result = await this.summarizeFile(join(directory, file), options);
      
      const outputPath = join(outputDir, `${file.replace(/\.[^.]+$/, '')}_summary.json`);
      await writeFile(outputPath, JSON.stringify(result, null, 2));
      
      console.log(`✓ Saved summary to: ${outputPath}`);
    }
  }

  private async getMarkdownFiles(directory: string): Promise<string[]> {
    const { readdir } = await import('fs/promises');
    const files = await readdir(directory);
    return files.filter(file => file.endsWith('.md') || file.endsWith('.txt'));
  }
}

export default ClaudeSummarizer;

if (require.main === module) {
  const summarizer = new ClaudeSummarizer();
  
  const args = process.argv.slice(2);
  const filePath = args[0];
  const style = (args[1] as 'brief' | 'standard' | 'detailed') || 'standard';
  
  if (!filePath) {
    console.error('Usage: ts-node agent.ts <file-path> [brief|standard|detailed]');
    process.exit(1);
  }
  
  summarizer.summarizeFile(filePath, {
    style,
    extractKeyPoints: true,
    extractActionItems: true
  })
    .then(result => {
      console.log('\n📝 Summary:');
      console.log(result.summary);
      
      if (result.keyPoints) {
        console.log('\n🔑 Key Points:');
        result.keyPoints.forEach(point => console.log(`  • ${point}`));
      }
      
      if (result.actionItems) {
        console.log('\n✅ Action Items:');
        result.actionItems.forEach(item => console.log(`  • ${item}`));
      }
      
      console.log(`\n📊 Word count: ${result.wordCount.original} → ${result.wordCount.summary}`);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}