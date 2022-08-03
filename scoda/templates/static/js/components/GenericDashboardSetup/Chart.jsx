import React, { useEffect, useState } from 'react'

import { BarChartGeneric } from '../BarChartGeneric';
import { cityLabels } from './helpers/helpers';

export const Chart = ({ graphData, title }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        
        legend: {
            display: true,
            labels: {
                fontSize: 8,
                boxWidth: 25,
                fontColor: 'rgba(74, 74, 74, 1)',
                fontFamily: 'Montserrat',
                padding: 25
            },
            onHover: function (e) {
                e.target.style.cursor = 'pointer';
            }
        },
        scales: {
            xAxes: [{

                gridLines: {
                    display: false
                },
                ticks: {
                    fontFamily: "Montserrat", fontSize: 8, fontStyle: '600',
                
                },
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: title,
                    fontFamily: "Montserrat",
                    fontSize:8,
                    fontStyle: '600',
                    fontColor:"rgba(74, 74, 74, 1)"
                },
                gridLines: {
                    display: false
                },
                ticks: { fontFamily: "Montserrat", fontSize: 8,
                callback: function(value, index, values) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                }     
            },
            }],
        },
        tooltips: {
            mode: 'index',
            intercept: false,
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
    
                if (label) {
                  label += ': ';
                }
                label += isNaN(tooltipItem.yLabel) ? '0' : Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
              }
            }
          },
    };

    const data = {
        labels: graphData[0].labels.map(city => cityLabels(city)),
        datasets: graphData.map((item, index) => {
            return {
                label: item.year,
                data: item.values,
                backgroundColor: item.color
            }
        })
    }

    return (
        <>
            <BarChartGeneric options={options} data={data} />
        </>
    )
}
