import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExchangeRateConverter from '../ExchangeRateConverter';

describe('renders ExchangeRateConverter component', () => {
    it('check ExchangeRateConverter functionality', async () => {
        // @ts-ignore
        fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    "Realtime Currency Exchange Rate": {
                        "1. From_Currency Code": "INR",
                        "2. From_Currency Name": "Indian Rupee",
                        "3. To_Currency Code": "EUR",
                        "4. To_Currency Name": "Euro",
                        "5. Exchange Rate": "0.89",
                        "6. Last Refreshed": "2021-07-26 20:31:44",
                        "7. Time Zone": "UTC",
                        "8. Bid Price": "0.01138740",
                        "9. Ask Price": "0.01138810"
                    }
                }),
            })
        );
        const spy = jest.fn();

        render(<ExchangeRateConverter toCurrency="" fromCurrency="" updateCurrencies={spy} />);
        const fromCurrencyInput = screen.getByTestId('fromCurrency');
        const toCurrencyInput = screen.getByTestId('toCurrency');
        const getRateButton = screen.getByRole('button', { name: /GET RATE/i });

        expect(fromCurrencyInput).toBeInTheDocument();
        expect(toCurrencyInput).toBeInTheDocument();
        expect(getRateButton).toBeInTheDocument();
        expect(getRateButton).toBeDisabled();

        await userEvent.type(fromCurrencyInput, 'EUR');
        await userEvent.type(toCurrencyInput, 'INR');

        await waitFor(() => {
            expect(getRateButton).toBeEnabled();
        });

        await waitFor(() => {
            userEvent.click(getRateButton);
        });
        await waitFor(() => {
            screen.getByText(/Exchange rate: 0.8900/g);
        });
        const amountField = screen.getByTestId('amount');
        expect(amountField).toBeInTheDocument();
        await userEvent.type(amountField, '10');
        await waitFor(() => {
            screen.getByText(/Converted Amount: 8.9000/g);
        });
    });
})

