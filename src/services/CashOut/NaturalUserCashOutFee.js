export default class NaturalUserCashOutFee {
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
