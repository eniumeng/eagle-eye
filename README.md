# eagle-eye

1. introduction:

    The eagle-eye is a minimal map for web pages, in this way, users can posite their position of web pages.

2. usage:

    step 1: include the library into your project with npm:

    ```bash
    npm install --save new-eagle-eye
    ```

    step 2: use:

    ```javascript
    import eagleEye from 'new-eagle-eye'

    eagleEye.init(config)
    ```

    the param is a object, default value is:

    ```javascript
    {
      show=(pageWidth >= 2 * clientWidth || pageHeight >= 2 * clientHeight)
    }
    ```

Enjoy😋
