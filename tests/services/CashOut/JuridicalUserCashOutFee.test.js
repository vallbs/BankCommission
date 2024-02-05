import JuridicalUserCashOutFee from '../../../src/services/CashOut/JuridicalUserCashOutFee';

describe('JuridicalUserCashOutFee', () => {
    test('should calculate commission fee correctly when lees than minimum fee', () => {
        const payload = {
            date: '2016-01-10',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_out',
            operation: { amount: 100.0, currency: 'EUR' },
        };
        const juridicalUserCashOutFee = new JuridicalUserCashOutFee(payload);
        const fee = juridicalUserCashOutFee.calculateFee();

        expect(fee).toBe(0.5);
    });

    test('should calculate commission fee correctly when more than minimum fee', () => {
        const payload = {
            date: '2016-01-06',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_out',
            operation: { amount: 300.0, currency: 'EUR' },
        };
        const juridicalUserCashOutFee = new JuridicalUserCashOutFee(payload);
        const fee = juridicalUserCashOutFee.calculateFee();

        expect(fee).toBe(0.9);
    });
});
