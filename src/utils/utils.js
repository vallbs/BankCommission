export function getISOWeekNumber(date) {
    const target = new Date(date);
    target.setDate(target.getDate() + 4 - (target.getDay() || 7)); // Adjust to Thursday of the current week
    const yearStart = new Date(target.getFullYear(), 0, 1);
    const millisecInDay = 60 * 60 * 24 * 1000;
    const datesDiff = (target - yearStart) / millisecInDay;
    const weekNumber = Math.ceil((datesDiff + 1) / 7);

    return weekNumber;
}

export function roundFee(fee) {
    const result = Math.ceil(fee * 100) / 100;

    return result.toFixed(2);
}
