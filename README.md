# String Format

String formatter.

## Usage

```
const Format = require('@chonla/stringformat')
const fmt = new Format()

console.log(fmt.format('1234567890', '3-3-4')) // output 123-456-7890
console.log(fmt.format('1234567890', '3-3/4')) // output 123-456/7890
```

## License

[MIT](LICENSE)