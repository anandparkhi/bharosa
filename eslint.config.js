import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  { ignores: ["dist", "node_modules", ".test-build", "dev-dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "prefer-const": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-magic-numbers": [
        "warn",
        { ignore: [0, 1, -1, 2], ignoreArrayIndexes: true, enforceConst: true, detectObjects: false }
      ]
    }
  },
  // Constants and config files are where the numbers are supposed to live.
  { files: ["**/constants/**", "**/constants.ts", "vite.config.ts"], rules: { "no-magic-numbers": "off" } },
  { files: ["**/*.d.ts"], rules: { "no-var": "off" } },
  { files: ["tests/**"], languageOptions: { globals: { URL: "readonly", process: "readonly" } } }
);
