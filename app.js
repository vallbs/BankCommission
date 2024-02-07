import DataService from './src/services/DataService.js';
import ChunkCommissionFee from './src/services/ChunkCommissionFee.js';
import PeriodOperationsService from './src/services/PeriodOperationsService.js';
import ChunkDataService from './src/services/ChunkDataService.js';
import ArgumentsReader from './src/services/ArgumentsReader.js';

const CHUNK_SIZE = 10 * 1024; // 10 KB

(async () => {
    try {
        console.time('Execution time');
        let filePath = ArgumentsReader.getFileName();
        filePath = `./${filePath}`;

        const chunkDataService = new ChunkDataService(filePath, CHUNK_SIZE);
        const periodOperationsService = new PeriodOperationsService();
        let totalCount = 0;

        // eslint-disable-next-line no-restricted-syntax
        for await (const chunk of chunkDataService.getChunk()) {
            const dataService = new DataService(chunk);
            const chunkCommissionFee = new ChunkCommissionFee(
                dataService,
                periodOperationsService,
            );
            chunkCommissionFee.calculate();
            chunkCommissionFee.print();
            totalCount += chunkCommissionFee.getFeesCount();
        }
        console.info('Total operations processed: ', totalCount);
        console.timeEnd('Execution time');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
