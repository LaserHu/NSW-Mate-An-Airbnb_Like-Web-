import React, { Component } from 'react'
import CityCard from '../CityCard'
import { Button, Icon } from 'antd'
import './style.css'
import cities from './cities'

export default class CityCards extends Component {
    constructor(props) {
        super(props)
        this.cardList = React.createRef()
        this.state = {
            sliderMargin: 0
        }

        this.sliderWidth = document.body.clientWidth * 0.9
        this.sliderShowImage = this.sliderWidth / (300 + 15)
        this.sliderTotalImages = Object.keys(cities).length
        this.sliderImageWidth = this.sliderWidth / this.sliderShowImage
        this.cityList = []
        for (let i in cities) {
            this.cityList.push(<CityCard key={cities[i].name} city={cities[i]}/>)
        }
    }

    moveRight = () => {
        this.setState({
            sliderMargin: this.state.sliderMargin - this.sliderImageWidth < -this.sliderImageWidth * (this.sliderTotalImages - this.sliderShowImage) + 15 ? -this.sliderImageWidth * (this.sliderTotalImages - this.sliderShowImage) + 15 : this.state.sliderMargin - this.sliderImageWidth
        })
    }

    moveLeft = () => {
        this.setState({
            sliderMargin: this.state.sliderMargin + this.sliderImageWidth > 0 ? 0 : this.state.sliderMargin + this.sliderImageWidth
        })
    }

    render() {
        return (
            <div className="CityCards-Container">
                <h2>Recommended for you</h2>
                <div style={{display: 'flex', flexDirection: 'row', position: "relative", height: '386px'}}>
                    <Button shape="circle" className="Move-Button" onClick={() => this.moveLeft()}>
                        <Icon type="left" style={{marginBottom: '5px'}}/>
                    </Button>
                    <div style={{width: '100%', overflowX: 'hidden'}}>
                        <div className="Card-List" ref={this.cardList}
                             style={{marginLeft: `${this.state.sliderMargin}px`}}>
                            {this.cityList}
                        </div>
                    </div>
                    <Button shape="circle" className="Move-Button" onClick={() => this.moveRight()}>
                        <Icon type="right" style={{marginBottom: '5px'}}/>
                    </Button>
                </div>
            </div>
        )
    }
}

