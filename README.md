# uid.macro

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
  import { str } from '../macro';
  const value = str();
  const other = str(7);

  ↓ ↓ ↓ ↓ ↓ ↓

  const value = "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT";
  const other = "xqm5wXX";
  ```
