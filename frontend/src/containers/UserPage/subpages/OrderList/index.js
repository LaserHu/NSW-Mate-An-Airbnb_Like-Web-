import React, { Component } from 'react'
import { connect } from 'react-redux'
import APIServices from "../../../../api"
import { Divider, List } from "antd"
import OrderCard from '../../../../components/OrderCard'
import { ORDER_TYPE, SAVE_TYPE } from "../../../../assets/constants"

const apiServices = new APIServices()

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderList: [],
            saveList: [],
        }
        this.orderList = []
        this.saveList = []
    }

    componentDidMount() {
        this.loadOrders()
        this.loadSaves().then(res => {
            this.setState({saveList: res})
        })
    }

    loadOrders = async () => {
        try {
            const res = await apiServices.userOrderHistory(this.props.user.email)
            for (let i = 0; i < res.length; i++) {
                const accommodation = res[i].accommodation
                // console.log(res[i])
                // console.log(accommodation)
                this.orderList.push({
                    id: accommodation.id,
                    img: accommodation.mainImage,
                    name: accommodation.name,
                    checkinDate: res[i].checkin,
                    checkoutDate: res[i].checkout,
                    type: ORDER_TYPE
                })
            }
            this.setState({orderList: this.orderList})
        } catch (err) {
            console.log(err)
        }
    }

    loadSaves = async () => {
        try {
            const res = await apiServices.userSavedRooms(this.props.user.email, this.props.user.jwt)
            let rooms = []
            for (let i = 0; i < res.length; i++) {
                const accommodation = res[i]
                rooms.push({
                    id: accommodation.id,
                    img: accommodation.mainImage,
                    name: accommodation.name,
                    type: SAVE_TYPE
                })
            }
            return rooms
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <div className="font-weight-bold">My Orders</div>
                <Divider/>
                <List itemLayout="horizontal" dataSource={this.state.orderList} renderItem={item => (
                    <List.Item>
                        <OrderCard id={item.id} img={item.img} name={item.name} type={item.type}
                                   checkinDate={item.checkinDate}
                                   checkoutDate={item.checkoutDate}/>
                    </List.Item>
                )}/>
                <div className="font-weight-bold">My Saves</div>
                <Divider/>
                <List itemLayout="horizontal" dataSource={this.state.saveList} renderItem={item => (
                    <List.Item>
                        <OrderCard id={item.id} img={item.img} name={item.name} type={item.type}/>
                    </List.Item>
                )}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
)(OrderList)
