import { dataToEsm } from '@rollup/pluginutils'
const cssLangs = `\\.(scss|styl|stylus|pcss|postcss)($|\\?)`;
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const modulesOptions = { scopeBehaviour: 'local', localsConvention: 'camelCaseOnly' }


async function compileCSS(id, code) {
  let modules;
  let postcssPlugins = [];
  postcssPlugins.unshift(
    (await import('postcss-modules')).default({
      ...modulesOptions,
      getJSON(
        cssFileName,
        _modules,
        outputFileName
      ) {
        modules = _modules
        if (modulesOptions && typeof modulesOptions.getJSON === 'function') {
          modulesOptions.getJSON(cssFileName, _modules, outputFileName)
        }
      }
    })
  )

  const postcssResult = await (await import('postcss'))
  .default(postcssPlugins)
  .process(code, {
    to: id,
    from: id,
    map: {
      inline: false,
      annotation: false,
    }
  })

  return {
    ast: postcssResult,
    modules,
    code: postcssResult.css,
  }
}


export let exportModules;
export let exportCss;

export default function viteTransformCSSModulesPlugin() {
  const name = 'vite-plugin-transform-css-modules';
  return {
    enforce: 'pre',
    name,
    async transform(raw, id) {
      if (cssLangRE.test(id) && !id.includes('node_modules') && !cssModuleRE.test(id)) {
        const {
          code: css,
          modules
        } = await compileCSS(id, raw)
      
        const modulesCode =
        modules && dataToEsm(modules, { namedExports: true, preferConst: true })
        exportModules = modulesCode;
        exportCss = css;
        return {
          code: css,
          map: { mappings: '' }
        }
      }
      return undefined;
    },
  };
}
