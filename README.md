# get-or-set-cache

## Args

1. `key` Cache key

-   Can be any string

2. `ttl` Max cache time

-   In seconds
-   Set this to `false` to debug the callback function and prevent caching

3. Callback function

-   Async
-   The return value will be cached

## Returns

A promise.
The callback function's return value.
If the value has already been cached, it will return that.
If the value has not been cached, it will run and await the callback function, set the cache, and return the value.
