import { exportModules } from './plugin';
const cssLangs = `\\.(scss|styl|stylus|pcss|postcss)($|\\?)`;
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);

export default function viteTransformCSSModulesPlugin2() {
  const name = 'vite-plugin-transform-css-modules2';
  return {
    enforce: 'post',
    name,
    async transform(css, id) {
      if (cssLangRE.test(id) && !id.includes('node_modules') && !cssModuleRE.test(id)) {
        let startStr = 'const css = ';
        const cssCodeStartIndex = css.indexOf(startStr);
        const cssCodeEndIndex = css.indexOf('updateStyle(id, css)');
        const cssStr = css.slice(cssCodeStartIndex + startStr.length, cssCodeEndIndex);
        const pathIdx  = id.indexOf('/src/');
        const str = id.slice(pathIdx, id.length);
        return [
          `import.meta.hot = __vite__createHotContext('${str}');`,
          `import { updateStyle, removeStyle } from "/@vite/client"`,
          `const id = ${JSON.stringify(id)}`,
          `const css = ${cssStr}`,
          `updateStyle(id, css)`,
          // css modules exports change on edit so it can't self accept
          `${exportModules || `import.meta.hot.accept()\nexport default css`}`,
          `import.meta.hot.prune(() => removeStyle(id))`
        ].join('\n')
      }
      return undefined;
    },
  };
}
