import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
    input: `src/index.ts`,
    output: [
        {
            file: `dist/index.cjs.js`,
            format: 'cjs'
        },
    ],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigDefaults: require('./tsconfig.json'),
            tsconfigOverride: {
                compilerOptions: {
                    watch: false,
                    module: "ESNext",
                    outDir: `./dist`
                },
                include: [
                    `src/**/*.ts`
                ],
                exclude: [
                    `src/**/*.d.ts`,
                    `src/test`,
                    `src/node_modules`,
                    "node_modules"
                ]
            }
        }),
        commonjs(),
        json(),
        // resolve(),
        // terser(),
    ],
    external: [

    ]
}