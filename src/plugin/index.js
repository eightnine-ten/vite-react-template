const plugins = [];

export function addPlugin(p) {
  plugins.push(p);
}

export function getLogin(core, options) {
  const layoutPlugin = plugins.find(p => p.type === 'login');
  return layoutPlugin.getComponent({
    core,
    options
  });
}

export function getLayout(core, options) {
  const layoutPlugin = plugins.find(p => p.type === 'layout');
  return layoutPlugin.getComponent({
    core,
    options
  });
}
