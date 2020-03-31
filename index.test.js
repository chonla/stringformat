describe('Formatter', () => {
    const Format = require('./index')
    const fmt = new Format()

    describe('Counter', () => {
        it('should sum single digit number in pattern correctly', () => {
            const result = fmt.count('1')

            expect(result).toBe(1)
        })

        it('should sum multiple digit number in pattern correctly', () => {
            const result = fmt.count('5719')

            expect(result).toBe(5719)
        })

        it('should sum zero leading multiple digit number in pattern correctly', () => {
            const result = fmt.count('0005719')

            expect(result).toBe(5719)
        })

        it('should sum multiple numbers in pattern correctly', () => {
            const result = fmt.count('1,0,4,5719,413,771')

            expect(result).toBe(6908)
        })

        it('should ignore negative sign in pattern correctly', () => {
            const result = fmt.count('1,0,-4,-5719,413,771')

            expect(result).toBe(6908)
        })
    })

    describe("Tokenizer", () => {
        it('should group numeric and non-numeric in pattern', () => {
            const result = fmt.tokenizePattern('1,0,-4,-5719,413,771')

            expect(result).toEqual(['1', ',', '0', ',-', '4', ',-', '5719', ',', '413', ',', '771'])
        })
    })

    describe('Formatter', () => {
        it('should format data to pattern', () => {
            const result = fmt.format('0123456789abcdef', '4-3-5-4')

            expect(result).toBe('0123-456-789ab-cdef')
        })

        it('should format data to pattern even data is shorter', () => {
            const result = fmt.format('0123456789a', '4-3-5-4')

            expect(result).toBe('0123-456-789a')
        })

        it('should format data to pattern even data is longer', () => {
            const result = fmt.format('0123456789abcdefghijk', '4-3-5-4')

            expect(result).toBe('0123-456-789ab-cdef')
        })

        it('should throw error if data is shorter in strict mode', () => {
            expect(() => {
                fmt.format('0123456789a', {
                    strict: true,
                    pattern: '4-3-5-4'
                })
            }).toThrow(new Error('[strict mode] data length and pattern requirement do not match'))
        })

        it('should throw error if data is longer in strict mode', () => {
            expect(() => {
                fmt.format('0123456789abcdefghijk', {
                    strict: true,
                    pattern: '4-3-5-4'
                })
            }).toThrow(new Error('[strict mode] data length and pattern requirement do not match'))
        })
    })
})