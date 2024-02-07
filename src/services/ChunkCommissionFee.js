import { roundFee } from '../utils/utils.js';
import TypeFactory from './TypeFactory.js';

export default class ChunkCommissionFee {
    constructor(dataService, periodOperationsService) {
        this.dataService = dataService;
        this.periodOperationsService = periodOperationsService;
        this.fees = [];
    }

    calculate() {
        const data = this.dataService.getData();
        const commissionFees = data.map((row) => {
            const typeFactory = new TypeFactory(
                row.type,
                row,
                this.periodOperationsService,
            );
            const strategy = typeFactory.getStrategy();
            const fee = strategy.calculateFee();

            return roundFee(fee);
        });

        this.fees = commissionFees;
    }

    getFees() {
        return this.fees;
    }

    print() {
        this.fees.forEach((fee) => {
            console.log(fee);
        });
    }
}
