import { getISOWeekNumber } from '../utils/utils.js';

export default class PeriodOperationsService {
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
