export type ProviderType = "openai" | "newapi" | "openwebui" | "custom";

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  baseUrl: string;
  apiKey: string;
  model: string;
}

export interface Config {
  providers: Provider[];
  activeProvider: string | null;
  clientSideRequest?: boolean;
}

export type SupportedIDE = "cursor" | "vscode" | "trae" | "windsurf" | "claude-code" | "codex-cli";

export const IDE_CONFIG: Record<SupportedIDE, { name: string; extension: string; format: "markdown" | "json" }> = {
  cursor: { name: "Cursor", extension: ".mdc", format: "markdown" },
  vscode: { name: "VS Code", extension: ".code-snippets", format: "json" },
  trae: { name: "Trae", extension: ".zip", format: "markdown" },
  windsurf: { name: "Windsurf", extension: ".md", format: "markdown" },
  "claude-code": { name: "Claude Code", extension: ".md", format: "markdown" },
  "codex-cli": { name: "Codex CLI", extension: ".md", format: "markdown" },
};
