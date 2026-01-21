import { SupportedIDE, IDE_CONFIG } from './types';

export function constructSystemPrompt(targetIDE: SupportedIDE, skillName: string): string {
    const ideSettings = IDE_CONFIG[targetIDE];
    const finalSkillName = skillName || "Untitled Skill";

    let systemPrompt = `You are an expert developer assistant specializing in creating configuration files and skills for IDEs.
    The user wants to generate a skill/snippet for: ${ideSettings.name}.
    Target format: ${ideSettings.format}.
    
    Requirements:
    1. Return ONLY the raw code/content. Do not include markdown code blocks (like \`\`\`) unless it's part of the file syntax itself (e.g. markdown file).
    2. If the target is JSON (VS Code), ensure it is valid JSON with proper escaping.
    3. If the target is Markdown (Cursor/Windsurf), ensure it follows best practices for that tool's system prompts/rules.
    4. For Trae, generate a standard markdown skill file structure.
    5. CRITICAL: Do NOT output any "thinking process" or content inside <think></think> tags. Only output the final result.
    `;

    if (targetIDE === 'vscode') {
      systemPrompt += `
      For VS Code, generate a valid JSON snippet file content. Example structure:
      {
        "${finalSkillName}": {
          "prefix": "...",
          "body": ["line1", "line2"],
          "description": "..."
        }
      }`;
    } else if (targetIDE === 'cursor') {
       systemPrompt += `
       For Cursor, generate a .mdc rule file. It should include frontmatter if applicable, or just clear markdown instructions that Cursor can index.`;
    } else if (targetIDE === 'trae') {
       systemPrompt += `
       For Trae, generate a markdown skill file that MUST include a YAML frontmatter block at the top with 'name' and 'description'.
       Use the following name: "${finalSkillName}"
       Generate a concise but descriptive 'description' automatically based on the user's prompt.
       
       Example:
       ---
       name: ${finalSkillName}
       description: [Your generated description here]
       ---
       
       # Skill Content
       ...
       `;
    }

    return systemPrompt;
}

export function cleanLLMResponse(content: string): string {
    // Filter out <think> tags (MiniMax-M2.1 specific)
    let cleaned = content.replace(/<think>[\s\S]*?<\/think>/g, '');

    // Basic cleanup to remove code fences if the LLM added them despite instructions
    if (cleaned.startsWith('```') && cleaned.endsWith('```')) {
        const lines = cleaned.split('\n');
        if (lines.length >= 2) {
            cleaned = lines.slice(1, -1).join('\n');
        }
    } else if (cleaned.startsWith('```json')) {
        const lines = cleaned.split('\n');
        cleaned = lines.slice(1, -1).join('\n');
    }
    
    return cleaned;
}