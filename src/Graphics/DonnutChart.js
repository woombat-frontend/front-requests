import React, { useState, useEffect, useContext } from 'react'
import '../Styles/Graphics.css'
import { Doughnut } from 'react-chartjs-2'
import Context from '../GlobalState/context';

const DonnutChart = props => {

    const {state, actions} = useContext(Context)
    const [chartData, setChartData] = useState({})
    const [options, setOptions] = useState({})

    useEffect(() => {

        setChartData({
            labels: props.data.labels,
            datasets: [{
                data: props.data.data,
                borderColor: props.data.backgroundColor,
                backgroundColor: props.data.colors,
                hoverBackgroundColor: props.data.colors
            }],
            text: '20%'
        });

        setOptions({
            title: {
                display: true,
                text: 'Tiempo dedicado en tareas',
                position: 'top',
                fontColor: 'cyan',
                fontSize: '20',
                fontFamily: "Montserrat"
            },
            legend: {
                display: false,
                position: 'right',
                labels: {
                    fontColor: 'white',
                    fontStyle: 'bolder',
                    fontFamily: "Montserrat"
                }
            }
        })
    })

    return (
        <div className='main-barchart-container'>
            <div style={{ width: props.data.size}}>
                <Doughnut
                    data={chartData}
                    options={options}   
                />
            </div>
        </div>
    )
}

export default DonnutChart