module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IDE_CONFIG",
    ()=>IDE_CONFIG
]);
const IDE_CONFIG = {
    cursor: {
        name: "Cursor",
        extension: ".mdc",
        format: "markdown"
    },
    vscode: {
        name: "VS Code",
        extension: ".code-snippets",
        format: "json"
    },
    trae: {
        name: "Trae",
        extension: ".zip",
        format: "markdown"
    },
    windsurf: {
        name: "Windsurf",
        extension: ".md",
        format: "markdown"
    }
};
}),
"[project]/src/app/api/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-route] (ecmascript)");
;
;
;
;
const CONFIG_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'config.json');
async function POST(request) {
    try {
        const { prompt, ide, skillName } = await request.json();
        const targetIDE = ide || 'vscode';
        const ideSettings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDE_CONFIG"][targetIDE];
        const finalSkillName = skillName || "Untitled Skill";
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(CONFIG_PATH)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Config not found'
            }, {
                status: 400
            });
        }
        const config = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(CONFIG_PATH, 'utf-8'));
        const activeProvider = config.providers.find((p)=>p.id === config.activeProvider);
        if (!activeProvider) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No active provider selected'
            }, {
                status: 400
            });
        }
        const baseUrl = activeProvider.baseUrl.replace(/\/$/, '');
        const url = `${baseUrl}/chat/completions`;
        // Construct a specific system prompt based on the target IDE
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
        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: prompt
            }
        ];
        console.log(`Calling ${url} with model ${activeProvider.model}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${activeProvider.apiKey}`
            },
            body: JSON.stringify({
                model: activeProvider.model,
                messages: messages
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Provider Error:", errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Provider error: ${response.status} ${errorText}`
            }, {
                status: 500
            });
        }
        const data = await response.json();
        let content = data.choices[0].message.content;
        // Filter out <think> tags (MiniMax-M2.1 specific)
        content = content.replace(/<think>[\s\S]*?<\/think>/g, '');
        // Basic cleanup to remove code fences if the LLM added them despite instructions
        // This is a simple heuristic; might need refinement.
        if (content.startsWith('```') && content.endsWith('```')) {
            const lines = content.split('\n');
            if (lines.length >= 2) {
                content = lines.slice(1, -1).join('\n');
            }
        } else if (content.startsWith('```json')) {
            const lines = content.split('\n');
            content = lines.slice(1, -1).join('\n');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            content,
            extension: ideSettings.extension
        });
    } catch (error) {
        console.error("Generate Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Generation failed'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__97f0b184._.js.map