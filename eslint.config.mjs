import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import deprecationPlugin from "eslint-plugin-deprecation";
import boundaries from "eslint-plugin-boundaries";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
            deprecation: deprecationPlugin,
            boundaries
        },
        rules: {
            quotes: ["error", "single", { avoidEscape: true }],
            semi: ["error", "always"],
            curly: ["error", "multi-line"],
            "eol-last": "error",
            "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0, maxBOF: 0 }],
            "max-depth": ["error", 5],
            eqeqeq: ["error", "allow-null"],
            "comma-spacing": ["error", { before: false, after: true }],

            "prettier/prettier": "error",

            "@typescript-eslint/no-var-requires": "warn",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",

            // Import rules
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "unknown",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                        "type",
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                        orderImportKind: "asc",
                    },
                    "newlines-between": "always",
                    distinctGroup: true,
                },
            ],
            "sort-imports": ["error", { allowSeparatedGroups: true, ignoreDeclarationSort: true }],
            "no-duplicate-imports": "error",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "import/no-unassigned-import": "error",
            "import/namespace": "off",
            "import/no-named-as-default": "off",
            "import/no-named-as-default-member": "off",
        },
        settings: {
            'boundaries/elements': [
                    { type: "application", pattern: "src/application/**" },
                    { type: "domain", pattern: "src/domain/**" },
                    { type: "infrastructure", pattern: "src/infrastructure/**" },
                    { type: "presentation", pattern: "src/presentation/**" },
                ],
        },
    },
];
