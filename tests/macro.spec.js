const plugin = require("babel-plugin-macros");
const { default: pluginTester } = require("babel-plugin-tester");

// We have to mock 'uuid' and 'randomstring' modules, because they would
// break snapshots every time we run tests, due to new values being generated.
jest.mock("uuid", () => {
  let i = 0;
  const uuids = [
    "00000000-0000-0000-0000-000000000001",
    "00000000-0000-0000-0000-000000000002",
  ];

  return {
    v4: () => {
      const value = uuids[i];
      i = (i + 1) % uuids.length;

      return value;
    },
  };
});

jest.mock("randomstring", () => {
  let i = 0;
  const uuids = ["firstrandomstring0123456789", "secondrandomstring0123456789"];

  return (len) => {
    const value = uuids[i];
    i = (i + 1) % uuids.length;

    return value.slice(0, len);
  };
});

pluginTester({
  plugin,
  pluginName: "uid.macro",
  snapshot: true,
  babelOptions: {
    filename: __filename,
    plugins: ["@babel/plugin-syntax-jsx"],
  },
  tests: [
    `
      import { uuid } from '../macro';

      const x = uuid();

      function Component() {
        return <div id={uuid()} />;
      }
    `,
    `
      import { str } from '../macro';

      const x = str();

      function Component() {
        return <div id={str(12)} />;
      }
    `,
  ],
});
