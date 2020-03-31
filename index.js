class Format {
    count(pattern) {
        const res = pattern.match(/\d+/gi)
        let sum = res.reduce((a, c) => a + parseInt(c, 10), 0)
        return sum
    }

    isDigit(c) {
        return '0123456789'.indexOf(c) > -1
    }

    tokenizePattern(pattern) {
        let tokens = pattern.split('').reduce((a, c) => {
            if (a.length === 0) {
                a.push(c)
            } else {
                if (this.isDigit(a[a.length - 1][0]) && this.isDigit(c)) {
                    a[a.length - 1] += c
                } else {
                    if (!this.isDigit(a[a.length - 1][0]) && !this.isDigit(c)) {
                        a[a.length - 1] += c
                    } else {
                        a.push(c)
                    }
                }
            }
            return a
        }, [])
        return tokens
    }

    format(value, options) {
        if (typeof options !== 'object') {
            options = {
                strict: false,
                pattern: options
            }
        }

        const defaultOptions = {
            strict: false,
            pattern: options.pattern.length.toString()
        }

        options = Object.assign(defaultOptions, options)

        // validate
        if (options.strict) {
            if (this.count(options.pattern) !== value.length) {
                throw new Error('[strict mode] data length and pattern requirement do not match')
            }
        }

        const tokens = this.tokenizePattern(options.pattern)
        let out = ''
        let cursor = 0
        for (let t in tokens) {
            const token = tokens[t]
            if (this.isDigit(token)) {
                const len = parseInt(token, 10)
                out += value.substr(cursor, len)
                cursor += len

                if (cursor >= value.length) {
                    return out
                } 
            } else {
                out += token
            }
        }

        return out
    }
}

module.exports = Format