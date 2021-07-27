import adaptDataForCandleStickCharts from '../DailyTrendAdapter';

describe('Use adaptDataForCandleStickCharts', () => {
    it('negative cases', async () => {
        expect(adaptDataForCandleStickCharts(null)).toMatchObject([]);
    });

    it('positive expected cases', async () => {
        const data = {
            "Time Series FX (Daily)": {
                "2021-01-01": {
                    "1. open": 12,
                    "2. high": 18,
                    "3. low": 9,
                    "4. close": 11,
                },
                "2021-01-02": {
                    "1. open": 11,
                    "2. high": 20,
                    "3. low": 14,
                    "4. close": 18,
                }
            }
        };
        const result = adaptDataForCandleStickCharts(data);
        expect(result[0].data.length).toBe(2);
        expect(result[0].data[0].x).toBe("2021-01-01");
        expect(result[0].data[1].x).toBe("2021-01-02");
        expect(result[0].data[0].y[0]).toBe(12);
        expect(result[0].data[1].y[2]).toBe(14);
    });
});