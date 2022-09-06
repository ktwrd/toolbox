module.exports = {
    hasSwitch (key, argv) {
        if (argv == undefined || typeof argv != 'object')
            argv = process.argv
        for (let i = 0; i < argv.length; i++) {
            if (argv[i].startsWith(`--${key}`))
                return true
        }
        return false
    },
    getSwitchValue (key, argv) {
        if (argv == undefined || typeof argv != 'object')
            argv = process.argv
        for (let i = 0; i < argv.length; i++) {
            if (argv[i].startsWith(`--${key}`)) {
                let withoutKey = argv[i].substring(`--${key}`.length)
                if (withoutKey.substring(0, 1) == '=')
                    return withoutKey.substring(1)
            }
        }
        return ''
    },
    toObject (argv) {
        if (argv == undefined || typeof argv != 'object')
            argv = process.argv
        let content = {}
        for (let i = 0; i < argv.length; i++) {
            if (!argv[i].startsWith('--')) continue
            let sw = argv[i].split('=')[0]
            if (argv[i].startsWith(sw)) {
                let withoutKey = argv[i].substring(sw.length)
                let value = true
                let key = sw.substring(2)
                if (withoutKey.substring(0, 1) == '=') {
                    value = withoutKey.substring(1)
                    if (value == 'true')
                        value = true
                    else if (value == 'false')
                        value = false
                    else if (value.match(/^[0-9]+(|\.[0-9]+)$/) != null)
                        value = parseFloat(value)
                }
                content[key] = value
            }
        }
        return content
    }
}