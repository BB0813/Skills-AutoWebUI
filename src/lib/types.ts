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
}

export type SupportedIDE = "cursor" | "vscode" | "trae" | "windsurf";

export const IDE_CONFIG: Record<SupportedIDE, { name: string; extension: string; format: "markdown" | "json" }> = {
  cursor: { name: "Cursor", extension: ".mdc", format: "markdown" },
  vscode: { name: "VS Code", extension: ".code-snippets", format: "json" },
  trae: { name: "Trae", extension: ".zip", format: "markdown" },
  windsurf: { name: "Windsurf", extension: ".md", format: "markdown" },
};
