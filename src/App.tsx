import { Component } from 'react';
import classes from './App.module.css';
import ExchangeRateConverter from './components/exchange-rate-converter/ExchangeRateConverter';
import ExchangeRateTrend from './components/exchange-rate-trend/ExchangeRateTrend';

// This can be moved to a separate definition file App.d.ts
interface AppState {
  fromCurrency: string,
  toCurrency: string,
}

class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);

    // This can be replaced with ContextAPI or Redux but that would be an additonal overhead for small example
    this.state = {
      fromCurrency: '',
      toCurrency: '',
    }

    this.updateCurrencies = this.updateCurrencies.bind(this);
  }

  // Callback passed to child, updating the currencies
  updateCurrencies(fromCurrency: string, toCurrency: string) {
    this.setState({
      fromCurrency,
      toCurrency,
    });
  }

  render() {
    return (
      <div className={classes.wrapper} >
        <div className={classes['form-box']} data-testid="exchangeRateConverter">
          <ExchangeRateConverter
            fromCurrency={this.state.fromCurrency}
            toCurrency={this.state.toCurrency}
            updateCurrencies={this.updateCurrencies}
          />
        </div>
        <div className={classes['chart-box']} data-testid="exchangeRateTrend">
          <ExchangeRateTrend
            fromCurrency={this.state.fromCurrency}
            toCurrency={this.state.toCurrency}
          />
        </div>
      </div>
    );
  }
}

export default App;
