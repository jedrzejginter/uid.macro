const pluginTester = require('babel-plugin-tester').default;
const plugin = require('babel-plugin-macros');

// We have to mock 'uuid' module, because it would
// break snapshot every time we run tests, due to new
// uuid being generated.
jest.mock('uuid', () => {
  let i = 0;
  const uuids = [
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
  ];

  return {
    v4: () => {
      const value = uuids[i];
      i = (i + 1) % uuids.length;

      return value;
    }
  }
})

pluginTester({
  plugin,
  pluginName: 'uuid.macro',
  snapshot: true,
  babelOptions: {
    filename: __filename,
    plugins: ['@babel/plugin-syntax-jsx'],
  },
  tests: [
    `
      import { uuid } from '../macro';

      const x = uuid();

      function Component() {
        return <div id={uuid()} />;
      }
    `,
  ],
})
