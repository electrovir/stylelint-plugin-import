# `file-name-starts-with`

_autofixable_: false (because autofixing this may result in imports for files that don't exist)

-   By default, require that all imported files begin with `_`.

    ```javascript
    "file-name-starts-with": true // same as {"mode": "require", "startWith": "_"}
    ```

-   Customize `startWith` character:

    ```javascript
    "file-name-starts-with": {
        "mode": "require",
        "startWith": "-" /* require that all imported files start with - */
    }
    ```

    ```javascript
    "file-name-starts-with": {
        "mode": "block",
        "startWith": "(" /* block any imported files from starting with ( */
    }
    ```

## Examples

-   Defaults:

    ```javascript
     "file-name-starts-with": true // same as {"mode": "require", "startWith": "_"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import '_colors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors';
        ```

-   `block` mode:

    ```javascript
     "file-name-starts-with": {"mode": "block"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import 'colors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import '_colors';
        ```

-   Custom `startWith`:

    ```javascript
     "file-name-starts-with": {"mode": "require", "startWith": "q"}
    ```

    -   ![](https://placehold.it/15/008000/008000?text=+) **<span style="color: green;">Good</span>**

        ```less
        @import 'qcolors';
        ```

    -   ![](https://placehold.it/15/FF0000/FF0000?text=+) **<span style="color: red;">Bad</span>**

        ```less
        @import 'colors';
        ```
