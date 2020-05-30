import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export default {
  install: function(Vue) {
    Vue.mixin({
      components: { ...getInputControlComponents() },
    });
  },
};

function getInputControlComponents() {
  let components = {};
  const requireComponent = require.context(
    "../components/core/Controls",
    true,
    /[\w-]+\.vue$/
  );
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const fileNames = fileName.split("/");
    const tempCompName = fileNames[fileNames.length - 1];
    const componentName = upperFirst(
      camelCase(tempCompName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
    );
    components[componentName] = componentConfig.default || componentConfig;
  });
  return components;
}
