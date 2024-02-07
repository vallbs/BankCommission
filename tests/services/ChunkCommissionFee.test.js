import ChunkCommissionFee from '../../src/services/ChunkCommissionFee';
import PeriodOperationsService from '../../src/services/PeriodOperationsService';
import { data, expectedRoudedResults } from './data/commissionFees';

describe('ChunkCommissionFee', () => {
    test('should calculate commission fees correctly', async () => {
        const dataServiceMock = {
            getData: () => data,
        };

        const chunkCommissionFee = new ChunkCommissionFee(
            dataServiceMock,
            new PeriodOperationsService(),
        );

        await chunkCommissionFee.calculate();
        const calculatedCommissionFees = chunkCommissionFee.getFees();

        expect(calculatedCommissionFees).toEqual(expectedRoudedResults);
    });
});
