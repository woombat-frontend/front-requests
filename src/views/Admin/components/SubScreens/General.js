import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase'
import DonnutChart from '../../../../Graphics/DonnutChart'
import { Icon, Button } from 'antd'
import '../../../../Styles/General.css'
import Context from '../../../../GlobalState/context';


const General = props => {

    const {state, actions} = useContext(Context)
    const [animation, setAnimation] = useState({})
    const db = firebase.firestore()
    const [chartData, setChartData] = useState({
        data: [25, 25, 25, 25],
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
        db.doc(`responses/${props.path}`).onSnapshot(res => {
            setChartData({ ...chartData, data: res.data().piechart_categories})
        })
    }, [])

    
    const [icons, setIcons] = useState(['highlight', 'interaction', 'apartment', 'cloud-upload'])

    return( 
        <div className="main-general-container">

            <div onClick={() => setAnimation({transform: 'translateX(-100%)'})}>
                <DonnutChart data={chartData} />
            </div>

            <section className="categories-container">
                {
                    !state.chart_data.length ? 
                        chartData.labels.map((cat, i) =>
                            <div style={{background: chartData.colors[i]}} className={`cat_${i + 1} single-cat`}>
                                <Icon className="cat-icon" type={icons[i]} />
                                <h4 className="cat-name">{cat}</h4>
                                <h4 className="cat-percent">{chartData.data[i]}%</h4>
                            </div>
                        )
                    :
                        chartData.labels.map((cat, i) =>
                            <div style={{ background: chartData.colors[i]}} className={`cat_${i + 1} single-cat`}>
                                <Icon className="cat-icon" type={icons[i]} />
                                <h4 className="cat-name">{cat}</h4>
                                <h4 className="cat-percent">{state.chart_data[i]}%</h4>
                            </div>
                        )
                }
            </section>
        </div>
    )
}

export default General;