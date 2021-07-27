import schema from '../FormValidationSchema';

describe('Use FormValidationSchema', () => {
    it('negative cases', async () => {
        expect(await schema.isValid({})).toBe(false);
        expect(await schema.isValid(null)).toBe(false);
        expect(await schema.isValid({ x: 'XX', y: 'YY' })).toBe(false);
        expect(await schema.isValid({ toCurrency: '', fromCurrency: '' })).toBe(false);
        expect(await schema.isValid({ toCurrency: 'C', fromCurrency: '' })).toBe(false);
        expect(await schema.isValid({ toCurrency: 'C', fromCurrency: 'CCCC' })).toBe(false);
        expect(await schema.isValid({ toCurrency: '@$A', fromCurrency: '13d' })).toBe(false);
    });
    it('positive cases', async () => {
        expect(await schema.isValid({ toCurrency: 'GBP', fromCurrency: 'USD' })).toBe(true);
    });
});