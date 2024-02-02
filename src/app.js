/* eslint-disable max-classes-per-file */
import { data } from './data/input.js';
import { getISOWeekNumber } from './utils/dateUtils.js';
import { USER_TYPE, TYPE } from './consts.js';

class CashInCommission {
    static getCommissionPercent() {
        return 0.03;
    }

    static getMaxCommissionFee() {
        return 5.0;
    }
}

class PeriodOperationsService {
    constructor() {
        this.operations = new Map();
    }

    // eslint-disable-next-line class-methods-use-this
    getPeriodOperationKey(userId, date) {
        const operationWeek = getISOWeekNumber(date);

        return `${userId}:${operationWeek}`;
    }

    getUserPeriodAmount(userId, date) {
        const operationKey = this.getPeriodOperationKey(userId, date);

        return this.operations.get(operationKey) || 0;
    }

    setUserPeriodAmount(userId, date, value) {
        const operationKey = this.getPeriodOperationKey(userId, date);
        this.operations.set(operationKey, value);
    }

    clearPeriodOperations() {
        this.operations = null;
    }
}

class CashInStrategy {
    constructor(payload, commissionService) {
        this.payload = payload;
        this.COMMISSION_PERCENT = commissionService.getCommissionPercent();
        this.MAX_COMMISSION_FEE = commissionService.getMaxCommissionFee();
    }

    calculateFee() {
        const { operation: { amount = 0 } = {} } = this.payload;
        const commissionFee = (amount * this.COMMISSION_PERCENT) / 100;

        if (commissionFee > this.MAX_COMMISSION_FEE) {
            return this.MAX_COMMISSION_FEE;
        }

        return commissionFee;
    }
}

class NaturalUserCashOutFee {
    constructor(payload, periodOperationsService) {
        this.payload = payload;
        this.periodOperationsService = periodOperationsService;

        this.COMMISSION_PERCENT = 0.3;
        this.PERIOD_AMOUNT_NO_COMMISSION = 1000;
    }

    calculateFee() {
        const {
            user_id: userId,
            date,
            operation: { amount = 0 } = {},
        } = this.payload;
        const amountSamePeriod =
            this.periodOperationsService.getUserPeriodAmount(userId, date);
        const allowedAmountWithNoCommission = Math.max(
            this.PERIOD_AMOUNT_NO_COMMISSION - amountSamePeriod,
            0,
        );
        const amountToChargeCommission =
            amountSamePeriod === 0 && amount === 1000
                ? 0
                : Math.max(amount - allowedAmountWithNoCommission, 0);
        const newPeriodAmount = amountSamePeriod + amount;

        this.periodOperationsService.setUserPeriodAmount(
            userId,
            date,
            newPeriodAmount,
        );

        const result =
            (amountToChargeCommission * this.COMMISSION_PERCENT) / 100;

        return result;
    }
}

class JuridicalUserCashOutFee {
    constructor(payload) {
        this.payload = payload;

        this.COMMISSION_PERCENT = 0.3;
        this.MIN_FEE = 0.5;
    }

    calculateFee() {
        const result =
            (this.payload.operation.amount * this.COMMISSION_PERCENT) / 100;

        if (result < this.MIN_FEE) {
            return this.MIN_FEE;
        }

        return result;
    }
}

class CashOutFactory {
    constructor(payload, periodOperationsService) {
        this.payload = payload;
        this.periodOperationsService = periodOperationsService;
    }

    getSrtategy() {
        switch (this.payload.user_type) {
            case USER_TYPE.NATURAL:
                return new NaturalUserCashOutFee(
                    this.payload,
                    this.periodOperationsService,
                );
            case USER_TYPE.JURIDICAL:
                return new JuridicalUserCashOutFee(this.payload);
            default:
                throw new Error('Unknown user type!');
        }
    }
}

class TypeFactory {
    constructor(type, payload, periodOperationsService) {
        this.type = type;
        this.payload = payload;
        this.periodOperationsService = periodOperationsService;
    }

    getStrategy() {
        switch (this.type) {
            case TYPE.CASH_IN:
                return new CashInStrategy(this.payload, CashInCommission);
            case TYPE.CASH_OUT: {
                const cashOutFactory = new CashOutFactory(
                    this.payload,
                    this.periodOperationsService,
                );

                return cashOutFactory.getSrtategy();
            }
            default:
                throw new Error('Unknown type!');
        }
    }
}

function roundFee(fee) {
    const result = Math.ceil(fee * 100) / 100;

    return result.toFixed(2);
}

const periodOperationsService = new PeriodOperationsService();

function calculateCommissionFees() {
    const commissionFees = data.map((row) => {
        const typeFactory = new TypeFactory(
            row.type,
            row,
            periodOperationsService,
        );
        const strategy = typeFactory.getStrategy();
        const fee = strategy.calculateFee();

        return {
            type: row.type,
            amount: row.operation.amount,
            fee: roundFee(fee),
        };
    });

    return commissionFees;
}

console.table(calculateCommissionFees());

periodOperationsService.clearPeriodOperations();
