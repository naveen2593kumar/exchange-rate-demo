import { ApexOptions } from "apexcharts";

const chartOptions = {
    chart: {
        type: 'candlestick',
        height: 350
    },
    title: {
        text: 'Exchange rate trend',
        align: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        tooltip: {
            enabled: true
        },
    },
};

export default chartOptions as ApexOptions;