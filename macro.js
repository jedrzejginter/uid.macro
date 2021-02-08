const { createMacro } = require('babel-plugin-macros');
const randomstring = require('randomstring');
const uuid = require('uuid');

// caching fixes issue with server-side rendering
// when file is being compiled two times
// without cache we get different uuids in server and client bundles
// which can cause hydration issues
const cache = {};

function genAndCacheValue(path, util, generator) {
  const key = `${path.hub.file.opts.filename}:${util}:${path.node.loc.start.line}.${path.node.loc.start.column}`;

  const val = cache[key] || generator();
  cache[key] = val;

  return val;
}

function uidMacro({ references, babel }) {
  const { str: strReferences = [], uuid: uuidReferences = [] } = references;
  const { types: t } = babel;

  strReferences.forEach((path) => {
    if (t.isCallExpression(path.parent)) {
      // handle optional length argument
      const [arg0] = path.parent.arguments;
      const len = t.isNumericLiteral(arg0) ? arg0.value : 24;

      const val = genAndCacheValue(path, 'str', () => randomstring(len));

      path.parentPath.replaceWith(t.stringLiteral(val));
    }
  });

  uuidReferences.forEach((path) => {
    if (t.isCallExpression(path.parent)) {
      const val = genAndCacheValue(path, 'uuid', uuid.v4);
      path.parentPath.replaceWith(t.stringLiteral(val));
    }
  });
}

module.exports = createMacro(uidMacro);
