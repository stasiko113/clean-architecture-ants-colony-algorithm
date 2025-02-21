import boundaries from "eslint-plugin-boundaries";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        plugins: { boundaries, },
        rules: {
            "boundaries/element-types": [
                "error",
                { default: "disallow", rules: [{ from: "application", allow: ["domain"] }] }
            ]
        }
    }
];
