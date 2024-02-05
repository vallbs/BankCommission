import CashInStrategy from '../../../src/services/CashIn/CashInStrategy';
import CashInCommission from '../../../src/services/CashIn/CashInCommission';

describe('CashInStrategy', () => {
    test('should calculate commission fee correctly when not exceeding max fee', () => {
        const payload = {
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_in',
            operation: { amount: 200.0, currency: 'EUR' },
        };

        const cashInStrategy = new CashInStrategy(payload, CashInCommission);
        const fee = cashInStrategy.calculateFee();

        expect(fee).toBe(0.06);
    });

    test('should calculate commission fee correctly when exceeding max fee', () => {
        const payload = {
            date: '2016-01-10',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_in',
            operation: { amount: 1000000.0, currency: 'EUR' },
        };

        const cashInStrategy = new CashInStrategy(payload, CashInCommission);
        const fee = cashInStrategy.calculateFee();

        expect(fee).toBe(5.0);
    });
});
