export const en = {
  common: {
    loading: "Loading...",
    save: "Save Changes",
    saved: "Saved successfully",
    error: "Error occurred",
    copy: "Copy",
    delete: "Delete",
    back: "Back",
  },
  home: {
    title: "Skills AutoWebUI",
    subtitle: "Automated Skills Generation System",
    generator: {
      title: "Generator",
      desc: "Generate new Skills using LLM providers.",
    },
    settings: {
      title: "Settings",
      desc: "Configure LLM providers and API keys.",
    },
  },
  settings: {
    title: "Settings",
    providers: "LLM Providers",
    addProvider: "Add Provider",
    noProviders: "No providers configured. Click \"Add Provider\" to get started.",
    fields: {
      name: "Name",
      type: "Type",
      baseUrl: "Base URL",
      apiKey: "API Key",
      model: "Model",
    },
    actions: {
      setActive: "Set as Active",
      remove: "Remove",
    },
  },
  generator: {
    title: "Skill Generator",
    prompt: {
      label: "Prompt",
      skillNameLabel: "Skill Name",
      skillNamePlaceholder: "e.g. CodeMap",
      placeholder: "Describe the skill you want to generate (e.g., 'A skill to parse CSV files and extract emails')...",
      button: "Generate Skill",
      generating: "Generating...",
      ideLabel: "Target IDE",
    },
    output: {
      label: "Output",
      placeholder: "// Generated code will appear here...",
      saveButton: "Save to File",
      saving: "Saving...",
      saved: "Saved to output/",
    },
  },
  ide: {
    cursor: "Cursor",
    vscode: "VS Code",
    trae: "Trae",
    windsurf: "Windsurf",
    "claude-code": "Claude Code",
    "codex-cli": "Codex CLI",
  },
};

export const zh = {
  common: {
    loading: "加载中...",
    save: "保存更改",
    saved: "保存成功",
    error: "发生错误",
    copy: "复制",
    delete: "删除",
    back: "返回",
  },
  home: {
    title: "Skills 自动生成系统",
    subtitle: "基于 LLM 的自动化技能生成工具",
    generator: {
      title: "技能生成器",
      desc: "使用 LLM 提供商生成新的技能代码。",
    },
    settings: {
      title: "系统设置",
      desc: "配置 LLM 提供商、API 密钥及模型参数。",
    },
  },
  settings: {
    title: "设置",
    providers: "LLM 提供商",
    addProvider: "添加提供商",
    noProviders: "暂无配置。点击\"添加提供商\"开始使用。",
    fields: {
      name: "名称",
      type: "类型",
      baseUrl: "API 地址",
      apiKey: "API 密钥",
      model: "模型名称",
    },
    actions: {
      setActive: "设为当前",
      remove: "移除",
    },
  },
  generator: {
    title: "技能生成器",
    prompt: {
      label: "提示词",
      skillNameLabel: "技能名称",
      skillNamePlaceholder: "例如：CodeMap",
      placeholder: "描述你想生成的技能（例如：'编写一个解析 CSV 文件并提取邮箱的 Python 脚本'）...",
      button: "生成技能",
      generating: "生成中...",
      ideLabel: "目标 IDE",
    },
    output: {
      label: "生成结果",
      placeholder: "// 生成的代码将显示在这里...",
      saveButton: "保存文件",
      saving: "保存中...",
      saved: "已保存至 output/",
    },
  },
  ide: {
    cursor: "Cursor",
    vscode: "VS Code",
    trae: "Trae",
    windsurf: "Windsurf",
    "claude-code": "Claude Code",
    "codex-cli": "Codex CLI",
  },
};
