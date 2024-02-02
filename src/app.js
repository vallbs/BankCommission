import DataService from './services/DataService.js';
import CommissionFee from './services/CommissionFee.js';

const commissionFee = new CommissionFee(DataService);
const calculatedCommissionFees = commissionFee.calculate();

console.table(calculatedCommissionFees);
