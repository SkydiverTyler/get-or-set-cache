const NodeCache = require("node-cache");

const DEFAULT_TTL = 60 * 60 * 24;

const CACHE = new NodeCache({
    stdTTL: DEFAULT_TTL,
    checkperiod: 0,
});

module.exports = async (key, ttl, fn) => {
    // Set TTL to `false`
    // to debug the callback function (prevent caching)
    if (ttl === false) {
        // Also clear stale value
        CACHE.del(key);
        return fn();
    }

    // Check to see if value has already been cached
    const val = CACHE.get(key);

    if (val) {
        // Cache exists, return it
        return val;
    } else {
        // Cache doesn't exist, run callback and store value
        const newVal = await fn();

        // If TTL param is nullish, set to the default
        if (newVal != null) {
            CACHE.set(key, newVal, ttl ?? DEFAULT_TTL);
        }

        return newVal;
    }
};
