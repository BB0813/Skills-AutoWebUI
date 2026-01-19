(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/i18n/dictionaries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "en",
    ()=>en,
    "zh",
    ()=>zh
]);
const en = {
    common: {
        loading: "Loading...",
        save: "Save Changes",
        saved: "Saved successfully",
        error: "Error occurred",
        copy: "Copy",
        delete: "Delete",
        back: "Back"
    },
    home: {
        title: "Skills AutoWebUI",
        subtitle: "Automated Skills Generation System",
        generator: {
            title: "Generator",
            desc: "Generate new Skills using LLM providers."
        },
        settings: {
            title: "Settings",
            desc: "Configure LLM providers and API keys."
        }
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
            model: "Model"
        },
        actions: {
            setActive: "Set as Active",
            remove: "Remove"
        }
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
            ideLabel: "Target IDE"
        },
        output: {
            label: "Output",
            placeholder: "// Generated code will appear here...",
            saveButton: "Save to File",
            saving: "Saving...",
            saved: "Saved to output/"
        }
    }
};
const zh = {
    common: {
        loading: "加载中...",
        save: "保存更改",
        saved: "保存成功",
        error: "发生错误",
        copy: "复制",
        delete: "删除",
        back: "返回"
    },
    home: {
        title: "Skills 自动生成系统",
        subtitle: "基于 LLM 的自动化技能生成工具",
        generator: {
            title: "技能生成器",
            desc: "使用 LLM 提供商生成新的技能代码。"
        },
        settings: {
            title: "系统设置",
            desc: "配置 LLM 提供商、API 密钥及模型参数。"
        }
    },
    settings: {
        title: "设置",
        providers: "LLM 提供商",
        addProvider: "添加提供商",
        noProviders: "暂无配置。点击“添加提供商”开始使用。",
        fields: {
            name: "名称",
            type: "类型",
            baseUrl: "API 地址",
            apiKey: "API 密钥",
            model: "模型名称"
        },
        actions: {
            setActive: "设为当前",
            remove: "移除"
        }
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
            ideLabel: "目标 IDE"
        },
        output: {
            label: "生成结果",
            placeholder: "// 生成的代码将显示在这里...",
            saveButton: "保存文件",
            saving: "保存中...",
            saved: "已保存至 output/"
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/i18n/context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useTranslation",
    ()=>useTranslation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/i18n/dictionaries.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function I18nProvider({ children }) {
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            const storedLang = localStorage.getItem("app-language");
            if (storedLang && (storedLang === "en" || storedLang === "zh")) {
                setLanguage(storedLang);
            } else {
                // Auto-detect browser language
                const browserLang = navigator.language.startsWith("zh") ? "zh" : "en";
                setLanguage(browserLang);
            }
        }
    }["I18nProvider.useEffect"], []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem("app-language", lang);
    };
    const t = language === "zh" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zh"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$i18n$2f$dictionaries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["en"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            language,
            setLanguage: handleSetLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/i18n/context.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(I18nProvider, "yypZwmBAMeNoFNht2MZkioB5628=");
_c = I18nProvider;
function useTranslation() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within an I18nProvider");
    }
    return context;
}
_s1(useTranslation, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_i18n_4b0aa79b._.js.map