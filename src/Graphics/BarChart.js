import React, {useState, useEffect, useContext} from 'react' 
import '../Styles/Graphics.css'
import { Bar } from 'react-chartjs-2'
import firebase from 'firebase'

const BarChart = props => { 

    const [chartData, setChartData] = useState({})
    const [options, setOptions] = useState({})
    const db = firebase.firestore()

    useEffect(() => {

        db.doc(`responses/${props.path}`).onSnapshot(res => {
            console.log(res.data())
            setChartData({
                labels: props.data.labels,
                datasets: [
                    {
                        label: "Porcentaje",
                        backgroundColor: props.data.colors,
                        data: res.data().total_time
                    }
                ]
            });
        })

        setOptions({
            legend: { 
                display: false,
                labels: {
                    display: false
                }
            },
            
            title: {
                display: true,
                text: 'Porcentaje Total',
                fontColor: 'cyan',
                fontSize: '20',
                fontFamily: "Montserrat"
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: '#606060',
                    },
                    ticks: {
                        display: false
                        
                    },
                }],
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + "% " + " ";
                        },
                        min: 0,
                        max: 100,
                        fontSize: '14'
                    },
                    display: true,
                    gridLines: {
                        display: true,
                        color: '#606060'
                    }
                }],
            }
        })
    }, [])

    return (
        <div className='main-barchart-container'>
            <Bar
                data={chartData}
                width={80}
                height={40}
                options={options}
            />
        </div>
    )
}

export default BarChart