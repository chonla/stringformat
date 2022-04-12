declare module '@chonla/stringformat' {
    type FormatterOption = {
        strict: boolean;
        patterns: string;
    }

    interface Format {
        new(): void;
    }

    class Format {
        count(pattern: string): number;
        isDigit(char: string): boolean;
        tokenizePattern(pattern: string): string[];
        format(value: string, options: FormatterOption | string): string;
    }

    export default Format;
}
