import React, {useState, useEffect, useContext} from 'react' 
import fire from '../FirebaseConfig/auth'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
// import db from '../FirebaseConfig/firestore'

import { Upload, message, Button, Input, Icon } from 'antd'
import Context from '../GlobalState/context';
import { FilePond } from 'react-filepond';
import Axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2'
import '../Styles/provisional.css'



const P_Enpoint = props => {

    const {state, actions} = useContext(Context)
    const [localData, setLocalData] = useState({})
    const [projectData, setProjectData] = useState({name: "", description: ""})
    const [option, setOption] = useState('donnut')
    const [files, setFiles] = useState([])
    const db = firebase.firestore()
    const user = state.fire_init.auth().currentUser;
    const { TextArea } = Input
    const storage = firebase.storage()
    const [chartData, setChartData] = useState({
        data: [300, 50, 100, 25],
        colors: [
            '#006cf1',
            '#38C0FF',
            '#ba43ae', 
            '#7000f1'
        ],
        labels: [
            'Diseño Visual',
            'Logica de Componentes',
            'Arquitectura de Conexiones',
            'Despliegue en producción'
        ]
    })


    const [options, setOptions] = useState({
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
        },
    })
    const [barOptions, setBarOptions] = useState({
        legend: { display: false },
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
                    color: '#606060'
                },
                ticks: {
                    fontColor: "#CCC", // this here
                },
            }],
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return value + "% ";
                    }
                },
                display: true,
                gridLines: {
                    display: true,
                    color: '#606060'
                },
            }],
        }
    })

    const data = {
        labels: chartData.labels,
        datasets: [{
            data: chartData.data,
            borderColor: "#323232",
            pointRadius: 3,
            display: false,
            backgroundColor: chartData.colors,
            hoverBackgroundColor: chartData.colors
        }],
        text: '23%'
    };

    const barData = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Porcentaje",
                backgroundColor: chartData.colors,
                data: [100, 50, 45, 65, 80]
            }
        ] 
    }

    const containerStyles = {
        width: '50%',
        background: '#323232',
        padding: '2em'
    }

    const change = () => {
        let randomArray = [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10]
        setChartData(randomArray)
    }


    return (
        <div>
            {
                option === 'donnut' ?
                    <div style={containerStyles}>
                        <Doughnut
                            data={data}
                            options={options}
                        />

                        <Button type="primary" onClick={change}> Change </Button>
                    </div>
                :
                    <div style={containerStyles}>
                        <Bar
                            data={barData}
                            width={100}
                            height={50}
                            options={barOptions}
                        />
                        {/* <Button type="primary" onClick={changeLines}> Change </Button> */}
                    </div>
            }
            
            
            <Button type="primary" onClick={() => setOption('bar')}> Bar </Button>
            <Button type="primary" onClick={() => setOption('donnut')}> Donnut </Button>
        </div>
        
    )   
}

export default withRouter(P_Enpoint)