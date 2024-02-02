export default class CashInStrategy {
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
