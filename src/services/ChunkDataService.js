import fs from 'fs';
import readline from 'readline';

export default class ChunkDataService {
    constructor(filePath, chunkSize) {
        this.filePath = filePath;
        this.chunkSize = chunkSize;
    }

    createReadStream() {
        this.fileStream = fs.createReadStream(this.filePath, {
            highWaterMark: this.chunkSize,
        });
        this.rl = readline.createInterface({
            input: this.fileStream,
            crlfDelay: Infinity,
        });
    }

    async *getChunk() {
        let chunkSizeInBytes = 0;
        let dataChunk = [];

        try {
            this.createReadStream();

            // eslint-disable-next-line no-restricted-syntax
            for await (const line of this.rl) {
                if (line.trim() === '[' || line.trim() === ']') {
                    // eslint-disable-next-line no-continue
                    continue; // Skip lines containing '[' or ']'
                }

                const trimmedLine = line.trim();
                const jsonLine = trimmedLine.endsWith(',')
                    ? trimmedLine.slice(0, -1)
                    : trimmedLine;
                const lineSizeInBytes = Buffer.byteLength(jsonLine);

                dataChunk.push(JSON.parse(jsonLine));
                chunkSizeInBytes += lineSizeInBytes;

                if (chunkSizeInBytes >= this.chunkSize) {
                    yield dataChunk;
                    dataChunk = [];
                    chunkSizeInBytes = 0;
                }
            }

            if (dataChunk.length > 0) {
                yield dataChunk;
            }
        } catch (err) {
            throw new Error(
                `Error on processing data chunk of size ${this.chunkSize} from the file ${this.filePath}`,
                err,
            );
        } finally {
            this.rl.close();
            this.fileStream.close();
        }
    }
}
