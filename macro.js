const { createMacro } = require("babel-plugin-macros");
const { v4 } = require('uuid');

// caching fixes issue with server-side rendering
// when file is being compiled two times
// without cache we get different uuids in server and client bundles
// which can cause hydration issues
const cache = {};

function uuidMacro({ references, state, babel }) {
  const { uuid: uuidReferences = [] } = references;
  const { types: t } = babel;

  uuidReferences.forEach((p) => {
    if (t.isCallExpression(p.parent)) {
      const key = `${p.hub.file.opts.filename}:${p.node.loc.start.line}.${p.node.loc.start.column}`;

      const val = cache[key] || v4();
      cache[key] = val;

      p.parentPath.replaceWith(t.stringLiteral(val));
    }
  });
}

module.exports = createMacro(uuidMacro);
