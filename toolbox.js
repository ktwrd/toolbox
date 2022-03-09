/**
 * @module toolbox
 */
module.exports = {
    /**
     * @param {Array<T>} g_Array 
     * @param {T} g_Object 
     * @returns {Boolean}
     */
    arrayContains: (g_Array,g_Object) => {
        var x;
        for (x in g_Array) 
        {
            if (g_Array.hasOwnProperty(x) && g_Array[x] === g_Object) 
            {
                return true;
            }
        }
        return false;
    },
    /** @type {Object} */
    b64: {
        /**
         * @param {String} input 
         * @returns {String} - Encoded as Base64
         */
        to: (input) => {
            return Buffer.from(input, 'binary').toString('base64');
        },
        /**
         * @param {String} input - Base64 Encoded String
         * @returns {String}
         */
        from: (input) => {
            return Buffer.from(input, 'base64').toString('binary')
        },
        /*
        to: (input) => {
            // Converts from b64 to string or JSON

            switch (typeof input)
            {
                case "undefined":
                    throw("Input Undefined");
                    break;
                case "function":
                    throw("Functions cannot be converted to base 64");
                    break;
                case "boolean":
                case "number":
                case "bigint":
                case "string":
                    return btoa(`${input}`)
                default:
                    try {
                        return btoa(JSON.stringify(input))
                    } catch (e) {
                        return btoa(input);
                    }
                    break;
            }

        },
        from: (input) => {
            // returns original data (json/string/int/boolean)
            const converted = atob(input)

            // JSON check
            if (module.exports.isJSON(converted)) 
            {
                return JSON.parse(converted)
            }

            // Boolean check
            if (converted.trim().toLowerCase().replace(" ","") == "true")
            {
                return true;
            }
            if (converted.trim().toLowerCase().replace(" ","") == "false")
            {
                return false;
            }

            // Int check
            if (module.exports.isInt(converted)) 
            {
                return true;
            }
            return converted;
        }
        */
    },
    /**
     * @param {String} input - JSON as a string.
     * @returns {Boolean}
     */
    isJSON: (input) => {
        if (/^[\],:{}\s]*$/.test(input.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) 
        {
            return true;
        } else {
            return false;
        }
    },
    /**
     * @param {String} input 
     * @returns {Boolean}
     */
    isInt: (input) => {
        const lookup = /^[0-9]+$/;
        if (input.value.match(lookup)) return true;
        return false;
    },
    /**
     * @param {Number} [g_length=12]
     * @param {Number} [g_charsetType=3]
     * @param {Array<String>} [g_charset]
     * @returns {String}
     */
    stringGen: (g_length,g_charsetType,g_charset) => {
        const charsetLookup = [
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=\;',./`!@#$%^&*()_+|:?><", // 0
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=/!@#$", // 1
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$", // 2
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // 3
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", // 4
            "abcdefghijklmnopqrstuvwxyz", // 5
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // 6
            "1234567890", // 7
            "-=\;',./`!@#$%^&*()_+|:?><", // 8
            "-=/!@#$", // 9
            "!@#$", // 10
        ]
        var charsetType = g_charsetType || 3;
        var length = g_length || 12;
        var charset = charsetLookup[charsetType] || g_charset;
        var string = "";
        for (var i=0, n = charset.length; i < length; ++i) {
            string += charset.charAt(Math.floor(Math.random() * n));
        }
        return string;
    },
    /**
     * @param {String} filename - Full File Path
     * @returns {Boolean}
     */
    validModule: (filename) =>
    {
        var fs = require("fs")
        var result;
        var content;
        var rex = /(?:^|\s*;|\s*=)\s*(?:module\.)*exports(\..+)*\s*=\s*.+/gm;

        try {
            content = fs.readFileSync(filename).toString();
        } catch (err) {
            content = '';
            throw err;
        }
        result = content.match(rex) ? true : false;
        if (result) {
        try {
            var temp = require(filename);
        } catch (err) {
            result = false;
            throw err;
        }
        }
        return result;
    },
    JSON: require("./tools/json.js"),
    async: require("./tools/async.js"),
    queue: require("./tools/queue.js"),
    arrayTreeToPath: require("./tools/arrayTreeToPath.js")
}
