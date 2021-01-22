# uid.macro

Insert [`uuid` v4](npmjs.com/package/uuid) or [`random string`](https://www.npmjs.com/package/randomstring) at build-time with [`babel macros`](https://github.com/kentcdodds/babel-plugin-macros).

## Installation

```
npm install --save-dev uid.macro
```

You'll also need to install and configure [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already.

## Usage

- `uuid` version 4
  ```js
  import { uuid } from 'uid.macro';
  const value = uuid();

  ↓ ↓ ↓ ↓ ↓ ↓

  const value = "00000000-0000-0000-0000-000000000001";
  ```

- random string (optional length)
  ```js
  import { str } from 'uid.macro';
  const value = str();
  const other = str(7);

  ↓ ↓ ↓ ↓ ↓ ↓

  const value = "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT";
  const other = "xqm5wXX";
  ```
