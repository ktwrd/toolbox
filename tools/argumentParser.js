module.exports = {
    hasSwitch (key) {
        for (let i = 0; i < process.argv.length; i++) {
            if (process.argv[i].startsWith(`--${key}`))
                return true
        }
        return false
    },
    getSwitchValue (key) {
        for (let i = 0; i < process.argv.length; i++) {
            if (process.argv[i].startsWith(`--${key}`)) {
                let withoutKey = process.argv[i].substring(`--${key}`.length)
                console.log(process.argv[i] + ' -> ', withoutKey)
                if (withoutKey.substring(0, 1) == '=')
                    return withoutKey.substring(1)
            }
        }
        return ''
    },
    toObject (argv) {
        if (argv == undefined || typeof argv != 'object' || !(argv instanceof Array))
            argv = process.argv
        let content = {}
        for (let i = 0; i < process.argv.length; i++) {
            if (!process.argv[i].startsWith('--')) continue
            let sw = process.argv[i].split('=')[0]
            if (process.argv[i].startsWith(sw)) {
                let withoutKey = process.argv[i].substring(sw.length)
                console.log(process.argv[i] + ' -> ', withoutKey)
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