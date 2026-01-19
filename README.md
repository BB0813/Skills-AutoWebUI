# Skills AutoWebUI

**Skills AutoWebUI** is a modern, AI-powered tool designed to automatically generate configuration files and skills for various IDEs. Built with Next.js and Tailwind CSS, it features a clean, Apple-inspired interface and supports multiple LLM providers.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- **🤖 AI-Powered Generation**: Generate complex IDE skills and snippets using natural language prompts.
- **🖥️ Multi-IDE Support**:
  - **VS Code**: Generates JSON `.code-snippets` files.
  - **Cursor**: Generates Markdown `.mdc` rule files.
  - **Trae**: Generates `.zip` packages containing standard `.skill` files with YAML frontmatter.
  - **Windsurf**: Generates `.md` rule files.
- **🎨 Modern UI**:
  - Clean, solid color palette inspired by Apple Human Interface Guidelines.
  - Light/Dark mode support (fully independent of system settings).
  - Glassmorphism effects with refined legibility.
- **🌍 Internationalization**: Complete support for English and Chinese (Simplified).
- **⚙️ Flexible Configuration**: Support for OpenAI, NewAPI, OpenWebUI, and custom LLM providers.
- **⬇️ Instant Download**: One-click download for generated files, including automatic ZIP packaging for Trae.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Skills-AutoWebUI.git
   cd Skills-AutoWebUI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Usage

1.  **Configure Provider**: Go to **Settings**, add your LLM provider (e.g., OpenAI), enter the API Key and Model Name.
2.  **Generate Skill**:
    *   Go to **Generator**.
    *   Select your target **IDE** (VS Code, Cursor, Trae, etc.).
    *   Enter a **Skill Name** (e.g., `CodeMap`).
    *   Enter a **Prompt** describing what you want (e.g., "A Python script to parse CSV files").
    *   Click **Generate**.
3.  **Download**: Once generated, click the **Download** button to save the file locally.

## 📦 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1.  Push your code to a GitHub repository.
2.  Import the project in Vercel.
3.  Vercel will automatically detect Next.js and deploy.

> **Note**: Since Vercel is serverless, the local `output/` directory is ephemeral. Use the "Download" button immediately after generation to save your files.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
