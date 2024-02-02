export default class JuridicalUserCashOutFee {
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
