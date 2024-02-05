import CashInCommission from '../../../src/services/CashIn/CashInCommission';

describe('CashInCommission', () => {
    test('should return the correct commission percent', () => {
        expect(CashInCommission.getCommissionPercent()).toBe(0.03);
    });

    test('should return the cottect max commission fee', () => {
        expect(CashInCommission.getMaxCommissionFee()).toBe(5.0);
    });
});
