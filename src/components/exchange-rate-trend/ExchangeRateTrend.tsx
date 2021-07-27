import { Component } from 'react';
import ReactApexChart from "react-apexcharts";

import classes from "./ExchangeRateTrend.module.css";
import chartOptions from "./ChartOptions";
import adaptDataForCandleStickCharts from "./DailyTrendAdapter";
import { fetchDailyTrend } from "../../services/ExchangeRateService";

interface ExchangeRateTrendProps {
    fromCurrency: string,
    toCurrency: string,
}

interface ExchangeRateTrendState {
    trend: {
        data: {
            x: string;
            y: (string | number)[];
        }[];
    }[],
    error: string,
};

class ExchangeRateTrend extends Component<ExchangeRateTrendProps, ExchangeRateTrendState> {

    constructor(props: ExchangeRateTrendProps) {
        super(props);

        this.state = {
            trend: [],
            error: '',
        }
    }

    componentDidMount() {
        this.fetchTrendData();
    }

    componentDidUpdate(prevProps: ExchangeRateTrendProps) {
        if (prevProps.fromCurrency !== this.props.fromCurrency
            || prevProps.toCurrency !== this.props.toCurrency) {
            this.fetchTrendData();
        }
    }

    render() {
        return (
            <div className={classes.wrapper}>
                {this.state.trend && this.state.trend.length > 0 ?
                    <ReactApexChart data-testid="trendChart" options={chartOptions} series={this.state.trend} type="candlestick" height={350} />
                    : <div style={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.error || 'Please enter currencies to see the exchange rate trend'}
                    </div>
                }
            </div>
        );
    }

    fetchTrendData() {
        fetchDailyTrend(this.props.fromCurrency, this.props.toCurrency)
            .then((data) => {
                const dailyReport = adaptDataForCandleStickCharts(data);

                if (dailyReport && dailyReport.length > 0) {
                    this.setState({ trend: dailyReport });
                }
            }).catch(() => {
                this.setState({ error: 'Something went wrong!' });
            });
    }
}

export default ExchangeRateTrend;