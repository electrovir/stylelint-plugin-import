# `import-as-reference`

_autofixable_: true

This relates to the usage of `(reference)` in imports, [which is part of less language](http://lesscss.org/features/#import-atrules-feature-reference).

-   By default, require that all imports include `(reference)`.

    ```javascript
    "import-as-reference": true // same as {"mode": "require"}
    ```

-   Modes:

    ```javascript
    "import-as-reference": {
        "mode": "require" /* require that all imports use (reference) */
    }
    ```

    ```javascript
    "import-as-reference": {
        "mode": "block", /* prevent any imports use (reference) */
    }
    ```

## Examples

-   Defaults:

    ```javascript
     "import-as-reference": true // same as {"mode": "require"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import (reference) '_colors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors';
        ```

        autofix output:

        ```less
        @import (reference) 'colors';
        ```

-   `block` mode:

    ```javascript
     "import-as-reference": {"mode": "block"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import '_colors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import (reference) 'colors';
        ```

        autofix output:

        ```less
        @import 'colors';
        ```
