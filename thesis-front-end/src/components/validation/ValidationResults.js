import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './../../App.css';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import Chart from "react-apexcharts";
import ValidationParameters from './ValidationParameters';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 80,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    featureMethods: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    slider: {
        marginTop: 16,
        width: 300
    },
    featureCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // padding: theme.spacing(0, 1),
        flexGrow: 1,
        padding: theme.spacing(3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

function ValidationResults(props) {
    const classes = useStyles();
    const [chartType, setChartType] = useState("bar")

    const stats = props.stats

    const handleGraphView = (event) => {
        console.log(event.target.checked)
        if (event.target.checked) {
            setChartType("radar")
        } else {
            setChartType("bar")
        }
    }
    return (
        <div className={classes.root}>

            { (stats[1].length !== 0) &&
                <Box>
                    <ValidationParameters parameters={stats[0]} />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name={"Use radar view"} onChange={handleGraphView} />}
                            label={"Switch to Radar view"}
                        />
                    </FormGroup>
                    {stats[1].map(stat =>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Box pr={3}>
                                <Chart
                                    key={chartType}
                                    options={
                                        {
                                            yaxis: {
                                                show: true,
                                                max: 1,
                                                min: 0,
                                                tickAmount: 1
                                            },
                                            chart: {
                                                id: "bar",
                                                type: 'bar',
                                                width: 500,
                                                height: 500
                                            },
                                            dataLabels: {
                                                enabled: true,
                                            },
                                            xaxis: {
                                                labels: {
                                                    show: true,
                                                },
                                                categories: ["Accuracy", "AUC", "F1", "Recall", "Precision"],
                                                position: 'bottom',
                                            },
                                            title: {
                                                text: "Train - " + stat.featureName,
                                                floating: true,
                                                align: 'bottom',
                                                style: {
                                                    color: '#444'
                                                }
                                            }
                                        }
                                    }
                                    series={
                                        [
                                            {
                                                name: "series-1",
                                                data: [
                                                    stat.train.meanAccuracy,
                                                    stat.train.meanAUC,
                                                    stat.train.meanF1,
                                                    stat.train.meanRecall,
                                                    stat.train.meanPrecision
                                                ]
                                            },
                                        ]
                                    }
                                    type={chartType}
                                    width={550}
                                />
                            </Box>
                            <Box pl={3}>
                                <Chart
                                    key={chartType}
                                    options={
                                        {
                                            yaxis: {
                                                show: true,
                                                max: 1,
                                                min: 0,
                                                tickAmount: 1
                                            },
                                            chart: {
                                                id: "basic-bar"
                                            },
                                            dataLabels: {
                                                enabled: true,
                                            },
                                            xaxis: {
                                                labels: {
                                                    show: true,
                                                },
                                                title: "Feature Name",
                                                categories: ["Accuracy", "AUC", "F1", "Recall", "Precision"]
                                            },
                                            title: {
                                                text: "Test - " + stat.featureName,
                                                floating: true,
                                                align: 'center',
                                                style: {
                                                    color: '#444'
                                                }
                                            }
                                        }
                                    }
                                    series={
                                        [
                                            {
                                                name: "series-1",
                                                data: [
                                                    stat.test.meanAccuracy,
                                                    stat.test.meanAUC,
                                                    stat.test.meanF1,
                                                    stat.test.meanRecall,
                                                    stat.test.meanPrecision
                                                ]
                                            },
                                        ]
                                    }
                                    type={chartType}
                                    width="550"
                                />
                            </Box>
                        </div>
                    )

                    }
                </Box>

            }
        </div >
    )
}

export default ValidationResults;
