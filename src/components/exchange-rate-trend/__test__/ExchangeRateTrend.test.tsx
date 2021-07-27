import { render, screen, waitFor } from '@testing-library/react';
import ExchangeRateTrend from '../ExchangeRateTrend';

describe('renders ExchangeRateTrend component', () => {
    it('check ExchangeRateTrend functionality', async () => {
        Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
            writable: true,
            value: jest.fn(),
        });

        Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
            writable: true,
            value: jest.fn().mockReturnValue({
                x: 0,
                y: 0,
            }),
        });

        Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
            writable: true,
            value: jest.fn().mockReturnValue(0),
        });

        Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
            writable: true,
            value: jest.fn().mockReturnValue({
                x: 10,
                y: 10,
                inverse: () => { },
                multiply: () => { },
            }),
        });
        // @ts-ignore
        fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    "Time Series FX (Daily)": {
                        "2021-07-26": {
                            "1. open": "1.17729",
                            "2. high": "1.18173",
                            "3. low": "1.17610",
                            "4. close": "1.18088"
                        },
                        "2021-07-23": {
                            "1. open": "1.17683",
                            "2. high": "1.17865",
                            "3. low": "1.17530",
                            "4. close": "1.17680"
                        },
                    }
                }),
            })
        );

        render(<ExchangeRateTrend toCurrency="" fromCurrency="" />);
        screen.getByText(/Please enter currencies to see the exchange rate trend/g);

        // TODO: complete the test cases
    });
})

