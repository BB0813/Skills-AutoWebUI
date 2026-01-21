import { SupportedIDE, IDE_CONFIG } from './types';

export function constructSystemPrompt(targetIDE: SupportedIDE, skillName: string): string {
    const ideSettings = IDE_CONFIG[targetIDE];
    const finalSkillName = skillName ? skillName.toLowerCase().replace(/[^a-z0-9-]/g, '-') : "untitled-skill";

    let systemPrompt = `You are an expert developer assistant specializing in creating configuration files and skills for AI Agents and IDEs.
    The user wants to generate a skill/snippet for: ${ideSettings.name}.
    Target format: ${ideSettings.format}.
    
    CRITICAL INSTRUCTIONS:
    1. Return ONLY the raw code/content. Do not include markdown code blocks (like \`\`\`) unless it's part of the file syntax itself.
    2. Do NOT output any "thinking process" or content inside <think></think> tags.
    `;

    if (targetIDE === 'vscode') {
      systemPrompt += `
      For VS Code, generate a valid JSON snippet file content.
      Structure:
      {
        "${skillName || 'Skill Name'}": {
          "prefix": "...",
          "body": ["line1", "line2"],
          "description": "..."
        }
      }
      Ensure proper JSON escaping.`;
    } else if (targetIDE === 'cursor') {
       systemPrompt += `
       For Cursor, generate a .mdc rule file.
       It should include clear markdown instructions, examples, and globs if applicable.`;
    } else if (targetIDE === 'trae') {
       systemPrompt += `
       For Trae, you MUST generate a standard "Agent Skill" file (SKILL.md) following the Anthropic Agent Skills specification.
       
       STRICT FILE STRUCTURE:
       
       ---
       name: ${finalSkillName}
       description: [A clear, concise description of what this skill does and when to use it]
       ---

       # [Skill Name]

       [Detailed instructions and context for the Agent]

       ## Instructions
       1. Step-by-step logic for the agent to follow.
       2. ...

       ## Examples
       - **User**: [Example input]
         **Agent**: [Example behavior/output]

       ## Guidelines
       - [Constraint or Best Practice 1]
       - [Constraint or Best Practice 2]
       
       REQUIREMENTS:
       - The 'name' in frontmatter MUST be kebab-case (e.g., 'code-review-helper').
       - The 'description' MUST be informative.
       - Use H2 (##) for sections.
       - The content should be instructional for an AI agent, not for a human. Tell the agent HOW to think and act.
       `;
    } else if (targetIDE === 'windsurf') {
        systemPrompt += `
        For Windsurf, generate a standard markdown rule file (.md).
        Focus on providing clear context and rules for the agent.
        `;
    }

    return systemPrompt;
}

export function cleanLLMResponse(content: string): string {
    // Filter out <think> tags (MiniMax-M2.1 specific)
    let cleaned = content.replace(/<think>[\s\S]*?<\/think>/g, '');

    // Basic cleanup to remove code fences if the LLM added them despite instructions
    // We check if the WHOLE content is wrapped in a single code block
    const codeBlockRegex = /^```(?:json|markdown|yaml|xml)?\s*([\s\S]*?)\s*```$/;
    const match = cleaned.trim().match(codeBlockRegex);
    if (match) {
        cleaned = match[1];
    }
    
    return cleaned;
}