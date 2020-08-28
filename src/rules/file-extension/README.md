# `file-extension`

_autofixable_: yes

-   By default, require that all imports include an extension.

    ```javascript
    "file-extension": true // same as {"mode": "require"}
    ```

-   Modes:

    ```javascript
    "file-extension": {
        "mode": "require" /* require that all imports have a file extension */
    }
    ```

    ```javascript
    "file-extension": {
        "mode": "block", /* prevent any imports from having a file extension */
    }
    ```

-   Custom extension:

    ```javascript
    "file-extension": {
        "mode": "require",
        "extension": ".less" /* autofix this extension into imports, the default is .css */
    }
    ```

## Examples

-   Defaults:

    ```javascript
     "file-extension": true // same as {"mode": "require"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import 'colors.css';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors';
        ```

        autofix output:

        ```less
        @import 'colors.css';
        ```

-   Custom extension:

    ```javascript
     "file-extension": {"mode": "require", "extension": ".less"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import 'colors.less';
        ```

        This won't flag or remove imports with extensions that differ from the options one. It only checks for extension existence.

        ```less
        @import 'otherColors.css';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors';
        ```

        autofix output:

        ```less
        @import 'colors.less';
        ```

-   `block` mode:

    ```javascript
     "file-extension": {"mode": "block"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import 'colors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors.less';
        ```

        autofix output:

        ```less
        @import 'colors';
        ```
