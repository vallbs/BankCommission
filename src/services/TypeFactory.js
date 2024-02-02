import CashInStrategy from './CashIn/CashInStrategy.js';
import CashOutFactory from './CashOut/CashOutFactory.js';
import CashInCommission from './CashIn/CashInCommission.js';
import { TYPE } from '../consts.js';

export default class TypeFactory {
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
