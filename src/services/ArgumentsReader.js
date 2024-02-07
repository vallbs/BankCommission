export default class ArgumentsReader {
    static getFileName() {
        if (process.argv.length !== 3) {
            throw new Error('Correct usage: node app.js <filename>');
        }

        return process.argv[2];
    }
}
