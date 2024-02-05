export const data = [
    {
        date: '2016-01-05',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_in',
        operation: { amount: 200.0, currency: 'EUR' },
    },
    {
        date: '2016-01-06',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' },
    },
    {
        date: '2016-01-06',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 30000, currency: 'EUR' },
    },
    {
        date: '2016-01-07',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000.0, currency: 'EUR' },
    },
    {
        date: '2016-01-07',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
    },
    {
        date: '2016-01-10',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 100.0, currency: 'EUR' },
    },
    {
        date: '2016-01-10',
        user_id: 2,
        user_type: 'juridical',
        type: 'cash_in',
        operation: { amount: 1000000.0, currency: 'EUR' },
    },
    {
        date: '2016-01-10',
        user_id: 3,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 1000.0, currency: 'EUR' },
    },
    {
        date: '2016-02-15',
        user_id: 1,
        user_type: 'natural',
        type: 'cash_out',
        operation: { amount: 300.0, currency: 'EUR' },
    },
];

export const expectedResults = [0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0];

export const expectedRoudedResults = [
    '0.06',
    '0.90',
    '87.00',
    '3.00',
    '0.30',
    '0.30',
    '5.00',
    '0.00',
    '0.00',
];
