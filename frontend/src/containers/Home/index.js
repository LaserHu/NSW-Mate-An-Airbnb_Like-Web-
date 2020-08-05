import React, { Component } from 'react'
import AboutVideo from '../../components/AboutVideo'
import CityCards from '../../components/CityCards'
import RoomScroller from '../../components/RoomScroller'
import SearchModal from '../../components/SearchModal'

import { BackTop, Carousel } from 'antd'

import './style.css'


class Home extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay effect={"fade"} speed={3000} autoplaySpeed={10000}>
                    <div>
                        <img src={require("../../assets/images/homepage_background4.jpg")}
                             className="Home-Image"
                             alt="123"
                        />
                    </div>
                    <div>
                        <img src={require("../../assets/images/homepage_background3.jpg")}
                             className="Home-Image"
                             alt="123"
                        />
                    </div>
                    <div>
                        <img
                            src={require("../../assets/images/homepage_background5.jpg")}
                            className="Home-Image"
                            alt="123"
                        />
                    </div>
                    <div>
                        <img src={require("../../assets/images/homepage_background1.jpg")}
                             className="Home-Image"
                             alt="123"
                        />
                    </div>
                    <div>
                        <img src={require("../../assets/images/homepage_background2.jpg")}
                             className="Home-Image"
                             alt="123"
                        />
                    </div>
                </Carousel>
                <SearchModal history={this.props.history}/>
                <div className="Home-Container">
                    <CityCards/>
                    <AboutVideo/>
                    <RoomScroller/>
                </div>
                <BackTop/>
            </div>
        )
    }
}

export default Home