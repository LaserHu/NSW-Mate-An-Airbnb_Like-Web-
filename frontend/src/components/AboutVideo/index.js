import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class AboutVideo extends Component {
    render() {
        return (
            <div className="CityCards-Container">
                <h2>Visit NSW with NSWMate</h2>
                <span>A selection of places to stay verified for quality and design.</span>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: "relative",
                    height: '500px',
                }}>
                    <video src={require('../../assets/images/19416912_1825494781100248_1101653227318804480_n.mp4')}
                           autoPlay loop muted style={{width: '100%', objectFit: 'cover', borderRadius: '5px'}}/>
                    <span style={{position: 'absolute', top: '100px', left: '60px', color: '#fff', fontSize: 30}}>Love NSW</span>
                    <span style={{position: 'absolute', top: '140px', left: '60px', color: '#fff', fontSize: 30, fontWeight: 'bold'}}>Love NSWMate</span>
                    <Link style={{position: 'absolute', top: '240px', left: '60px', height: '40px'}} to="about">
                        <img src={require('../../assets/images/learnmore.png')} style={{borderRadius: '5px'}} alt="learn more"/>
                    </Link>
                </div>
            </div>
        )
    }
}