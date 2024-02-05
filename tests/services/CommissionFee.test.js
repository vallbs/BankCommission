import CommissionFee from '../../src/services/CommissionFee';
import { data, expectedRoudedResults } from './data/commissionFees';

describe('CommissionFee', () => {
    test('should calculate commission fees correctly', () => {
        const dataServiceMock = {
            getData: () => data,
        };

        const commissionFee = new CommissionFee(dataServiceMock);
        const calculatedCommissionFees = commissionFee.calculate();

        expect(calculatedCommissionFees).toEqual(expectedRoudedResults);
    });
});
