
interface AlphaVantageDailyTrend {
    "Time Series FX (Daily)": {
        [key: string]: {
            "1. open": string | number,
            "2. high": string | number,
            "3. low": string | number,
            "4. close": string | number,
        }
    }
}

// This is use adapter pattern so that we can support multiple data sources
// Ideally better way would be to have class/interface and rest adpaters extends that
const adaptDataForCandleStickCharts = (data: AlphaVantageDailyTrend | null) => {
    if (!data || !data['Time Series FX (Daily)']) return [];

    const dailyTrend = data['Time Series FX (Daily)'];
    const entries = Object.entries(dailyTrend);
    const finalData = entries.map(item => ({
        x: item[0],
        y: [item[1]['1. open'], item[1]['2. high'], item[1]['3. low'], item[1]['4. close']]
    })).sort((a, b) => a.x.localeCompare(b.x)).slice(-31);

    const result = [];
    result.push({ data: finalData });

    return result;
}

export default adaptDataForCandleStickCharts;