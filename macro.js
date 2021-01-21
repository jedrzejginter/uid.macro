const { createMacro } = require("babel-plugin-macros");
const { v4 } = require('uuid');

const cache = {};

function uuidMacro({ references, state, babel }) {
  const { uuid: uuidReferences = [] } = references;
  const { types: t } = babel;

  uuidReferences.forEach((p,s) => {
    if (t.isCallExpression(p.parent)) {
      const k = `${p.hub.file.opts.filename}:${p.node.loc.start.line}.${p.node.loc.start.column}`;

      const val = cache[k] || v4();
      cache[k] = val;

      p.parentPath.replaceWith(
      	t.stringLiteral(val)
      )
    }
  });
}

module.exports = createMacro(uuidMacro);
