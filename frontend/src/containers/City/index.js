import React, { Component } from 'react'
import APIServices from '../../api/index'
import './style.css'
import RoomCard from "../../components/RoomCard"

// TODO: discuss with backend about city database structure
const apiServices = new APIServices()

class City extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cityName: this.props.location.state.city.name,
            cityImageSrc: this.props.location.state.city.src,
            roomNum: 0,
            roomList: '',
        }
        const url = this.props.location.pathname.split("/")
        this.cityName = url.pop()
        this.roomList = []
    }

    componentDidMount() {
        this.getRooms(this.state.cityName)
    }

    getRooms = async (cityName) => {
        console.log(cityName)
        try {
            const cityRooms = await apiServices.getCity(cityName)
            this.setState({roomNum: cityRooms.length})
            for (let i = 0; i < cityRooms.length; i++) {
                this.roomList.push(<RoomCard key={cityRooms[i].id} room={cityRooms[i]}/>)
            }
            console.log(this.roomList)
            this.setState({roomList: this.roomList})

        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden'}}>
                <div style={{width: '100%'}}>
                    <img src={this.state.cityImageSrc} alt={"img"} className="CityPage-Image"/>
                </div>
                <div className="CityName">
                    <p>{this.state.cityName}</p>
                </div>
                <div style={{fontSize: '30px', fontWeight: '800', marginTop: '5%'}}>
                    <p>Found {this.state.roomNum} rooms in {this.state.cityName}</p>
                </div>
                <div style={{width: '90%'}}>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.state.roomList}
                    </div>
                </div>
            </div>
        )
    }
}

export default City