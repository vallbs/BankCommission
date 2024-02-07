import DataService from './src/services/DataService.js';
import ChunkCommissionFee from './src/services/ChunkCommissionFee.js';
import PeriodOperationsService from './src/services/PeriodOperationsService.js';
import ChunkDataService from './src/services/ChunkDataService.js';
import ArgumentsReader from './src/services/ArgumentsReader.js';

const CHUNK_SIZE = 1024 * 1024; // 1MB

(async () => {
    try {
        let filePath = ArgumentsReader.getFileName();
        filePath = `src/${filePath}`;

        const chunkDataService = new ChunkDataService(filePath, CHUNK_SIZE);
        const periodOperationsService = new PeriodOperationsService();

        for await (const chunk of chunkDataService.getChunk()) {
            const dataService = new DataService(chunk);
            const chunkCommissionFee = new ChunkCommissionFee(
                dataService,
                periodOperationsService,
            );
            chunkCommissionFee.calculate();
            chunkCommissionFee.print();
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
