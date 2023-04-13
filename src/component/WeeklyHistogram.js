import React from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Bar }            from 'react-chartjs-2'


export function WeeklyHistogram({ data }) {
    const weekdaysToDisplay = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const weekdays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const chartData = weekdays.map((weekday) => (data[weekday]/1000).toFixed(2) || 0);

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
        }
    };

    const chartDataObj = {
        labels: weekdaysToDisplay,
        datasets: [
            {
                data: chartData
            }
        ]
    };

    return (
        <div>
            <Bar data={chartDataObj} options={chartOptions} />
        </div>
    );
}
