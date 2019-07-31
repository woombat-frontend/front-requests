import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase'
import BarChart from '../../../../Graphics/BarChart'
import { Icon, Button } from 'antd'
import '../../../../Styles/General.css'
import Context from '../../../../GlobalState/context';


const TiempoTotal = props => {

    const { state, actions } = useContext(Context)
    const db = firebase.firestore()
    const [chartData, setChartData] = useState({
        data: [],
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
        ],
        backgroundColor: "#323232",
        size: '65%'
    })

    useEffect(() => {
        // db.doc(`responses/${props.path}`).onSnapshot(res => {
        //     console.log(res.data())
        //     setChartData({ ...chartData, data: res.data().total_time })
        //     console.log(res.data().total_time)
        // })
    }, [])


    const [icons, setIcons] = useState(['highlight', 'interaction', 'apartment', 'cloud-upload'])

    return (
        <div className="main-general-container">
            <BarChart
                data={chartData}
                path={props.path}
            />

            {/* <section className="categories-container-total">
                {
                    !state.total_time.length ?
                        chartData.labels.map((cat, i) =>
                            <div style={{ background: chartData.colors[i] }} className={`cat_${i + 1} single-cat`}>
                                <Icon className="cat-icon" type={icons[i]} />
                                <h4 className="cat-name">{cat}</h4>
                                <h4 className="cat-percent">{chartData.data[i]}%</h4>
                            </div>
                        )
                        :
                        chartData.labels.map((cat, i) =>
                            <div style={{ background: chartData.colors[i] }} className={`cat_${i + 1} single-cat`}>
                                <Icon className="cat-icon" type={icons[i]} />
                                <h4 className="cat-name">{cat}</h4>
                                <h4 className="cat-percent">{state.total_time[i]}%</h4>
                            </div>
                        )
                }
            </section> */}
        </div>
    )
}

export default TiempoTotal;