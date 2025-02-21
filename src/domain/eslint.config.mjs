import boundariesPlugin from "eslint-plugin-boundaries";
import boundaries from "eslint-plugin-boundaries";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        plugins: { boundaries, },
        rules: {
            "boundaries/element-types": [
                "error",
                { default: "disallow", rules: [] } // 🔥 Запрещаем `domain` импортировать что-либо
            ]
        }
    }
];
