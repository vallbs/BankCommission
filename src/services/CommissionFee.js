import { roundFee } from '../utils/utils.js';
import TypeFactory from './TypeFactory.js';
import PeriodOperationsService from './PeriodOperationsService.js';

export default class CommissionFee {
    constructor(dataService) {
        this.dataService = dataService;
    }

    calculate() {
        const periodOperationsService = new PeriodOperationsService();

        const data = this.dataService.getData();
        const commissionFees = data.map((row) => {
            const typeFactory = new TypeFactory(
                row.type,
                row,
                periodOperationsService,
            );
            const strategy = typeFactory.getStrategy();
            const fee = strategy.calculateFee();

            return roundFee(fee);
        });

        periodOperationsService.clearPeriodOperations();

        return commissionFees;
    }
}
