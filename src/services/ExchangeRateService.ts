const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = 'FOERYOTJZLRMR945';


export const fetchExchangeRate = async (fromCurrency: string, toCurrency: string) => {
    const exchangeRateParams = [
        { key: 'function', value: 'CURRENCY_EXCHANGE_RATE' },
        { key: 'from_currency', value: fromCurrency },
        { key: 'to_currency', value: toCurrency },
        { key: 'apikey', value: API_KEY },
    ]
    const queryParams = exchangeRateParams.map(param => `${param.key}=${param.value}`).join('&');

    const resp = await fetch(`${BASE_URL}?${queryParams}`);
    const data = await resp.json();
    return data;
}

export const fetchDailyTrend = async (fromCurrency: string, toCurrency: string) => {

    if (!fromCurrency || !toCurrency) return;

    const exchangeRateParams = [
        { key: 'function', value: 'FX_DAILY' },
        { key: 'from_symbol', value: fromCurrency },
        { key: 'to_symbol', value: toCurrency },
        { key: 'apikey', value: API_KEY },
    ]
    const queryParams = exchangeRateParams.map(param => `${param.key}=${param.value}`).join('&');

    const resp = await fetch(`${BASE_URL}?${queryParams}`);
    const data = await resp.json();
    return data;
}