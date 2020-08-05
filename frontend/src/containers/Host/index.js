import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AutoComplete, Button, Divider, Icon, Input, InputNumber, Layout, Modal, Upload } from "antd"
import locations from "../../components/SearchMenu/locations.json"
import APIServices from "../../api"
import './style.css'

const {Content} = Layout
const {TextArea} = Input
const location_list = locations
const apiServices = new APIServices()

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

class Host extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            amenities: '',
            interior: '',
            introduction: '',
            location: '',
            price: 0,
            capacity: 0,
            listIndex: '0',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            imgList: [],
        }
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = async file => {
        console.log(file)
        console.log(file.originFileObj)
        const a = await getBase64(file.originFileObj)
        console.log(a)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }
    handleBeforeUpload = file => {
        const isJPG = file.type === 'image/jpg'
        const isJPEG = file.type === 'image/jpeg'
        const isGIF = file.type === 'image/gif'
        const isPNG = file.type === 'image/png'
        if (!(isJPG || isJPEG || isGIF || isPNG)) {
            Modal.error({
                title: 'Picture format wrong',
            })
            return
        }
        const isLt4M = file.size / 1024 / 1024 < 4
        if (!isLt4M) {
            Modal.error({
                title: 'Picture oversize',
            })
            return
        }
        return (isJPG || isJPEG || isGIF || isPNG) && isLt4M
    }

    handleChange = async ({file, fileList}) => {
        this.setState({fileList})
        const base64 = await getBase64(file.originFileObj)
        let list = base64.split(',')
        list.shift()
        file.base64 = list.join('')
        const imgList = this.state.fileList.map(item => (
            item.base64
        ))

        this.setState({
            imgList: imgList,
        })
    }

    handlerChanges(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }

    handlerChangeValue(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = async () => {
        const email = this.props.user.email
        return await apiServices.host(
            this.state.name,
            this.state.introduction,
            this.state.location,
            this.state.price,
            this.state.amenities,
            this.state.interior,
            this.state.capacity,
            this.state.imgList,
            email,
            this.props.user.jwt
        )
    }

    submit = () => {
        this.handleSubmit().then(res => {
            if (res.status === 200) {
                Modal.success({
                    title: 'Host successfully!',
                })
            }
        }).catch(e => {
            Modal.error({
                title: e,
            })
        })
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <Layout>
                <Layout style={{padding: "80px", display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{margin: 16}}>Host a home</h1>
                    <Layout style={{alignItems: 'center'}}>
                        {this.props.user.isAuth ?
                            <Content style={{background: "#fff", width: '80%', minHeight: 800}}>
                                <div className="hostBox">
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Name</p>
                                        </div>
                                        <div className="right">
                                            <Input onChange={event => {
                                                this.handlerChanges('name', event)
                                            }}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Location</p>
                                        </div>
                                        <div className="right">
                                            <AutoComplete
                                                dataSource={location_list}
                                                style={{width: '100%'}}
                                                onChange={value => {
                                                    this.handlerChangeValue('location', value)
                                                }}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Introduction</p>
                                        </div>
                                        <div className="right">
                                            <TextArea onChange={event => {
                                                this.handlerChanges('introduction', event)
                                            }}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Price</p>
                                        </div>
                                        <div className="right">
                                            <InputNumber onChange={value => {
                                                this.handlerChangeValue('price', value)
                                            }} style={{width: '100%'}}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Amenities</p>
                                        </div>
                                        <div className="right">
                                            <Input onChange={event => {
                                                this.handlerChanges('interior', event)
                                            }}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Capacity</p>
                                        </div>
                                        <div className="right">
                                            <InputNumber min={1} max={10} defaultValue={2} onChange={value => {
                                                this.handlerChangeValue('capacity', value)
                                            }} style={{width: '100%'}}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Sleeping arrangements</p>
                                        </div>
                                        <div className="right">
                                            <Input onChange={value => {
                                                this.handlerChanges('interior', value)
                                            }}/>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="left-right">
                                        <div className="left">
                                            <p>Pictures</p>
                                        </div>
                                        <div className="right">
                                            <div className="clearfix">
                                                <Upload
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onPreview={this.handlePreview}
                                                    onChange={this.handleChange}
                                                    beforeUpload={this.handleBeforeUpload}
                                                >
                                                    {fileList.length >= 8 ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisible} footer={null}
                                                       onCancel={this.handleCancel}>
                                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{textAlign: 'center', margin: '50px'}}>
                                    <Button onClick={this.submit}>Host Now</Button>
                                </div>
                            </Content> :
                            <Content style={{background: "#fff", width: '80%', minHeight: 800, textAlign: 'center'}}>
                                <h3 style={{margin: '50px'}}>Please login first</h3>
                                <img src={require("../../assets/images/become-a-trivia-host1.png")} alt="123"
                                     style={{width: '60%'}}/>
                            </Content>
                        }
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const actionCreators = {}
export default connect(mapStateToProps, actionCreators)(Host)
