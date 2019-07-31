import React, {useState, useEffect, useContext} from 'react' 
import '../Styles/Graphics.css'
import { Bar } from 'react-chartjs-2'

const BarChart = props => {

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
            text: '30%'
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
                display: true,
                position: 'right',
                labels: {
                    fontColor: 'white',
                    fontStyle: 'bolder',
                    fontFamily: "Montserrat"
                }
            }
        })
    }, [])

    return (
        <div className='main-barchart-container'>
            <Bar
                data={barData}
                width={100}
                height={50}
                options={barOptions}
            />
        </div>
    )
}

export default BarChart