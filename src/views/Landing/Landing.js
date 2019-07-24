import React, {useState, useEffect} from 'react'
import '../../Styles/Landing.css';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import LandingBody from './components/LandingBody';

const Landing = () => {

    return (
        <div className="container-main-landing">
            <Header />
            <div className="container-body-landing">
                <LeftMenu />
                <div className="container-body-landing">
                <LandingBody/>
                </div>
            </div>
        </div>
    )
}

export default Landing