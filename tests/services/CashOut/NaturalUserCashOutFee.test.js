import { jest } from '@jest/globals';
import NaturalUserCashOutFee from '../../../src/services/CashOut/NaturalUserCashOutFee';

describe('NaturalUserCashOutFee', () => {
    test('should calculate commission fee correctly for no fee case', () => {
        const payload = {
            date: '2016-01-06',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 1000, currency: 'EUR' },
        };
        const periodOperationsServiceMock = {
            getUserPeriodAmount: () => 0,
            setUserPeriodAmount: jest.fn(),
        };

        const naturalUserCashOutFee = new NaturalUserCashOutFee(
            payload,
            periodOperationsServiceMock,
        );
        const fee = naturalUserCashOutFee.calculateFee();

        expect(fee).toBe(0);
        expect(
            periodOperationsServiceMock.setUserPeriodAmount,
        ).toHaveBeenCalledWith(1, '2016-01-06', 1000);
    });

    test('should calculate commission fee correctly for exceeded amount at one operation', () => {
        const payload = {
            date: '2016-01-06',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 30000, currency: 'EUR' },
        };
        const periodOperationsServiceMock = {
            getUserPeriodAmount: () => 0,
            setUserPeriodAmount: jest.fn(),
        };

        const naturalUserCashOutFee = new NaturalUserCashOutFee(
            payload,
            periodOperationsServiceMock,
        );
        const fee = naturalUserCashOutFee.calculateFee();

        expect(fee).toBe(87);
        expect(
            periodOperationsServiceMock.setUserPeriodAmount,
        ).toHaveBeenCalledWith(1, '2016-01-06', 30000);
    });

    test('should calculate commission fee correctly for exceeded amount at the consecutive operation', () => {
        const payload = {
            date: '2016-01-06',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 1200, currency: 'EUR' },
        };
        const previousCashOut = 800;
        const amountToSet = payload.operation.amount + previousCashOut;
        const periodOperationsServiceMock = {
            getUserPeriodAmount: () => previousCashOut,
            setUserPeriodAmount: jest.fn(),
        };

        const naturalUserCashOutFee = new NaturalUserCashOutFee(
            payload,
            periodOperationsServiceMock,
        );
        const fee = naturalUserCashOutFee.calculateFee();

        expect(fee).toBe(3);
        expect(
            periodOperationsServiceMock.setUserPeriodAmount,
        ).toHaveBeenCalledWith(1, '2016-01-06', amountToSet);
    });
});
