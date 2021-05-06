
import React from 'react';
import Chart from "react-apexcharts";
import './../../App.css';


function InitialStats(props) {
    const initialStats = props.initialStats

    const casesEvents = {
        series: [{
            data: []
        }],
        options: {
            chart: {
                id: 'basic-bar',
                height: 100
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            xaxis: {
                categories: ["Cases", "Events"],
            },
            title: {
                text: "Number of Traces and Events",
                floating: true,
                align: 'bottom',
                style: {
                    color: '#444'
                }
            }
        }
    };

    return (
        <div >
            {
                initialStats.cases ? <Chart options={casesEvents.options} series={[{
                    data: [initialStats.cases, initialStats.events]
                }]} type="bar" width="600" /> : null
            }
        </div>
    )
}

export default InitialStats;
