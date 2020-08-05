import React, { Component } from 'react'
import { connect } from 'react-redux'
import APIServices from "../../../../api"
import { HOST_TYPE } from "../../../../assets/constants"
import { Divider, List } from "antd"
import OrderCard from "../../../../components/OrderCard"

const apiServices = new APIServices()

class MyHost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hostList: []
        }
    }

    componentDidMount() {
        this.getHost().then(res => {
            this.setState({hostList: res})
        }).catch(e => {
            console.log(e)
        })
    }

    getHost = async () => {
        try {
            const res = await apiServices.myHosts(this.props.user.email)
            let rooms = []
            for (let i = 0; i < res.length; i++) {
                const accommodation = res[i]
                rooms.push({
                    id: accommodation.id,
                    img: accommodation.mainImage,
                    name: accommodation.name,
                    type: HOST_TYPE
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
                <div className="font-weight-bold">My Host Rooms</div>
                <Divider/>
                <List itemLayout="horizontal" dataSource={this.state.hostList} renderItem={item => (
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
)(MyHost)
