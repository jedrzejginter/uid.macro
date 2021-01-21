const { createMacro } = require("babel-plugin-macros");
const { v4 } = require("uuid");

// caching fixes issue with server-side rendering
// when file is being compiled two times
// without cache we get different uuids in server and client bundles
// which can cause hydration issues
const cache = {};

function uuidMacro({ references, babel }) {
  const { uuid: uuidReferences = [] } = references;
  const { types: t } = babel;

  uuidReferences.forEach((path) => {
    if (t.isCallExpression(path.parent)) {
      const key = `${path.hub.file.opts.filename}:${path.node.loc.start.line}.${path.node.loc.start.column}`;

      const val = cache[key] || v4();
      cache[key] = val;

      path.parentPath.replaceWith(t.stringLiteral(val));
    }
  });
}

module.exports = createMacro(uuidMacro);
