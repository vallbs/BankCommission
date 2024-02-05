import { USER_TYPE } from '../../consts.js';
import NaturalUserCashOutFee from './NaturalUserCashOutFee.js';
import JuridicalUserCashOutFee from './JuridicalUserCashOutFee.js';

export default class CashOutFactory {
    constructor(payload, periodOperationsService) {
        this.payload = payload;
        this.periodOperationsService = periodOperationsService;
    }

    getStrategy() {
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
