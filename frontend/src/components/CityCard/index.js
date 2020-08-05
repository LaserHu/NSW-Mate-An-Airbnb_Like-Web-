import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default class CityCard extends Component {
    render() {
        return (
            <Link className="City-Container"
                  to={{
                      pathname: this.props.city.link,
                      state: {city: this.props.city}
                  }}
                  style={{textDecoration: 'none'}}
                  // target="_blank"
            >
                <img src={this.props.city.src} alt={"img"}
                     className="City-Image"/>
                <div className="City-Content">
                    <span style={{fontWeight: 'bold'}}>{this.props.city.name}</span>
                    <span style={{fontSize: '15px'}}>${this.props.city.price} AUD/night average</span>
                </div>
            </Link>
        )
    }
}