import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Input, Modal, Popover, Rate } from "antd"
import { Link } from 'react-router-dom'
import './style.css'
import APIServices from "../../api"
import { ORDER_TYPE, SAVE_TYPE } from "../../assets/constants"

const {TextArea} = Input
const apiServices = new APIServices()

class OrderCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            confirmLoading: false,
            review: 'I love this place',
            ModalText: "Post a comment",
            commentHint: "This order has not finished",
            orderExpired: false,
            removed: false,
        }
    }

    componentDidMount() {
        if (this.props.type === ORDER_TYPE) {
            const curr = new Date()
            const checkout = new Date(this.props.checkoutDate)
            if (curr > checkout) {
                this.setState({orderExpired: true, commentHint: "Leave a comment for this order"})
            }
        }

    }

    handlerChanges = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleSubmit = async () => {
        const email = this.props.user.email
        try {
            const result = await apiServices.postReview(
                email,
                this.props.id,
                this.state.review,
                this.props.user.jwt
            )
            console.log(result)
            if (result.status === 201) {
                this.setState({
                    ModalText: "Review commented, close in 2 seconds",
                    confirmLoading: false
                })
                setTimeout(() => {
                    this.handleCancel()
                }, 2000)
            }
        } catch (e) {
            this.setState({
                ModalText: "Something went wrong, please try again",
                confirmLoading: false
            })
        }
    }

    handleOk = () => {
        this.setState({
            ModalText: "Sending comment",
            confirmLoading: true
        })
        this.handleSubmit()
    }

    handleCancel = () => {
        this.setState({
            review: 'I love this place',
            ModalText: "Post a comment",
            visible: false,
        })
    }

    unsave = async () => {
        try {
            return await apiServices.unsaveRoom(this.props.user.email, this.props.id, this.props.user.jwt)
        } catch (e) {
            console.log(e)
        }
    }

    handleRemove = () => {
        this.unsave().then(res => {
            if (res.status === 200) {
                this.setState({removed: true})
            }
        })
    }

    render() {
        const {visible, confirmLoading, ModalText} = this.state
        return (
            <div className="OrderCard">
                <div style={{width: '20%'}}>
                    <Link to={`/room/${this.props.id}`} target="_blank">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={this.props.img} alt="room image"
                             style={{height: '90%', width: '90%', overflow: 'hidden', objectFit: 'cover'}}/>
                    </Link>
                </div>
                <div style={{flexDirection: 'column', width: '70%'}}>
                    <Link to={`/room/${this.props.id}`} target="_blank"
                          style={{textDecoration: "none", color: "black"}}>
                        <p>{this.props.name}</p>
                    </Link>
                    {this.props.type === ORDER_TYPE && <p>{this.props.checkinDate} - {this.props.checkoutDate}</p>}
                </div>
                <div>
                    {
                        this.props.type === ORDER_TYPE &&
                        <Popover placement="topLeft" content={this.state.commentHint}>
                            <Button onClick={this.showModal} disabled={!this.state.orderExpired}>Comment</Button>
                        </Popover>
                    }
                    {this.props.type === SAVE_TYPE &&
                    <Popover placement="topLeft" content={"Remove from save list"}>
                        <Button onClick={this.handleRemove} disabled={this.state.removed}>Remove</Button>
                    </Popover>}
                </div>
                <Modal
                    title="Review"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Rate allowHalf defaultValue={3.5}/>
                    <TextArea placeholder="I love this place" onChange={this.handlerChanges}/>
                    <Divider/>
                    <p>{ModalText}</p>
                </Modal>
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
)(OrderCard)

